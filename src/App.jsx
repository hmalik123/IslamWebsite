import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProphetTimeline from './components/ProphetTimeline/Prophettimeline'
import Navbar from './components/Navbar/Navbar'  

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />  
        <Routes>
          <Route path="/prophettimeline" element={<ProphetTimeline />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App