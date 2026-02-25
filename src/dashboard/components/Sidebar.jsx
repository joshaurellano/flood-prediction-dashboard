import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Col, Row, Container, Nav } from 'react-bootstrap'

import supabase from '../../supabase-client';

import { MdDashboard } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdTextsms } from "react-icons/md";

import '../styles/Sidebar.css'

function Sidebar() {

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
    <Col style={{height:'100vh', width:'100%',backgroundColor:'dodgerBlue', display:'flex', color:'white', flexDirection:'column',justifyContent:'space-between'}}>
        <div>
        <div style={{width:'100%',  textAlign:'center'}}>
            <h2>Agos</h2>
        </div>
        <div>
          <Nav className='flex-column'style={{borderBottom:'none'}}> 
            <Nav.Item className='sideNav'>
              <Nav.Link style={{color:'white', fontWeight:'500'}}>
                <span>
                  <MdDashboard /> Dashboard
                </span>
                
                </Nav.Link>
            </Nav.Item>

            <Nav.Item className='sideNav'>
              <Nav.Link style={{color:'white', fontWeight:'500'}}>
                <span>
                  <FaMapMarkerAlt /> Map
                </span>
              </Nav.Link>
            </Nav.Item>

          <Nav.Item className='sideNav'>
            <Nav.Link style={{color:'white', fontWeight:'500'}}>
              <span>
                <MdTextsms /> Broadcast/SMS
              </span>
            </Nav.Link>
          </Nav.Item>

          </Nav>
        </div>
        </div>
    

        <div>
          <span>{userData && userData.email}</span>
        </div>
    </Col>
  )
}

export default Sidebar