import React from 'react';
import './App.css';

const NurseProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">NJ</div>
        <div className="profile-info">
          <h1>Nurse Johnson</h1>
          <p>Registered Nurse | 5 years experience</p>
        </div>
      </div>
      
      <div className="profile-section">
        <h2>Specialties</h2>
        <ul>
          <li>Emergency Care</li>
          <li>Pediatrics</li>
          <li>Geriatrics</li>
        </ul>
      </div>
      
      <div className="profile-section">
        <h2>Certifications</h2>
        <ul>
          <li>ACLS Certified</li>
          <li>PALS Certified</li>
          <li>BLS Certified</li>
        </ul>
      </div>
    </div>
  );
};

export default NurseProfile;