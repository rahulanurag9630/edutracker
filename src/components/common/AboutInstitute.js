import React from 'react';
import '../../assets/AboutInstitute.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faChalkboard, faCog } from '@fortawesome/free-solid-svg-icons'; // Import the necessary Font Awesome icons

const AboutInstitute = () => {
  return (
    <div className="about-institute-container">
      <div className="institute-image"></div>
      <div className="about-content">
        <h1>Vision</h1>
        <p style={{fontSize:'20px'}}>
          To catalyze the transformation of our students into confident and responsible professionals,
          endowed with up-to-date knowledge and expertise in their chosen disciplines, excellent
          communication skills, and sensitive souls. They will be assets to their families, community,
          nation, and humanity at large.
        </p>

        <h1>Goals of the Institute</h1>
        <table>
          <tr>
            <th>VALUES</th>
            <th>CODE OF CONDUCT</th>
          </tr>
          <tr>
            <td><strong>Excellence:</strong></td>
            <td>Dream Big, Never being satisfied</td>

          </tr>
          <tr>
            <td><strong>Trust:</strong></td>
            <td>Dream Big, Never being satisfied</td>
          </tr>
          <tr>
            <td><strong>Excellence:</strong></td>
            <td>Be fair - do what is right, Win-Win attitude, creative solutions</td>
          </tr>
          <tr>
            <td><strong>Integrity:</strong></td>
            <td>Do what you say, say what you do, if fall, become aware & acknowledge</td>
          </tr>
          <tr>
            <td><strong>Compassion:</strong></td>
            <td>Don't judge, Listen and Connect</td>
          </tr>
        </table>


      </div>
      <br />
      <br />
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
    </div>
  );
};

export default AboutInstitute;
