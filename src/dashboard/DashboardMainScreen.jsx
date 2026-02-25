import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import supabase from '../supabase-client';
import NavigationBar from './components/NavigationBar';
import Sidebar from './components/Sidebar';
import { Col, Row } from 'react-bootstrap';

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
            <Col lg={2}style={{borderRight:'1px solid black'}}>
                <Sidebar />
            </Col>

            <Col lg={10}>
                <NavigationBar />
                <h1>Dashboard</h1>

            </Col>
        </Row>
    
    </div>
  )
}

export default Dashboard