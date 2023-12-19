import React, { useState, useEffect, } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import img from './assets/images/brain-544403_1280.png'
import LoadingBar from 'react-top-loading-bar';

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
import ScheduleMeeting from './components/parent/ScheduleMeeting';
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
import InstituteTeam from './components/common/AboutInstitute';
import Introduction from './components/common/Introduction';
import NotFoundPage from './components/common/NotFoundPage';


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
  const [loading, setLoading] = useState(true); // Centralized loading state
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment the progress bar until it reaches 100% when loading state is true
    if (loading) {
      const interval = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 40;
          if (newProgress >= 100) {
            clearInterval(interval); // Clear the interval when progress reaches 100%
            setTimeout(() => {
              setProgress(0); // Reset the progress bar after a short delay
              setLoading(false); // Set loading state to false after loading completes
            }, 500);
          }
          return newProgress;
        });
      }, 500);
    }

    // The effect runs whenever the loading state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // Function to start loading
  const startLoading = () => {
    setLoading(true); // Set loading state to true
    // Additional logic if needed
  };
  return (
    <div className="container blur-background content-container" onClick={startLoading} >

      <Router>
        {/* <StudentPhoto /> */}
        <LoadingBar color="blue" progress={progress} />

        <Alert alert={alert} />
        <Navbar />

        <Routes>
          <Route exact path='/teams' element={<InstituteTeam  onClick={startLoading}/>}></Route>

         <Route path="*" element={<NotFoundPage />} />
          <Route exact path='/' element={<Home  />}></Route>
          <Route exact path='/adminlogin' element={<Login showAlert={showAlert}  />}></Route>
          <Route exact path='/userlogin' element={<UserLogin showAlert={showAlert}  />}></Route>
          <Route exact path='/shome' element={<SHome showAlert={showAlert}  />}></Route>
          <Route exact path='/viewnotice' element={<ViewNotice  />}></Route>
          <Route exact path='/notes' element={<Notes showAlert={showAlert}  />}></Route>
          <Route exact path='/viewattendence' element={<ViewAttendence showAlert={showAlert}  />}></Route>
          <Route exact path='/viewassignment' element={<ViewAssignment showAlert={showAlert}  />}></Route>
          <Route exact path='/examresult1' element={<ExamResult1  />}></Route>
          <Route exact path='/academicdates' element={<AcademicDates  />}></Route>
          <Route exact path='/helpdesk' element={<HelpDesk showAlert={showAlert}  />}></Route>
          <Route exact path='/profile' element={<Profile />}></Route>
          <Route exact path='/thome' element={<THome showAlert={showAlert}  />}></Route>
          <Route exact path='/giveassignment' element={<AssignmentForm showAlert={showAlert}  />}></Route>
          <Route exact path='/takeattendance' element={< AttendanceForm showAlert={showAlert}  />}></Route>
          <Route exact path='/examresult' element={<ExamResult  />}></Route>
          <Route exact path='/uploadnotes' element={< UploadNotes  />}></Route>
          <Route exact path='/ahome' element={<AHome showAlert={showAlert}  />}></Route>
          <Route exact path='/registerteacher' element={<TeacherReg  />}></Route>
          <Route exact path='/registerstudent' element={< StudentReg  />}></Route>
          <Route exact path='/registerparent' element={<ParentReg  />}></Route>
          <Route exact path='/phome' element={<PHome showAlert={showAlert}  />}></ Route>
          <Route exact path='/publishnotices' element={<NoticeForm showAlert={showAlert}  />}></Route>
          <Route exact path='/results' element={<Results  />}></Route>
          <Route exact path='/monitorAttendance' element={<MonitorAttendance  />}></Route>
          <Route exact path='/submittedAssignment' element={<SubmittedAssignment  />}></Route>
          <Route exact path='/allResult' element={<AllResult  />}></Route>
          <Route exact path='/allAttendance' element={<AllAttendance  />} ></Route>
          <Route exact path='/query' element={<QueryList  />}></Route>
          <Route exact path='/intro' element={<Introduction  />}></Route>

          <Route exact path='/temp' element={<ScheduleMeeting  />}></Route>



        </Routes>
        <div className='footer--pin'>
          <Footer />
        </div>
      </Router>

    </div>
  );
}

export default App;
