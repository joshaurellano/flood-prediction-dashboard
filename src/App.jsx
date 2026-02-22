import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Homescreen from "./Homescreen"
import Login from "./Login"
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homescreen />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
     
    </Router>
  )
}

export default App
