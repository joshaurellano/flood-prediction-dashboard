import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from './supabase-client'
import {
  Form, Row, Col, Button, Image, Navbar,
  Container, InputGroup, FloatingLabel, Spinner
} from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa'
import { IoIosEyeOff, IoIosEye } from 'react-icons/io'
import { TbArrowBack } from 'react-icons/tb'
import { IoMdMail } from 'react-icons/io'
import { MdLockPerson } from 'react-icons/md'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession()
      if (data.session) navigate('/dashboard', { state: { userData: data } })
    }
    checkSession()
  }, [navigate])

  async function signInWithEmail(event) {
    event.preventDefault()
    setButtonLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setButtonLoading(false)
    if (data.session != null) {
      navigate('/dashboard', { state: { userData: data } })
    } else {
      if (error?.message === 'Invalid login credentials') setError(error.message)
    }
  }

  return (
    <div style={{ maxHeight: '100vh', maxWidth: '100vw', overflowX: 'hidden' }}>
      <Row className="g-0">

        {/* ── Left Panel ── */}
        <Col sm={12} lg={6} style={{
          height: '100vh',
          backgroundImage: `url("https://res.cloudinary.com/dgjbvgwiv/image/upload/v1771849872/jonathan-ford-6ZgTEtvD16I-unsplash_swrwpv.jpg")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflowX: 'hidden',
          overflowY: 'hidden',
          position: 'relative',
        }}>

          {/* Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, rgba(0,18,48,0.86) 0%, rgba(0,45,100,0.65) 100%)',
          }} />

          {/* Water tint */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(0,100,200,0.28) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />

          {/* Back button */}
          <Navbar style={{ position: 'absolute', top: 0, width: '100%', zIndex: 10 }}>
            <Container>
              <TbArrowBack
                style={{ color: 'rgba(255,255,255,0.75)', fontSize: '28px', cursor: 'pointer' }}
                onClick={() => navigate('/')}
              />
            </Container>
          </Navbar>

          {/* Branding */}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0 48px 60px',
          }}>
            <Image
              src="https://res.cloudinary.com/dgjbvgwiv/image/upload/v1771741662/AGOS_-_darkbg_kflri2.png"
              style={{ height: '72px', width: 'auto', marginBottom: '24px' }}
            />
            <h2 style={{
              fontSize: 'clamp(22px, 2.8vw, 32px)',
              fontWeight: '800',
              color: '#fff',
              lineHeight: '1.25',
              marginBottom: '10px',
            }}>
              Barangay Flood Monitoring<br />and Forecasting
            </h2>
            <p style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.68)',
              lineHeight: '1.6',
              maxWidth: '340px',
              marginBottom: '28px',
            }}>
              Empowering communities with real-time data to prepare, respond, and stay safe.
            </p>

            {/* Feature pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Real-Time Alerts', 'AI Forecasting', 'Push Notifications'].map(f => (
                <span key={f} style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: '999px',
                  padding: '6px 16px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.90)',
                  letterSpacing: '0.04em',
                }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </Col>

        {/* ── Right Panel ── */}
        <Col sm={12} lg={6} style={{
          height: '100vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
        }}>
          <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '36px 48px',
          }}>

            {/* Top brand mark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px',
                borderRadius: '9px',
                background: 'linear-gradient(135deg, #0070d8, #00aaff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 16C5 13 8 12 12 14C16 16 19 15 21 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M3 20C5 17 8 16 12 18C16 20 19 19 21 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
                </svg>
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a2b3c', letterSpacing: '0.02em' }}>
                AGOS
              </span>
            </div>

            {/* Form section */}
            <div>
              <p style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#0090ff',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}>
                Welcome back
              </p>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#0d1f33',
                marginBottom: '6px',
                letterSpacing: '-0.02em',
              }}>
                Sign in to your account
              </h1>
              <p style={{ fontSize: '14px', color: '#7a94a8', marginBottom: '32px' }}>
                Enter your credentials to access the flood dashboard.
              </p>

              <Form style={{ width: '100%' }} onSubmit={signInWithEmail}>

                {/* Email */}
                <Form.Group className="pb-3">
                  <InputGroup>
                    <InputGroup.Text style={{
                      backgroundColor: '#f0f5fa',
                      border: '1.5px solid #dde6f0',
                      borderRight: 'none',
                      color: '#7a94a8',
                      fontSize: '18px',
                    }}>
                      <IoMdMail />
                    </InputGroup.Text>
                    <FloatingLabel label="Email Address">
                      <Form.Control
                        style={{
                          height: '50px',
                          border: '1.5px solid #dde6f0',
                          borderLeft: 'none',
                          backgroundColor: '#f7fafd',
                          fontSize: '15px',
                          color: '#1a2b3c',
                        }}
                        type="email"
                        placeholder=""
                        onChange={e => { setEmail(e.target.value); setError('') }}
                        required
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Form.Group>

                {/* Password */}
                <Form.Group style={{ paddingBottom: '8px' }}>
                  <InputGroup>
                    <InputGroup.Text style={{
                      backgroundColor: '#f0f5fa',
                      border: '1.5px solid #dde6f0',
                      borderRight: 'none',
                      color: '#7a94a8',
                      fontSize: '18px',
                    }}>
                      <MdLockPerson />
                    </InputGroup.Text>
                    <FloatingLabel label="Password">
                      <Form.Control
                        style={{
                          height: '50px',
                          border: '1.5px solid #dde6f0',
                          borderLeft: 'none',
                          borderRight: 'none',
                          backgroundColor: '#f7fafd',
                          fontSize: '15px',
                          color: '#1a2b3c',
                        }}
                        type={showPassword ? 'text' : 'password'}
                        placeholder=""
                        onChange={e => { setPassword(e.target.value); setError('') }}
                        required
                      />
                    </FloatingLabel>
                    <InputGroup.Text style={{
                      backgroundColor: '#f7fafd',
                      border: '1.5px solid #dde6f0',
                      borderLeft: 'none',
                      cursor: 'pointer',
                      color: '#9ab0c8',
                      fontSize: '20px',
                    }}>
                      {showPassword
                        ? <IoIosEyeOff onClick={() => setShowPassword(false)} />
                        : <IoIosEye onClick={() => setShowPassword(true)} />
                      }
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                {/* Forgot password */}
                <Form.Text style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '20px' }}>
                  <span style={{
                    fontSize: '13px',
                    color: '#0090ff',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}>
                    Forgot Password?
                  </span>
                </Form.Text>

                {/* Error */}
                {error && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#fff1f2',
                    border: '1px solid #fca5a5',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#dc2626',
                    marginBottom: '14px',
                  }}>
                    <div style={{
                      width: '6px', height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#dc2626',
                      flexShrink: 0,
                    }} />
                    {error}
                  </div>
                )}

                {/* Submit */}
                {buttonLoading ? (
                  <Button
                    disabled
                    style={{
                      width: '100%',
                      height: '50px',
                      background: 'linear-gradient(135deg, #0070d8, #00aaff)',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      opacity: 0.75,
                    }}
                  >
                    <Spinner animation="border" size="sm" />
                    Signing in…
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    style={{
                      width: '100%',
                      height: '50px',
                      background: 'linear-gradient(135deg, #0070d8, #00aaff)',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      color: '#fff',
                      boxShadow: '0 6px 20px rgba(0,120,255,0.30)',
                    }}
                  >
                    Sign In <FaArrowRight style={{ fontSize: '13px' }} />
                  </Button>
                )}

                <hr style={{ marginTop: '28px', borderColor: '#eef2f7' }} />
              </Form>
            </div>

            {/* Footer */}
            <span style={{ fontSize: '12px', color: '#b0c0d0', textAlign: 'center' }}>
              © 2026 AGOS. All rights reserved.
            </span>
          </div>
        </Col>

      </Row>
    </div>
  )
}

export default Login
