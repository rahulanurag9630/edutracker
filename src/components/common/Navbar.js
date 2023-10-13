import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaUser, FaUserShield } from 'react-icons/fa'; // Import Font Awesome icons

const Navbar = () => {
  const radiousstyle = {
    borderRadius: '10px'
  };
  let location = useLocation();
  return (
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
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                to="/about"
              >
                <FaInfoCircle /> About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/adminlogin' ? 'active' : ''}`}
                to="/adminlogin"
              >
                <FaUserShield /> Admin Login
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
                className={`nav-link ${location.pathname === '/shome' ? 'active' : ''}`}
                to="/shome"
              >
                <FaUser /> student
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
