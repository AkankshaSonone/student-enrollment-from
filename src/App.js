import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Form from './components/Form';
import Navbar from './components/Navbar';

export const App = () => {



  return (
    
    <Router>
      <Navbar />
      <Routes>
      <Route exact path="/" element={<Form />} />
      </Routes>
    </Router>
  )
}

export default App