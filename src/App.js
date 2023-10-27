import React, { useState, useEffect, } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import img from './assets/images/brain-544403_1280.png'
// import dotenv from 'dotenv';



// Teacher component ////////////////////////////////////////////////////////
import UploadNotes from './components/teacher/UploadNotes';
import ExamResult from './components/teacher/ExamResult';
import AttendanceForm from './components/teacher/AttendanceForm';
import AssignmentForm from './components/teacher/AssignmentForm';
import THome from './components/teacher/THome';
import NoticeForm from './components/teacher/NoticeForm';
import SubmittedAssignment from './components/teacher/SubmittedAssignment';
import AllResult from './components/teacher/AllResult';


//Parent components ////////////////////////////////////////////////////////
import PHome from './components/parent/PHome'
import Results from './components/parent/Results'
import MonitorAttendance from './components/parent/MonitorAttendance'

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
import QueryList from './components/admin/QueryList';

// common component //////////////////////////////////////////////////////
import Navbar from './components/common/Navbar';
import TeacherNav from './components/common/TeacherNav';
import Home from './components/common/Home';
import StudentNav from './components/common/StudentNav';
import Footer from './components/common/Footer';
import InstituteTeam from './components/common/InstituteTeam';

// auth component //////////////////////////////////////////////////////////////
import UserLogin from './components/auth/UserLogin'
import Login from './components/auth/Login';
import './App.css'
import Alert from './components/common/Alert';
import AllAttendance from './components/teacher/AllAttendance';


function App() {
  // dotenv.config();
  // console.log(process.env.DB);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  const members = [
    {
      name: 'John Doe',
      role: 'Professor',
      department: 'Computer Science',
      photoUrl: 'https://media.istockphoto.com/id/1465817305/photo/happy-young-people-jumping-together-at-school.jpg?s=2048x2048&w=is&k=20&c=xTSYQghvpHT9eangOZMc_xs12ZG75GkRvCQkdrLQMM8=',
    },
    {
      name: 'Jane Smith',
      role: 'Assistant Professor',
      department: 'Physics',
      photoUrl: 'https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_1280.jpg',
    },
    {
      name: 'Jane Smith',
      role: 'Assistant Professor',
      department: 'Physics',
      photoUrl: 'https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_1280.jpg',
    },
    {
      name: 'Jane Smith',
      role: 'Assistant Professor',
      department: 'Physics',
      photoUrl: 'https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_1280.jpg',
    },
    {
      name: 'Jane Smith',
      role: 'Assistant Professor',
      department: 'Physics',
      photoUrl: 'https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_1280.jpg',
    },
    {
      name: 'Jane Smith',
      role: 'Assistant Professor',
      department: 'Physics',
      photoUrl: 'https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_1280.jpg',
    },

    {
      name: 'Jane Smith',
      role: 'Assistant Professor',
      department: 'Physics',
      photoUrl: 'https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_1280.jpg',
    },
    {
      name: 'Jane Smith',
      role: 'Assistant Professor',
      department: 'Physics',
      photoUrl: 'https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_1280.jpg',
    },
    // Add more members as needed
  ];
  
  return (
    <div className="container blur-background">

      <Router>
        {/* <StudentPhoto /> */}
        <Alert alert={alert} />
        <Navbar />
       
        <Routes>
        <Route exact path='/teams' element={<InstituteTeam members={members} />}></Route>


          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/adminlogin' element={<Login showAlert={showAlert} />}></Route>
          <Route exact path='/userlogin' element={<UserLogin showAlert={showAlert} />}></Route>
          <Route exact path='/shome' element={<SHome showAlert={showAlert} />}></Route>
          <Route exact path='/viewnotice' element={<ViewNotice />}></Route>
          <Route exact path='/notes' element={<Notes showAlert={showAlert} />}></Route>
          <Route exact path='/viewattendence' element={<ViewAttendence />}></Route>
          <Route exact path='/viewassignment' element={<ViewAssignment />}></Route>
          <Route exact path='/examresult1' element={<ExamResult1 />}></Route>
          <Route exact path='/academicdates' element={<AcademicDates />}></Route>
          <Route exact path='/helpdesk' element={<HelpDesk showAlert={showAlert}/>}></Route>
          <Route exact path='/profile' element={<Profile />}></Route>
          <Route exact path='/thome' element={<THome showAlert={showAlert} />}></Route>
          <Route exact path='/giveassignment' element={<AssignmentForm showAlert={showAlert} />}></Route>
          <Route exact path='/takeattendance' element={< AttendanceForm  showAlert={showAlert}/>}></Route>
          <Route exact path='/examresult' element={<ExamResult />}></Route>
          <Route exact path='/uploadnotes' element={< UploadNotes />}></Route>
          <Route exact path='/ahome' element={<AHome showAlert={showAlert} />}></Route>
          <Route exact path='/registerteacher' element={<TeacherReg />}></Route>
          <Route exact path='/registerstudent' element={< StudentReg />}></Route>
          <Route exact path='/registerparent' element={<ParentReg />}></Route>
          <Route exact path='/phome' element={<PHome showAlert={showAlert} />}></Route>
          <Route exact path='/publishnotices' element={<NoticeForm showAlert={showAlert}  />}></Route>
          <Route exact path='/results' element={<Results />}></Route>
          <Route exact path='/monitorAttendance' element={<MonitorAttendance />}></Route>
          <Route exact path='/submittedAssignment' element={<SubmittedAssignment />}></Route>
          <Route exact path='/allResult' element={<AllResult />}></Route>
          <Route exact path='/allAttendance' element={<AllAttendance />} ></Route>
          <Route exact path='/query' element={<QueryList />}></Route>

      

        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
