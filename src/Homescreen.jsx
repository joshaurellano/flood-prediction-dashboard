import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa'

function Homescreen() {
  const navigate = useNavigate()

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
    }}>

      {/* Background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("https://res.cloudinary.com/dgjbvgwiv/image/upload/v1771746626/sided-view-hand-filling-document_66_lwkdoc.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, rgba(0,18,40,0.85) 0%, rgba(0,10,28,0.65) 50%, rgba(0,28,60,0.82) 100%)',
        zIndex: 1,
      }} />

      {/* Blue water tint at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '35%',
        background: 'linear-gradient(to top, rgba(0,90,180,0.25) 0%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* ── Navbar ── */}
      <Navbar style={{
        position: 'relative',
        zIndex: 10,
        height: '68px',
        borderBottom: '1px solid rgba(255,255,255,0.09)',
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0,15,38,0.48)',
      }}>
        <Container>
          <Navbar.Brand>
            <Image
              src="https://res.cloudinary.com/dgjbvgwiv/image/upload/v1771749230/2224becb-5b0b-45ee-a370-61053f8e71cb_zbbm9l.png"
              style={{ height: '44px', width: 'auto' }}
            />
          </Navbar.Brand>

          <Nav className="mx-auto" style={{ gap: '32px' }}>
            {['About', 'Features', 'Contact Us'].map(item => (
              <Nav.Link
                key={item}
                style={{
                  color: 'rgba(255,255,255,0.80)',
                  fontSize: '15px',
                  fontWeight: '500',
                  letterSpacing: '0.02em',
                  padding: '0',
                }}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>

      {/* ── Hero ── */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        height: 'calc(100vh - 68px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px',
      }}>

        {/* Live badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(0,140,255,0.18)',
          border: '1px solid rgba(0,160,255,0.35)',
          borderRadius: '999px',
          padding: '6px 18px',
          marginBottom: '28px',
          color: '#60c8ff',
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          <span style={{
            width: '7px', height: '7px',
            borderRadius: '50%',
            backgroundColor: '#38d4ff',
            display: 'inline-block',
            boxShadow: '0 0 6px #38d4ff',
          }} />
          Live Flood Monitoring System
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(38px, 6vw, 72px)',
          fontWeight: '800',
          color: '#ffffff',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          marginBottom: '18px',
          textShadow: '0 4px 24px rgba(0,0,0,0.35)',
        }}>
          Predicting Floods,
          <br />
          <span style={{ color: '#38c2ff' }}>Protecting Barangays</span>
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: 'clamp(15px, 2vw, 19px)',
          color: 'rgba(255,255,255,0.70)',
          fontWeight: '400',
          marginBottom: '44px',
          maxWidth: '500px',
        }}>
          A data-driven flood monitoring and forecasting system
        </p>

        {/* CTA Button */}
        <Button
          onClick={() => navigate('/login')}
          style={{
            background: 'linear-gradient(135deg, #0070d8 0%, #00aaff 100%)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '700',
            letterSpacing: '0.04em',
            padding: '14px 36px',
            color: '#fff',
            boxShadow: '0 8px 28px rgba(0,120,255,0.40)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          Login to Dashboard <FaArrowRight style={{ fontSize: '13px' }} />
        </Button>

        {/* Stats bar */}
        <div style={{
          position: 'absolute',
          bottom: '36px',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}>
          {[
            { num: 'Real-Time', label: 'Data Updates' },
            null,
            { num: 'AI-Powered', label: 'Flood Forecasting' },
            null,
            { num: '24 / 7', label: 'Push Alerts' },
          ].map((item, i) =>
            item === null ? (
              <div key={i} style={{
                width: '1px',
                height: '30px',
                backgroundColor: 'rgba(255,255,255,0.18)',
              }} />
            ) : (
              <div key={i} style={{ textAlign: 'center' }}>
                <span style={{
                  display: 'block',
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#fff',
                  letterSpacing: '-0.02em',
                }}>
                  {item.num}
                </span>
                <span style={{
                  display: 'block',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.50)',
                  fontWeight: '500',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}>
                  {item.label}
                </span>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  )
}

export default Homescreen
