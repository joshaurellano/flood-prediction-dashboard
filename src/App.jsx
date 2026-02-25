import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Homescreen from "./Homescreen"
import Login from "./Login"
import Dashboard from "./dashboard/DashboardMainScreen"
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homescreen />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>

      </Routes>
     
    </Router>
  )
}

export default App
