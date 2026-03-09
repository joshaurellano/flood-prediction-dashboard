import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import supabase from '../supabase-client'
import NavigationBar from './components/NavigationBar'
import Sidebar from './components/Sidebar'
import { Col, Row, Container, Card, Form, Button, Spinner } from 'react-bootstrap'
import { MdSend, MdWarning, MdCheckCircle, MdInfo } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'

// ── Alert level templates ──────────────────────────────────────────────────────
const TEMPLATES = [
  {
    label: 'Yellow Alert',
    color: '#f59e0b',
    bg: '#fffbeb',
    border: '#fcd34d',
    message: 'YELLOW ALERT: Moderate flooding is possible in low-lying areas of your barangay. Please stay vigilant and monitor updates. Avoid going near waterways. — AGOS Flood Monitoring System',
  },
  {
    label: 'Orange Alert',
    color: '#f97316',
    bg: '#fff7ed',
    border: '#fb923c',
    message: 'ORANGE ALERT: Rising water levels have been detected. Residents in flood-prone areas are advised to prepare for possible evacuation. Keep emergency kits ready. — AGOS Flood Monitoring System',
  },
  {
    label: 'Red Alert',
    color: '#ef4444',
    bg: '#fff1f2',
    border: '#fca5a5',
    message: 'RED ALERT: Severe flooding is imminent. Mandatory evacuation is now in effect for all low-lying areas. Proceed immediately to the nearest evacuation center. — AGOS Flood Monitoring System',
  },
]

