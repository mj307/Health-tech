import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="main-nav">
      <Link to="/" className="nav-link">Calendar</Link>
      <Link to="/profile" className="nav-link">Profile</Link>
      <Link to="/chat" className="nav-link">Chat</Link>
      <Link to="/billing" className="nav-link">Billing</Link>
    </nav>
  );
}

export default Navigation;