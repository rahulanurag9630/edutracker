import React from 'react';
import '../../assets/InstitueTeam.css' // Import the CSS file for styling

const InstituteTeam = ({ members }) => {
  return (
    <div className="team-container">
      {members.map((member, index) => (
        <div className="team-card" key={index}>
          <img src={member.photoUrl} alt={member.name} className="team-member-photo" />
          <h2 className="team-member-name">{member.name}</h2>
          <p className="team-member-role">{member.role}</p>
          <p className="team-member-department">{member.department}</p>
        </div>
      ))}
    </div>
  );
};

export default InstituteTeam;
