import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import supabase from '../supabase-client'
import NavigationBar from './components/NavigationBar'
import Sidebar from './components/Sidebar'
import { Col, Row, Container, Card } from 'react-bootstrap'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'

// ── Placeholder data (replace with real API / Supabase data) ──────────────────
const rainfallData = [
  { time: '6AM',  rainfall: 2.1 },
  { time: '7AM',  rainfall: 5.4 },
  { time: '8AM',  rainfall: 12.8 },
  { time: '9AM',  rainfall: 18.3 },
  { time: '10AM', rainfall: 14.5 },
  { time: '11AM', rainfall: 9.2 },
  { time: '12PM', rainfall: 6.7 },
  { time: '1PM',  rainfall: 4.1 },
  { time: '2PM',  rainfall: 8.9 },
  { time: '3PM',  rainfall: 16.2 },
  { time: '4PM',  rainfall: 21.4 },
  { time: '5PM',  rainfall: 18.7 },
]

const floodRiskData = [
  { day: 'Mon', risk: 30 },
  { day: 'Tue', risk: 45 },
  { day: 'Wed', risk: 72 },
  { day: 'Thu', risk: 58 },
  { day: 'Fri', risk: 40 },
  { day: 'Sat', risk: 85 },
  { day: 'Sun', risk: 63 },
]

const getRiskColor = (value) => {
  if (value >= 70) return '#ef4444'
  if (value >= 45) return '#f59e0b'
  return '#22c55e'
}

const CustomRiskBar = (props) => {
  const { x, y, width, height, value } = props
  return (
    <rect
      x={x} y={y} width={width} height={height}
      fill={getRiskColor(value)}
      rx={4} ry={4}
    />
  )
}

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '10px 14px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        fontSize: '13px',
      }}>
        <p style={{ margin: '0 0 4px', fontWeight: '700', color: '#0d1f33' }}>{label}</p>
        <p style={{ margin: 0, color: '#0070d8', fontWeight: '600' }}>
          {payload[0].value} {unit}
        </p>
      </div>
    )
  }
  return null
}

