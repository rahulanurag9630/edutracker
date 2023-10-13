import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaClipboardList, FaFileAlt, FaCalendar, FaTasks, FaGraduationCap, FaHandsHelping, FaUserCircle } from 'react-icons/fa'; // Import Font Awesome icons

const StudentNav = () => {
  const radiousstyle = {
    borderRadius: '10px'
  };
  let location = useLocation();

  return (
    <div className='container'>
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
                  className={`nav-link ${location.pathname === '/shome' ? 'active' : ''}`}
                  to="/shome"
                >
                  <FaHome /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/viewnotice' ? 'active' : ''}`}
                  to="/viewnotice"
                >
                  <FaClipboardList /> View Notice
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
                  className={`nav-link ${location.pathname === '/academicdates' ? 'active' : ''}`}
                  to="/academicdates"
                >
                  <FaCalendar /> Academic Dates
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
                  <FaUserCircle /> Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default StudentNav;
