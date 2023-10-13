import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaClipboardList, FaFileAlt, FaCalendar, FaTasks, FaGraduationCap } from 'react-icons/fa'; // Import Font Awesome icons
import { AiOutlineSolution } from 'react-icons/ai';

const AdminNav = () => {
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
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNav;
