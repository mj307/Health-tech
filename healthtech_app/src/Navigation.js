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


// SECOND 

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
//         {currentRole === 'clinic' ? 'Switch to Nurse View' : 'Switch to Clinic View'}
//       </button>
//     </div>
//   );
// }

// export default Navigation;

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import './App.css';

// function Navigation({ currentRole, onRoleToggle }) {
//   return (
//     <header className="app-header">
//       <div className="header-content">
//         <div className="app-title">Dental Staffing</div>
//         <nav className="main-nav">
//           <NavLink to="/" className="nav-link" activeclassname="active">Calendar</NavLink>
//           <NavLink to="/chat" className="nav-link" activeclassname="active">Chat</NavLink>
//           <NavLink to="/profile" className="nav-link" activeclassname="active">Profile</NavLink>
//         </nav>
//         <button className="role-toggle" onClick={onRoleToggle}>
//           {currentRole === 'clinic' ? 'Nurse View' : 'Clinic View'}
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

function Navigation({ currentRole, onRoleToggle }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="app-title">
          <span className="logo">Swift</span><span className="logo-accent">Shift</span>
        </div>
        <nav className="main-nav">
          <NavLink to="/" className="nav-link" activeclassname="active">Calendar</NavLink>
          <NavLink to="/chat" className="nav-link" activeclassname="active">Chat</NavLink>
          <NavLink to="/profile" className="nav-link" activeclassname="active">Profile</NavLink>
        </nav>
        <button className="role-toggle" onClick={onRoleToggle}>
          {currentRole === 'clinic' ? 'Nurse View' : 'Clinic View'}
        </button>
      </div>
    </header>
  );
}

export default Navigation;