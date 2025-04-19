// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navigation.css';

// function Navigation() {
//   return (
//     <nav className="main-nav">
//       <Link to="/" className="nav-link">Calendar</Link>
//       <Link to="/profile" className="nav-link">Profile</Link>
//       <Link to="/chat" className="nav-link">Chat</Link>
//       <Link to="/billing" className="nav-link">Billing</Link>
//     </nav>
//   );
// }

// export default Navigation;
// import React from 'react';
// import './Navigation.css';

// function Navigation({ currentRole, onRoleToggle }) {
//   return (
//     <div className="navigation">
//       <div className="nav-links">
//         <a href="/">Calendar</a>
//         <a href="/profile">Profile</a>
//         <a href="/chat">Chat</a>
//       </div>
//       <button className="role-toggle" onClick={onRoleToggle}>
//         Switch to {currentRole === 'clinic' ? 'Nurse' : 'Clinic'} View
//       </button>
//     </div>
//   );
// }

// export default Navigation;

import React from 'react';
import './Navigation.css';

function Navigation({ currentRole, onRoleToggle }) {
  return (
    <div className="navigation">
      <div className="nav-links">
        <a href="/">Calendar</a>
        <a href="/profile">Profile</a>
        <a href="/chat">Chat</a>
      </div>
      <button className="role-toggle" onClick={onRoleToggle}>
        {currentRole === 'clinic' ? 'Switch to Nurse View' : 'Switch to Clinic View'}
      </button>
    </div>
  );
}

export default Navigation;