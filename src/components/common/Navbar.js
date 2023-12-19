import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaUser, FaUserShield, FaClipboardList, FaFileAlt, FaSignOutAlt, FaCalendar, FaTasks, FaGraduationCap, FaBell, FaHandsHelping, FaFileUpload, FaUserCircle } from 'react-icons/fa'; // Import Font Awesome icons
import { AiOutlineSolution } from 'react-icons/ai';

import '../../assets/navbar.css'




///////////////////////////////////////////////////////////////////////////////////////////////////////



function Navbar() {
  const navigate = useNavigate();
  const radiousstyle = {
    borderRadius: '10px',
    backgroundColor: ''

  };
  let location = useLocation();
  let navLinks;
  let userType = localStorage.getItem('userType')
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('userType');
    localStorage.removeItem('name');
    localStorage.removeItem('rollNo');
    localStorage.removeItem('contactNumber')
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      navigate('/');
      console.log('logged out'); 
    } else {
      // If the user is not logged in, redirect to the home page

    }

  }

  switch (userType) {
    case "Student":
      navLinks = (
        <nav className="navbar navbar-expand-lg navbar-dark " style={radiousstyle}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/shome">
              EduTracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/shome' ? 'active' : ''}`}
                    to="/shome"
                  >
                    <FaHome /> Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/notes' ? 'active' : ''}`}
                    to="/notes"
                  >
                    <FaFileAlt /> Notes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/viewattendence' ? 'active' : ''}`}
                    to="/viewattendence"
                  >
                    <FaCalendar /> View Attendance
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/viewassignment' ? 'active' : ''}`}
                    to="/viewassignment"
                  >
                    <FaTasks /> View Assignment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/examresult' ? 'active' : ''}`}
                    to="/examresult1"
                  >
                    <FaGraduationCap /> Exam Result
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/helpdesk' ? 'active' : ''}`}
                    to="/helpdesk"
                  >
                    <FaHandsHelping /> Help Desk
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
                    to="/profile"
                  >
                    <FaUserCircle /> Profile(Smart Card)
                  </Link>
                </li>
                <button className="btn btn-danger" onClick={handleLogout} style={{marginLeft: '8rem'   }}>
                  <FaSignOutAlt className="logout-icon" /> Logout
                </button>
              </ul>
            </div>
          </div>
        </nav>
      );
      break;
    case "Teacher":
      navLinks = (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={radiousstyle}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/shome">
              EduTracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/thome' ? 'active' : ''}`}
                    to="/thome"
                  >
                    <FaHome /> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/giveassignment' ? 'active' : ''}`}
                    to="/giveassignment"
                  >
                    <FaClipboardList /> Give Assignment
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/takeattendance' ? 'active' : ''}`}
                    to="/takeattendance"
                  >
                    <FaFileAlt /> Take Attendance
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaFileUpload /> Details
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/examresult">
                        <FaCalendar /> Exam Result
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/allResult">
                        <FaFileUpload /> All Result
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/allAttendance">
                        <FaFileUpload /> Attendance
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/submittedAssignment">
                      <FaClipboardList /> Submitted Assignments
                      </Link>
                    </li>
                  </ul>
                </li>


                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/uploadnotes' ? 'active' : ''}`}
                    to="/uploadnotes"
                  >
                    <FaFileUpload /> Upload Notes
                  </Link>
                </li>


                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/publishnotices' ? 'active' : ''}`}
                    to="/publishnotices">
                    <FaBell /> Publish Notices
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={handleLogout} style={{marginLeft: '8rem'   }}>
                    <FaSignOutAlt className="logout-icon" /> Logout
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      );
      break;
    case "Parent":
      navLinks = (
        // <nav>
        //   <Link to="/thome">Home</Link>
        //   <Link to="/assignment">Give Assingnment</Link>
        //   <Link to="/viewattendance">Take Attendance</Link>
        //   <Link to="/examresult">Exam Result</Link>
        //   <Link to="/uploadnotes">Upload Notes</Link>
        //   <Link to="/publishnotises">Publish Notises</Link>

        //   <Link onClick={handleLogout}>Logout</Link>
        // </nav>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={radiousstyle}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/shome">
              EduTracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/phome' ? 'active' : ''}`}
                    to="/phome"
                  >
                    <FaHome /> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/results' ? 'active' : ''}`}
                    to="/results"
                  >
                    <FaGraduationCap /> Results
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/monitorAttendance' ? 'active' : ''}`}
                    to="/monitorAttendance"
                  >
                    <FaCalendar />Attendance
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/viewnotice' ? 'active' : ''}`}
                    to="/viewnotice"
                  >
                    <FaBell /> Notices
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/temp' ? 'active' : ''}`}
                    to="/temp"
                  >
                    <FaHome /> Schedule Meating
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/helpdesk' ? 'active' : ''}`}
                    to="/helpdesk"
                  >
                    <FaHandsHelping /> Help
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" onClick={handleLogout} style={{marginLeft: '8rem'   }}>
                    <FaSignOutAlt className="logout-icon" /> Logout
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      );
      break;
    case "Admin":
      navLinks = (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={radiousstyle}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/shome">
              EduTracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/ahome' ? 'active' : ''}`}
                    to="/ahome"
                  >
                    <FaHome /> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/registerteacher' ? 'active' : ''}`}
                    to="/registerteacher"
                  >
                    <FaClipboardList /> Register Teacher
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/registerstudent' ? 'active' : ''}`}
                    to="/registerstudent"
                  >
                    <FaFileAlt /> Register Student
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/registerparent' ? 'active' : ''}`}
                    to="/registerparent"
                  >
                    <FaCalendar /> Register Parent
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/query' ? 'active' : ''}`}
                    to="/query"
                  >
                    <FaCalendar /> Queries
                  </Link>
                </li>
                <li className="nav-item">

                  <Link className="nav-link" onClick={handleLogout} style={{marginLeft: '8rem'   }}>
                    Logout
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      );
      break;
    default:
      navLinks = (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={radiousstyle}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              EduTracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    aria-current="page"
                    to="/"
                  >
                    <FaHome /> Home
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/teams' ? 'active' : ''}`}
                    to="/teams"
                  >
                    <FaInfoCircle /> About institute
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/userlogin' ? 'active' : ''}`}
                    to="/userlogin"
                  >
                    <FaUser /> User Login
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/helpdesk' ? 'active' : ''}`}
                    to="/helpdesk"
                  >
                    <FaUser /> Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === '/intro' ? 'active' : ''}`}
                    to="/intro"
                  >
                    <FaInfoCircle /> About Platform
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
  }

  return navLinks;
}

export default Navbar;
