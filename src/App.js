import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Teacher component ////////////////////////////////////////////////////////
import UploadNotes from './components/teacher/UploadNotes';
import ExamResult from './components/teacher/ExamResult';
import AttendanceForm from './components/teacher/AttendanceForm';
import AssignmentForm from './components/teacher/AssignmentForm';
import THome from './components/teacher/THome';

// student component ///////////////////////////////////////////////////////
import AcademicDates from './components/student/AcademicDates';
import ExamResult1 from './components/student/ExamResult';
import HelpDesk from './components/student/HelpDesk';
import Notes from './components/student/Notes';
import Profile from './components/student/Profile'
import SHome from './components/student/SHome';
import ViewAssignment from './components/student/ViewAssinment';
import ViewAttendence from './components/student/ViewAttendence';
import ViewNotice from './components/student/ViewNotice';
import StudentPhoto from './components/student/StudentPhoto';
//admin component//////////////////////////////////////////////////////////////
import StudentReg from './components/admin/StudentReg';
import TeacherReg from './components/admin/TeacherReg';
import ParentReg from './components/admin/ParentReg';
import AHome from './components/admin/AHome';
import AdminNav from './components/common/AdminNav';

// common component //////////////////////////////////////////////////////
import Navbar from './components/common/Navbar';
import TeacherNav from './components/common/TeacherNav';
import Home from './components/common/Home';
import StudentNav from './components/common/StudentNav';
import Footer from './components/common/Footer';

// auth component //////////////////////////////////////////////////////////////
import UserLogin from './components/auth/UserLogin'
import Login from './components/auth/Login';

function App() {


  let NavigationComponent;
 
  const userType = localStorage.getItem('userType')
  // Determine which navigation component to use based on user type
  if (userType === 'Admin') {
    NavigationComponent = <AdminNav />;
  } else if (userType === 'Teacher') { 
    NavigationComponent = <TeacherNav />;
  } else if (userType === 'Parent') {
    NavigationComponent = <StudentNav />;
  } else if(userType === 'Student') {
    NavigationComponent = <StudentNav />;
  }
  else {
    NavigationComponent = <Navbar />;
  }

  return (
    <div className="container">

      <BrowserRouter>
      {/* <StudentPhoto /> */}
      {NavigationComponent}
        <Routes>
          
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/adminlogin' element={<Login />}></Route>
          <Route exact path='/userlogin' element={<UserLogin />}></Route>
          <Route exact path='/shome' element={<SHome />}></Route>
          <Route exact path='/viewnotice' element={<ViewNotice />}></Route>
          <Route exact path='/notes' element={<Notes />}></Route>
          <Route exact path='/viewattendence' element={<ViewAttendence />}></Route>
          <Route exact path='/viewassignment' element={<ViewAssignment />}></Route>
          <Route exact path='/examresult1' element={<ExamResult1 />}></Route>
          <Route exact path='/academicdates' element={<AcademicDates />}></Route>
          <Route exact path='/helpdesk' element={<HelpDesk />}></Route>
          <Route exact path='/profile' element={<Profile />}></Route>
          <Route exact path='/thome' element={<THome />}></Route>
          <Route exact path='/giveassignment' element={<AssignmentForm />}></Route>
          <Route exact path='/takeattendance' element={< AttendanceForm/>}></Route>
          <Route exact path='/examresult' element={<ExamResult />}></Route>
          <Route exact path='/uploadnotes' element={< UploadNotes/>}></Route>
          <Route exact path='/ahome' element={<AHome />}></Route>
          <Route exact path='/registerteacher' element={<TeacherReg />}></Route>
          <Route exact path='/registerstudent' element={< StudentReg/>}></Route>
          <Route exact path='/registerparent' element={<ParentReg />}></Route>


        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