function Broadcast() {
  const [userData, setUserData] = useState('')
  const [message, setMessage] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  const MAX_CHARS = 320

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

  function applyTemplate(template, index) {
    setMessage(template.message)
    setCharCount(template.message.length)
    setSelectedTemplate(index)
    setSent(false)
  }

  function handleMessageChange(e) {
    const val = e.target.value
    if (val.length <= MAX_CHARS) {
      setMessage(val)
      setCharCount(val.length)
      setSelectedTemplate(null)
      setSent(false)
    }
  }

  async function handleSend(e) {
    e.preventDefault()
    if (!message.trim()) return
    setSending(true)

    // TODO: Replace with your actual SMS API call (e.g. Semaphore, Vonage)
    await new Promise(res => setTimeout(res, 2000))

    setSending(false)
    setSent(true)
    setMessage('')
    setCharCount(0)
    setSelectedTemplate(null)
  }

  const now = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })

  return (
    <div style={{ minHeight: '100vh', maxWidth: '100vw' }}>
      <Row style={{ height: '100vh' }} className="g-0">

        {/* Sidebar */}
        <Col lg={2} style={{ paddingRight: 0 }}>
          <Sidebar />
        </Col>

        {/* Main */}
        <Col lg={10} style={{ paddingLeft: 0, backgroundColor: '#f4f7fb', overflowY: 'auto' }}>
          <NavigationBar pageTitle="Broadcast / SMS" />

          <Container fluid style={{ padding: '28px' }}>

            {/* Page header */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{
                fontSize: '22px', fontWeight: '800',
                color: '#0d1f33', letterSpacing: '-0.02em', marginBottom: '4px',
              }}>
                Broadcast / SMS
              </h4>
              <span style={{ fontSize: '12px', color: '#9ab0c8' }}>
                Send alerts to all registered barangay residents · {now}
              </span>
            </div>

            <Row className="g-3">

              {/* Left — Compose */}
              <Col lg={7}>

                {/* Success banner */}
                {sent && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #86efac',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    marginBottom: '16px',
                  }}>
                    <MdCheckCircle style={{ fontSize: '22px', color: '#22c55e', flexShrink: 0 }} />
                    <div>
                      <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#15803d' }}>
                        Message sent successfully!
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#4ade80' }}>
                        All registered residents have been notified.
                      </p>
                    </div>
                  </div>
                )}

                <Card style={{
                  border: 'none', borderRadius: '16px',
                  boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
                  backgroundColor: '#fff',
                }}>
                  <Card.Body style={{ padding: '24px' }}>
                    <h6 style={{
                      fontSize: '15px', fontWeight: '700',
                      color: '#0d1f33', marginBottom: '4px',
                    }}>
                      Compose Message
                    </h6>
                    <p style={{ fontSize: '13px', color: '#9ab0c8', marginBottom: '20px' }}>
                      Write a custom message or use a template below.
                    </p>

                    <Form onSubmit={handleSend}>
                      <Form.Group style={{ marginBottom: '8px' }}>
                        <Form.Control
                          as="textarea"
                          rows={6}
                          placeholder="Type your alert message here..."
                          value={message}
                          onChange={handleMessageChange}
                          style={{
                            border: '1.5px solid #dde6f0',
                            borderRadius: '10px',
                            backgroundColor: '#f7fafd',
                            fontSize: '14px',
                            color: '#1a2b3c',
                            resize: 'none',
                            lineHeight: '1.7',
                            padding: '14px 16px',
                          }}
                          required
                        />
                      </Form.Group>

                      {/* Char count */}
                      <div style={{
                        display: 'flex', justifyContent: 'flex-end',
                        marginBottom: '20px',
                      }}>
                        <span style={{
                          fontSize: '12px',
                          color: charCount > MAX_CHARS * 0.9 ? '#f59e0b' : '#b0c0d0',
                          fontWeight: '500',
                        }}>
                          {charCount} / {MAX_CHARS}
                        </span>
                      </div>

                      {/* Recipient info */}
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        backgroundColor: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        marginBottom: '20px',
                      }}>
                        <FaUsers style={{ fontSize: '18px', color: '#0070d8', flexShrink: 0 }} />
                        <div>
                          <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#0d1f33' }}>
                            Sending to: All Residents
                          </p>
                          <p style={{ margin: 0, fontSize: '12px', color: '#7a94a8' }}>
                            All registered barangay residents will receive this message via SMS.
                          </p>
                        </div>
                      </div>

                      {/* Send button */}
                      {sending ? (
                        <Button disabled style={{
                          width: '100%', height: '50px',
                          background: 'linear-gradient(135deg, #0070d8, #00aaff)',
                          border: 'none', borderRadius: '10px',
                          fontSize: '15px', fontWeight: '700',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                          opacity: 0.75,
                        }}>
                          <Spinner animation="border" size="sm" />
                          Sending…
                        </Button>
                      ) : (
                        <Button type="submit" style={{
                          width: '100%', height: '50px',
                          background: 'linear-gradient(135deg, #0070d8, #00aaff)',
                          border: 'none', borderRadius: '10px',
                          fontSize: '15px', fontWeight: '700', color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                          boxShadow: '0 6px 20px rgba(0,120,255,0.30)',
                        }}>
                          <MdSend style={{ fontSize: '18px' }} />
                          Send to All Residents
                        </Button>
                      )}
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              {/* Right — Templates + Info */}
              <Col lg={5}>

                {/* Alert templates */}
                <Card style={{
                  border: 'none', borderRadius: '16px',
                  boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
                  backgroundColor: '#fff',
                  marginBottom: '16px',
                }}>
                  <Card.Body style={{ padding: '22px 24px' }}>
                    <h6 style={{
                      fontSize: '15px', fontWeight: '700',
                      color: '#0d1f33', marginBottom: '4px',
                    }}>
                      Alert Templates
                    </h6>
                    <p style={{ fontSize: '13px', color: '#9ab0c8', marginBottom: '16px' }}>
                      Tap a template to auto-fill the message.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {TEMPLATES.map((t, i) => (
                        <div
                          key={i}
                          onClick={() => applyTemplate(t, i)}
                          style={{
                            backgroundColor: selectedTemplate === i ? t.bg : '#f7fafd',
                            border: `1.5px solid ${selectedTemplate === i ? t.border : '#dde6f0'}`,
                            borderRadius: '10px',
                            padding: '12px 14px',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <MdWarning style={{ color: t.color, fontSize: '16px', flexShrink: 0 }} />
                            <span style={{ fontSize: '13px', fontWeight: '700', color: t.color }}>
                              {t.label}
                            </span>
                          </div>
                          <p style={{
                            margin: 0, fontSize: '12px', color: '#7a94a8',
                            lineHeight: '1.6',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>
                            {t.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>

                {/* Info card */}
                <Card style={{
                  border: 'none', borderRadius: '16px',
                  boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
                  backgroundColor: '#fff',
                }}>
                  <Card.Body style={{ padding: '22px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <MdInfo style={{ fontSize: '20px', color: '#0070d8', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <h6 style={{ fontSize: '14px', fontWeight: '700', color: '#0d1f33', marginBottom: '6px' }}>
                          How it works
                        </h6>
                        <p style={{ fontSize: '13px', color: '#7a94a8', lineHeight: '1.7', margin: 0 }}>
                          Messages are sent via SMS to all phone numbers registered in the barangay resident database.
                          Make sure your SMS API credentials are configured in your environment settings.
                        </p>
                      </div>
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

export default Broadcast
