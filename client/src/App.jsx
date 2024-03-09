import './App.css'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Project from './pages/Project'
import Header from './components/Header'
function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/project" element={<Project/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
