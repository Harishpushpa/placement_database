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
import Adminlogin from './Admin/AdminAuth/AdminLogin'
import { AdminDesktop } from './Admin/AdminInterface/AdminDesktop'
import { UpdateNews } from './Admin/Function/UpdateNews'

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
        <Route path="Adminlogin" element={<Adminlogin/>}/>
        <Route path="AdminDesktop" element={<AdminDesktop/>}/>
        <Route path="/updatenews" element={<UpdateNews/>}/>
      </Routes>
    </Router>
  )
}

export default App;
