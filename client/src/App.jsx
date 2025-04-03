import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Registration  from './Auth/Registration'
import Login from './Auth/Login'
import { Personaldata } from './userdata/Personaldata'
import { MainDesktop } from './MainInterface/MainDesktop'
import LowerAcademicDetails from './userdata/LowerAcademicDetails'
import { UpperAcademicDetails } from './userdata/UpperAcademicDetails'
import { PrimaryData } from './userdata/PrimaryData'
import CoCurricular from './userdata/CoCurricular'

 const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/"element={<Login/>}/>
        <Route path="/maindesktop" element={<MainDesktop/>}/>
        <Route path="/personaldata" element={<Personaldata/>}/>
        <Route path="/LowerAcademicDetails" element={<LowerAcademicDetails/>}/>
        <Route path="/UpperAcademicDetails" element={<UpperAcademicDetails/>}/>
        <Route path="/PrimaryData" element={<PrimaryData/>}/>
        <Route path="/CoCurricular" element={<CoCurricular/>}/>
      </Routes>
    </Router>
  )
}

export default App;
