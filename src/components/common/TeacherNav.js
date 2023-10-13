import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaClipboardList, FaFileAlt, FaCalendar, FaTasks, FaGraduationCap } from 'react-icons/fa'; // Import Font Awesome icons
import { AiOutlineSolution } from 'react-icons/ai';

const TeacherNav = () => {
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
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/examresult' ? 'active' : ''}`}
                  to="/examresult"
                >
                  <FaCalendar /> Exam Result
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/uploadnotes' ? 'active' : ''}`}
                  to="/uploadnotes"
                >
                  <FaTasks /> Upload Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/viewnotes' ? 'active' : ''}`}
                  to="/viewnotes"
                >
                  <AiOutlineSolution /> View Notes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TeacherNav;
