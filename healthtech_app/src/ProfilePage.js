// import React from 'react';
// import './ProfilePage.css';

// function ProfilePage() {
//   return (
//     <div className="page-container">
//       <h1>Profile Page</h1>
//       <p className='temp'>Name: Maha Siva</p>
//       <p>Role: Nurse</p>
      
//     </div>
//   );
// }

// export default ProfilePage;

// import React from 'react';
// import './App.css';

// function ProfilePage({ currentRole }) {
//   return (
//     <div className="profile-container">
//       {currentRole === 'clinic' ? (
//         <>
//           <h1>Dental Service</h1>
//           <p>123 Dental Street, Smile City</p>
//           <p>Phone: (555) 123-4567</p>
//         </>
//       ) : (
//         <>
//           <h1>Nurse Maha Siva</h1>
//           <p>Dental Hygienist</p>
//           <p>5 years experience</p>
//         </>
//       )}
//     </div>
//   );
// }

// export default ProfilePage;
import React from 'react';
import './App.css';

function ProfilePage({ currentRole }) {
  return (
    <div className="profile-container">
      {currentRole === 'clinic' ? (
        <>
          <div className="profile-header">
            <div className="clinic-avatar">SS</div>
            <div className="profile-info">
              <h1>Sunny Smiles Dental Clinic</h1>
              <p>700 Lamar St, Austin TX, 70193</p>
              <p>Phone: (555) 123-4567 | Email: hello@sunnysmiles.com</p>
            </div>
          </div>
          
          <div className="profile-section">
            <h2>About Us</h2>
            <p>Sunny Smiles has been providing exceptional dental care since 2010. We specialize in family dentistry, cosmetic procedures, and pediatric dental care with a gentle touch.</p>
          </div>
          
          <div className="profile-section">
            <h2>Services</h2>
            <ul>
              <li>General Dentistry</li>
              <li>Teeth Whitening</li>
              <li>Orthodontics</li>
              <li>Pediatric Dentistry</li>
              <li>Emergency Care</li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="profile-header">
            <div className="nurse-avatar">MS</div>
            <div className="profile-info">
              <h1>Maha Siva, RDA</h1>
              <p>Registered Dental Assistant</p>
              <p>Phone: (555) 987-6543 | Email: nurse_maha@gmail.com</p>
            </div>
          </div>
          
          <div className="profile-section">
            <h2>Qualifications</h2>
            <p><strong>Education:</strong> Associate Degree in Dental Assisting</p>
            <p><strong>Experience:</strong> 3 years clinical experience</p>
            <p><strong>Specializations:</strong> Pediatric Dentistry, Orthodontic Assistance</p>
          </div>
          
          <div className="profile-section">
            <h2>Certifications</h2>
            <div>
              <span className="badge">CPR Certified</span>
              <span className="badge">RDA License</span>
              <span className="badge">X-Ray Certified</span>
              <span className="badge">Infection Control</span>
            </div>
            <p style={{marginTop: '15px'}}><strong>License #:</strong> RDA123456</p>
            <p><strong>Background Check:</strong> Completed and cleared</p>
          </div>
          
          <div className="profile-section">
            <h2>Availability</h2>
            <p>Monday-Friday: 8AM-5PM</p>
            <p>Weekends: On-call for emergencies</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;