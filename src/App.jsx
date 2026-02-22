import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Homescreen from "./Homescreen"
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homescreen />}/>
      </Routes>
     
    </Router>
  )
}

export default App
