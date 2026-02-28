import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Col, Nav } from 'react-bootstrap'
import supabase from '../../supabase-client'
import { MdDashboard } from 'react-icons/md'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { MdTextsms } from 'react-icons/md'

function Sidebar() {
  const [userData, setUserData] = useState('')
  const [active, setActive] = useState('Dashboard')
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
  }, [navigate, location, userData])

  const NAV_ITEMS = [
    { label: 'Dashboard', icon: <MdDashboard />, path: '/dashboard' },
    { label: 'Map', icon: <FaMapMarkerAlt />, path: '/map' },
    { label: 'Broadcast/SMS', icon: <MdTextsms />, path: '/broadcast' },
  ]

  const avatarLetter = userData?.email ? userData.email[0].toUpperCase() : 'U'

  return (
    <Col style={{
      height: '100vh',
      width: '100%',
      background: 'linear-gradient(180deg, #0062d6 0%, #0050b8 60%, #003e99 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
      boxShadow: '2px 0 16px rgba(0,50,160,0.18)',
    }}>

      {/* Top */}
      <div>

        {/* Logo area */}
        <div style={{
          padding: '22px 20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '9px',
              background: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 16C5 13 8 12 12 14C16 16 19 15 21 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M3 20C5 17 8 16 12 18C16 20 19 19 21 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
              </svg>
            </div>
            <span style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#fff',
              letterSpacing: '-0.02em',
            }}>
              AGOS
            </span>
          </div>
          <p style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.48)',
            margin: '8px 0 0',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            Flood Monitoring System
          </p>
        </div>

        {/* Nav items */}
        <Nav className="flex-column" style={{ padding: '4px 0' }}>
          {NAV_ITEMS.map(item => (
            <Nav.Item key={item.label}>
              <Nav.Link
                onClick={() => { setActive(item.label); navigate(item.path) }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 20px',
                  margin: '2px 12px',
                  borderRadius: '10px',
                  color: active === item.label ? '#ffffff' : 'rgba(255,255,255,0.68)',
                  fontSize: '14px',
                  fontWeight: active === item.label ? '700' : '500',
                  backgroundColor: active === item.label ? 'rgba(255,255,255,0.18)' : 'transparent',
                  borderLeft: active === item.label ? '3px solid #fff' : '3px solid transparent',
                }}
              >
                <span style={{ fontSize: '18px', display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </span>
                {item.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>

      {/* Footer — user info */}
      <div style={{ paddingBottom: '16px' }}>
        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.12)',
          margin: '0 20px 12px',
        }} />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          margin: '0 12px',
          backgroundColor: 'rgba(0,0,0,0.18)',
          borderRadius: '10px',
        }}>
          <div style={{
            width: '32px', height: '32px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: '700', color: '#fff',
            flexShrink: 0,
          }}>
            {avatarLetter}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{
              fontSize: '10px',
              color: 'rgba(255,255,255,0.42)',
              margin: 0,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              Logged in as
            </p>
            <span style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.72)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block',
              maxWidth: '130px',
            }}>
              {userData?.email || '—'}
            </span>
          </div>
        </div>
      </div>

    </Col>
  )
}

export default Sidebar