function Analytics() {
  const [userData, setUserData] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function checkSession() {
      if (location.state) {
        setUserData(location.state.userData.session.user)
      } else {
        const { data, error } = await supabase.auth.getSession()
        if (!data.session || error) navigate('/login')
        else setUserData(data.session.user)
      }
    }
    checkSession()
  }, [navigate, location])

  const now = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })

  // Summary stats
  const totalRainfall = rainfallData.reduce((s, d) => s + d.rainfall, 0).toFixed(1)
  const peakRainfall = Math.max(...rainfallData.map(d => d.rainfall))
  const avgRisk = Math.round(floodRiskData.reduce((s, d) => s + d.risk, 0) / floodRiskData.length)
  const peakRisk = Math.max(...floodRiskData.map(d => d.risk))

  const summaryCards = [
    { label: 'Total Rainfall Today', value: `${totalRainfall} mm`, color: '#0070d8', bg: '#eff6ff' },
    { label: 'Peak Rainfall',        value: `${peakRainfall} mm/hr`, color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'Avg Flood Risk',       value: `${avgRisk} / 100`,  color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Peak Risk This Week',  value: `${peakRisk} / 100`, color: '#ef4444', bg: '#fff1f2' },
  ]

  return (
    <div style={{ minHeight: '100vh', maxWidth: '100vw' }}>
      <Row style={{ height: '100vh' }} className="g-0">

        {/* Sidebar */}
        <Col lg={2} style={{ paddingRight: 0 }}>
          <Sidebar />
        </Col>

        {/* Main */}
        <Col lg={10} style={{ paddingLeft: 0, backgroundColor: '#f4f7fb', overflowY: 'auto' }}>
          <NavigationBar pageTitle="Data Analytics" />

          <Container fluid style={{ padding: '28px' }}>

            {/* Page header */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{
                fontSize: '22px', fontWeight: '800',
                color: '#0d1f33', letterSpacing: '-0.02em', marginBottom: '4px',
              }}>
                Data Analytics
              </h4>
              <span style={{ fontSize: '12px', color: '#9ab0c8' }}>
                Last updated: {now} · Showing today's data
              </span>
            </div>

            {/* Summary stat cards */}
            <span style={{
              display: 'block', fontSize: '11px', fontWeight: '700',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#9ab0c8', marginBottom: '14px',
            }}>
              Summary
            </span>
            <Row className="g-3 mb-4">
              {summaryCards.map((card, i) => (
                <Col lg={3} md={6} key={i}>
                  <Card style={{
                    border: 'none', borderRadius: '14px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    backgroundColor: '#fff',
                  }}>
                    <Card.Body style={{ padding: '18px 20px' }}>
                      <p style={{
                        fontSize: '11px', fontWeight: '700', color: '#9ab0c8',
                        textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px',
                      }}>
                        {card.label}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '10px', height: '10px', borderRadius: '50%',
                          backgroundColor: card.color, flexShrink: 0,
                        }} />
                        <span style={{
                          fontSize: '22px', fontWeight: '800',
                          color: '#0d1f33', letterSpacing: '-0.02em',
                        }}>
                          {card.value}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Charts */}
            <span style={{
              display: 'block', fontSize: '11px', fontWeight: '700',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#9ab0c8', marginBottom: '14px',
            }}>
              Charts
            </span>
            <Row className="g-3">

              {/* Rainfall Trend */}
              <Col lg={7}>
                <Card style={{
                  border: 'none', borderRadius: '16px',
                  boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
                  backgroundColor: '#fff',
                }}>
                  <Card.Body style={{ padding: '22px 24px' }}>
                    <div style={{ marginBottom: '20px' }}>
                      <h6 style={{
                        fontSize: '15px', fontWeight: '700',
                        color: '#0d1f33', margin: '0 0 4px',
                      }}>
                        Rainfall Trend
                      </h6>
                      <span style={{ fontSize: '12px', color: '#9ab0c8' }}>
                        Hourly rainfall (mm/hr) — Today
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                      <AreaChart data={rainfallData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="rainfallGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#0070d8" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#0070d8" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f5fa" vertical={false} />
                        <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#9ab0c8' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#9ab0c8' }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip unit="mm/hr" />} />
                        <Area
                          type="monotone" dataKey="rainfall"
                          stroke="#0070d8" strokeWidth={2.5}
                          fill="url(#rainfallGrad)"
                          dot={false} activeDot={{ r: 5, fill: '#0070d8' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              </Col>

              {/* Flood Risk History */}
              <Col lg={5}>
                <Card style={{
                  border: 'none', borderRadius: '16px',
                  boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
                  backgroundColor: '#fff',
                }}>
                  <Card.Body style={{ padding: '22px 24px' }}>
                    <div style={{ marginBottom: '20px' }}>
                      <h6 style={{
                        fontSize: '15px', fontWeight: '700',
                        color: '#0d1f33', margin: '0 0 4px',
                      }}>
                        Flood Risk History
                      </h6>
                      <span style={{ fontSize: '12px', color: '#9ab0c8' }}>
                        Daily risk score (0–100) — This week
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={floodRiskData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f5fa" vertical={false} />
                        <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ab0c8' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#9ab0c8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                        <Tooltip content={<CustomTooltip unit="/ 100" />} />
                        <Bar dataKey="risk" shape={<CustomRiskBar />} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>

                    {/* Legend */}
                    <div style={{ display: 'flex', gap: '16px', marginTop: '14px', justifyContent: 'center' }}>
                      {[
                        { label: 'Low (0–44)',    color: '#22c55e' },
                        { label: 'Moderate (45–69)', color: '#f59e0b' },
                        { label: 'High (70+)',    color: '#ef4444' },
                      ].map(l => (
                        <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: l.color }} />
                          <span style={{ fontSize: '11px', color: '#9ab0c8', fontWeight: '500' }}>{l.label}</span>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>

            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  )
}

export default Analytics
