import React from 'react';
import { FaHome, FaUser, FaClipboardList, FaFileAlt, FaCalendar, FaTasks, FaGraduationCap, FaHandsHelping, FaFileUpload, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../assets/navbar.css';
import '../../assets/Introduction.css'; // Import your custom CSS file for styling

function Introduction() {
  return (
    <div className="introduction-container " style={{marginTop:'3vh', marginBottom:'3vh'}}>
      <div className="introduction-content">
        <h1 className='ih'>Welcome to EduTracker!</h1>
        <p className="description">
          EduTracker is a comprehensive education management platform designed to enhance learning experiences for students, streamline teaching processes for educators, and facilitate seamless communication for parents. Our platform offers a range of features tailored to meet the needs of different user roles.
        </p>
        <ul className="feature-list">
          <li><FaUser /> Students can access their home dashboard, view notes, check attendance, and submit assignments.</li>
          <li><FaClipboardList /> Teachers can assign tasks, manage attendance, and upload study materials.</li>
          <li><FaGraduationCap /> Parents can monitor their child's progress, view exam results, and communicate with teachers.</li>
          <li><FaHandsHelping /> The Help Desk feature allows users to seek assistance and resolve queries efficiently.</li>
          <li><FaFileUpload /> Users can upload and share study materials using the Upload Notes functionality.</li>
        </ul>
        <p className="conclusion">
          Experience a smarter way of learning and stay connected with your educational journey through EduTracker!
        </p>
      </div>
    </div>
  );
}

export default Introduction;
