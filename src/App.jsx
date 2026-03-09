import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Homescreen from "./Homescreen"
import Login from "./Login"
import Dashboard from "./dashboard/DashboardMainScreen"
import Analytics from "./dashboard/Analytics"
import Broadcast from "./dashboard/Broadcast"

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homescreen />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/broadcast" element={<Broadcast />} />
      </Routes>
     
    </Router>
  )
}

export default App
