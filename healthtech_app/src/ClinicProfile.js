import React from 'react';
import './App.css';

const ClinicProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">CM</div>
        <div className="profile-info">
          <h1>City Medical Clinic</h1>
          <p>123 Main St, Cityville | (555) 123-4567</p>
        </div>
      </div>
      
      <div className="profile-section">
        <h2>About Us</h2>
        <p>Providing quality healthcare services since 2010. Specializing in family medicine and urgent care.</p>
      </div>
      
      <div className="profile-section">
        <h2>Staff Requirements</h2>
        <ul>
          <li>Current nursing license</li>
          <li>Minimum 2 years experience</li>
          <li>BLS certification required</li>
        </ul>
      </div>
    </div>
  );
};

export default ClinicProfile;
