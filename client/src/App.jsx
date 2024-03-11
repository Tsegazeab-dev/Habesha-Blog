import './App.css'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Project from './pages/Project'
import Header from './components/Header'
import Test from './pages/test'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/projects" element={<Project/>} />
      <Route path="/test" element={<Test/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signin" element={<SignIn/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
