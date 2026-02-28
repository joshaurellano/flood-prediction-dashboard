import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import supabase from '../supabase-client'
import { WEATHER_API_ENDPOINT, WEATHER_API_KEY } from '../Api'
import NavigationBar from './components/NavigationBar'
import Sidebar from './components/Sidebar'
import { Col, Row, Container, Card } from 'react-bootstrap'
import { FaWater, FaCloudRain } from 'react-icons/fa'
import { MdWarning, MdWaterDrop } from 'react-icons/md'
import { WiThunderstorm } from 'react-icons/wi'

function Dashboard() {
  const [userData, setUserData] = useState('')
  const [weatherData, setWeatherData] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function checkSession() {
      if (location.state) {
        setUserData(location.state.userData.session.user)
      } else {
        const { data, error } = await supabase.auth.getSession()
        if (!data.session || error) {
          navigate('/login')
        } else {
          setUserData(data.session.user)
        }
      }
    }
    checkSession()
  }, [navigate, location, userData])

  const token = `Bearer ${WEATHER_API_KEY}`
  useEffect(() => {
    const headers = {
      accept: 'application/json',
      Authorization: token,
    }
    const fetchWeatherData = async () => {
      await axios.get(`${WEATHER_API_ENDPOINT}`, { headers }).then(data => {
        setWeatherData(data)
      })
    }
    fetchWeatherData()
  }, [token])

  const now = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })

  // ── Placeholder card data (swap with real API values) ──
  const cards = [
    {
      title: 'Flood Risk Level',
      value: 'Moderate',
      sub: 'Risk score: 58 / 100',
      icon: <FaWater />,
      iconBg: '#fffbeb',
      iconColor: '#f59e0b',
      accent: '#f59e0b',
      progress: 58,
    },
    {
      title: 'Rain Intensity',
      value: '18.4 mm/hr',
      sub: 'Moderate Rain',
      icon: <FaCloudRain />,
      iconBg: '#eff6ff',
      iconColor: '#0070d8',
      accent: '#0070d8',
      progress: null,
    },
    {
      title: 'PAGASA Alert Level',
      value: 'Yellow Alert',
      sub: 'Moderate flooding possible in low-lying areas',
      icon: <MdWarning />,
      iconBg: '#fffbeb',
      iconColor: '#f59e0b',
      accent: '#f59e0b',
      progress: null,
    },
    {
      title: 'Rainfall Forecast Next 6 hrs',
      value: '42 mm',
      sub: 'Expected total rainfall',
      icon: <WiThunderstorm />,
      iconBg: '#eff6ff',
      iconColor: '#0070d8',
      accent: '#0070d8',
      progress: 65,
    },
  ]

  return (
    <div style={{ minHeight: '100vh', maxWidth: '100vw' }}>
      <Row style={{ height: '100vh' }} className="g-0">

        {/* Sidebar */}
        <Col lg={2} style={{ paddingRight: 0 }}>
          <Sidebar />
        </Col>

        {/* Main content */}
        <Col lg={10} style={{
          paddingLeft: 0,
          backgroundColor: '#f4f7fb',
          overflowY: 'auto',
        }}>
          <NavigationBar pageTitle="Dashboard" />

          <Container fluid style={{ padding: '28px' }}>

            {/* Page header */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{
                fontSize: '22px',
                fontWeight: '800',
                color: '#0d1f33',
                letterSpacing: '-0.02em',
                marginBottom: '4px',
              }}>
                Overview
              </h4>
              <span style={{ fontSize: '12px', color: '#9ab0c8' }}>
                Last updated: {now} · Data from PAGASA &amp; Weather API
              </span>
            </div>

            {/* Section label */}
            <span style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#9ab0c8',
              marginBottom: '14px',
            }}>
              Real-Time Conditions
            </span>

            {/* Cards grid — 2 per row */}
            <Row className="g-3">
              {cards.map((card, i) => (
                <Col lg={6} key={i}>
                  <Card style={{
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
                    backgroundColor: '#ffffff',
                    overflow: 'hidden',
                  }}>
                    <Card.Body style={{ padding: '22px 24px' }}>

                      {/* Header row */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '14px',
                      }}>
                        <div>
                          <p style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            color: '#9ab0c8',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            margin: '0 0 6px',
                          }}>
                            {card.title}
                          </p>
                          <h3 style={{
                            fontSize: '26px',
                            fontWeight: '800',
                            color: '#0d1f33',
                            margin: 0,
                            letterSpacing: '-0.02em',
                          }}>
                            {card.value}
                          </h3>
                        </div>

                        {/* Icon badge */}
                        <div style={{
                          width: '46px', height: '46px',
                          borderRadius: '12px',
                          backgroundColor: card.iconBg,
                          color: card.iconColor,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '22px',
                          flexShrink: 0,
                        }}>
                          {card.icon}
                        </div>
                      </div>

                      {/* Progress bar if applicable */}
                      {card.progress !== null && (
                        <div style={{
                          height: '7px',
                          borderRadius: '999px',
                          backgroundColor: '#eef2f7',
                          overflow: 'hidden',
                          marginBottom: '8px',
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${card.progress}%`,
                            borderRadius: '999px',
                            background: `linear-gradient(90deg, ${card.accent}, ${card.accent}cc)`,
                          }} />
                        </div>
                      )}

                      {/* Sub label */}
                      <span style={{
                        fontSize: '13px',
                        color: '#7a94a8',
                        fontWeight: '500',
                      }}>
                        {card.sub}
                      </span>

                      {/* Divider + timestamp */}
                      <div style={{ height: '1px', backgroundColor: '#f0f5fa', margin: '12px 0' }} />
                      <span style={{ fontSize: '11px', color: '#b0c0d0' }}>
                        Updated {now}
                      </span>

                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

          </Container>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
