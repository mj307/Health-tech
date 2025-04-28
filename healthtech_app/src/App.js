import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation   from './Navigation';
import CalendarPage from './CalendarPage';
import ChatPage     from './ChatPage';
import ProfilePage  from './ProfilePage';
import './App.css';

function App() {
  const [currentRole, setCurrentRole] = useState('clinic'); // 'clinic' or 'nurse'

  const toggleRole = () => {
    setCurrentRole(r => (r === 'clinic' ? 'nurse' : 'clinic'));
  };

  return (
    <Router>
      <div className="app">
        <Navigation 
          currentRole={currentRole} 
          onRoleToggle={toggleRole} 
        />
        <div className="content">
          <Routes>
            <Route 
              path="/" 
              element={<CalendarPage currentRole={currentRole} />} 
            />
            <Route 
              path="/chat" 
              element={<ChatPage currentRole={currentRole} />} 
            />
            <Route 
              path="/profile" 
              element={<ProfilePage currentRole={currentRole} />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
