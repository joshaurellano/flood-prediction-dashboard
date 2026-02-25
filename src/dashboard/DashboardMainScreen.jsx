import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import supabase from '../supabase-client';
import NavigationBar from './components/NavigationBar';
import Sidebar from './components/Sidebar';
import { Col, Row, Container, Card } from 'react-bootstrap';

function Dashboard() {

    const [userData, setUserData] = useState('')
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() =>{
        async function checkSession() {
            if(location.state){
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

  return (
    <div style={{minHeight:'100vh', maxWidth:'100vw'}}>
        <Row style={{height:'100vh'}}>
            <Col lg={2} style={{paddingRight:0}}>
                <Sidebar />
            </Col>

            <Col lg={10} style={{paddingLeft:0}}>
                <NavigationBar />
                    <Container style={{padding:'15px'}}>
                        <h3>Dashboard</h3>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>Flood Risk Level</Card.Header>
                                    <Card.Body>
                                        <span>Some data here</span>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Header>Rain Intensity</Card.Header>
                                    <Card.Body>
                                        <span>Some data here</span>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col>
                                <Card>
                                    <Card.Header>PAGASA Alert Level</Card.Header>
                                    <Card.Body>
                                        <span>Some data here</span>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Header>Rainfall Forecast Next 6 hrs</Card.Header>
                                    <Card.Body>
                                        <span>Some data here</span>
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

export default Dashboard