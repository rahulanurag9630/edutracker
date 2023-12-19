import React, { useState, useEffect } from 'react';
import '../../assets/TypingTextComponent.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faChalkboard, faCog } from '@fortawesome/free-solid-svg-icons'; // Import the necessary Font Awesome icons

const TypingTextComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "welcome to EduTracker";

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % (fullText.length + 1)); // Reset to 0 when it reaches the end
    }, 200); // Typing speed (milliseconds)

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <>
      <div className="typing-text-component">
        <h3>{fullText.slice(0, currentIndex)}</h3>
        <p >EduTracker is a comprehensive education <br /> management platform designed to <br /> enhance learning experiences for students, <br /> streamline teaching processes<br /> for educators, and facilitate seamless<br /> communication for parents. Our<br /> platform offers a range of features<br /> tailored to meet the needs of different user roles.</p>

      </div>
      <div className="institute-image" style={{borderRadius:'20px'}}></div>
      <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <FontAwesomeIcon icon={faGraduationCap} className="card-icon" /> {/* Education Services Icon */}
              <h5 className="card-title">Education Services</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <FontAwesomeIcon icon={faChalkboard} className="card-icon" /> {/* Smart Classroom Icon */}
              <h5 className="card-title">Smart Classroom</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <FontAwesomeIcon icon={faCog} className="card-icon" /> {/* Services Icon */}
              <h5 className="card-title">Other Services</h5>
              <p className="card-text">This is a new card added to the row. Lorem ipsum dolor sit amet consectetur </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TypingTextComponent;
