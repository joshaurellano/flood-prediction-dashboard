import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import supabase from '../../supabase-client'
import { FaUserTie } from 'react-icons/fa'
import { MdNotifications } from 'react-icons/md'

function NavigationBar({ pageTitle = 'Dashboard' }) {
  const navigate = useNavigate()

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    navigate('/')
    if (error) alert('Error logging out')
  }

  return (
    <div>
      <Navbar style={{
        height: '56px',
        background: 'linear-gradient(90deg, #0062d6 0%, #0077f5 100%)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 2px 10px rgba(0,70,180,0.18)',
        padding: '0 20px',
      }}>
        <Container fluid style={{ gap: '16px' }}>

          {/* Left: page label + live dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              fontSize: '15px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.92)',
              letterSpacing: '0.02em',
            }}>
              {pageTitle}
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.70)',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
            }}>
              <span style={{
                display: 'inline-block',
                width: '7px', height: '7px',
                borderRadius: '50%',
                backgroundColor: '#4ade80',
                boxShadow: '0 0 6px #4ade80',
              }} />
              Live
            </div>
          </div>

          {/* Right: notification + user dropdown */}
          <Nav className="ms-auto" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

            {/* Notification bell */}
            <div style={{
              position: 'relative',
              backgroundColor: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: '8px',
              width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
              fontSize: '18px',
              cursor: 'pointer',
            }}>
              <MdNotifications />
              <span style={{
                position: 'absolute',
                top: '6px', right: '7px',
                width: '7px', height: '7px',
                backgroundColor: '#ff4444',
                borderRadius: '50%',
                border: '2px solid #0062d6',
              }} />
            </div>

            {/* User dropdown */}
            <NavDropdown
              title={
                <span style={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontSize: '14px',
                  fontWeight: '500',
                }}>
                  <FaUserTie style={{ fontSize: '16px' }} />
                  Account
                </span>
              }
              id="agos-user-dropdown"
              align="end"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: '8px',
                padding: '4px 10px',
              }}
            >
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={signOut}
                style={{ color: '#dc2626' }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavigationBar
