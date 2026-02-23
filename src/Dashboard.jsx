import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from "@supabase/supabase-js";
import { Button } from 'react-bootstrap';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY);


function Dashboard() {

    const [userData, setuserData] = useState('')
    const navigate = useNavigate()

    async function signOut() {
    const { error } = await supabase.auth.signOut()
    navigate('/')
    }

    useEffect(() =>{
        async function checkSession() {
            const { data, error } = await supabase.auth.getSession()
              if (!data.session) {  // ✅ check for null session instead
                navigate('/login')
            } else {
                setuserData(data.session.user)  // store just the user object
            }
        }
        
    checkSession()
    }, [])

  return (
    <div>
        <h1>{userData && userData.email}</h1>

        <Button onClick={signOut}>Logout</Button>
    </div>
  )
}

export default Dashboard