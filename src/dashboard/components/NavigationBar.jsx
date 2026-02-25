import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav,NavDropdown } from 'react-bootstrap'

import supabase from '../../supabase-client';

import { FaUserTie } from "react-icons/fa";
import '../styles/NavigationBar.css'
function NavigationBar() {

    const navigate = useNavigate()

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        navigate('/')

        if(error){
            alert('Error logging out')
        }
    }

  return (
    <div>
        <Navbar bg='primary' style={{maxWidth:'100%'}}>
            <Container style={{width:'100%'}}>
                <Nav className='ms-auto'>
                <NavDropdown className='d-flex align-items-center' title={<span style={{color:'white', display:'flex', alignItems:'center', gap:'5px'}}>User: <FaUserTie /> </span>} id='basic-nav-dropdown' align='end'>
                    <NavDropdown.Item>Settings</NavDropdown.Item>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => signOut()}>Logout</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Container>
        </Navbar>

    </div>
  )
}

export default NavigationBar