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

import React from 'react';
import './App.css';

function ProfilePage({ currentRole }) {
  return (
    <div className="profile-container">
      {currentRole === 'clinic' ? (
        <>
          <h1>Dental Service</h1>
          <p>123 Dental Street, Smile City</p>
          <p>Phone: (555) 123-4567</p>
        </>
      ) : (
        <>
          <h1>Nurse Maha Siva</h1>
          <p>Dental Hygienist</p>
          <p>5 years experience</p>
        </>
      )}
    </div>
  );
}

export default ProfilePage;