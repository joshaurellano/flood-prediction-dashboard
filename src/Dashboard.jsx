import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import supabase from './supabase-client';

import { Button } from 'react-bootstrap';

function Dashboard() {

    const [userData, setUserData] = useState('')
    const navigate = useNavigate()
    const location = useLocation();

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        navigate('/')

        if(error){
            alert('Error logging out')
        }
    }

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
    <div>
        <h1>{userData && userData.email}</h1>

        <Button onClick={signOut}>Logout</Button>
    </div>
  )
}

export default Dashboard