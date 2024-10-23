import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from "react-router-dom"
import Home from './pages/Home/Home'
import Header from "./components/Header/Header"
import Movie from './pages/Movie/Movie'
import Profile from './pages/Profile/Profile'
import MovieList from './pages/MovieList/MovieList'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

function App() {
  const currentLocation = useLocation().pathname;
  console.log(currentLocation)

  return (
    <div className='app'>
      <Header />
      {currentLocation === "/" && <Home />}

      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path='/Movie' element={<Movie />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/MovieList" element={<MovieList />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
