// import React from 'react';
// import './App.css';

// function App() {
//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const times = [];
  
//   for (let i = 8; i <= 22; i++) {
//     times.push(`${i}:00`);
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* Top Line */}
//         <div className="topLine"></div>

//         {/* Date Range */}
//         <div className="topDate">
//           <p>3/24/2025 - 3/28/2025</p>
//         </div>

//         {/* Calendar Layout */}
//         <div className="calendar">
//           {/* Days Header */}
//           <div className="calendar-header">
//             {days.map((day) => (
//               <div className="day-header" key={day}>
//                 {day}
//               </div>
//             ))}
//           </div>

//           {/* Time Slots */}
//           <div className="calendar-body">
//             {times.map((time) => (
//               <div className="time-slot" key={time}>
//                 <div className="time">{time}</div>
//                 {days.map((_, index) => (
//                   <div className="day-column" key={index}></div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import './App.css';

// function App() {

//   const [showForm, setShowForm] = useState(false);
//   const [shifts, setShifts] = useState([]);
//   const [formData, setFormData] = useState({
//     requesterType: 'professional',
//     day: 'MON',
//     startTime: '9.0A',
//     endTime: '11.0A',
//     profession: '',
//     details: ''
//   });

//   const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
//   const timeSlots = [
//     '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
//     '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', 
//     '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newShift = {
//       ...formData,
//       id: Date.now()
//     };
//     setShifts([...shifts, newShift]);
//     setShowForm(false);
//     // Reset form
//     setFormData({
//       requesterType: 'professional',
//       day: 'MON',
//       startTime: '9.0A',
//       endTime: '11.0A',
//       profession: '',
//       details: ''
//     });
//   };

//   const isTimeInShift = (day, time, shift) => {
//     if (shift.day !== day) return false;
    
//     const timeIndex = timeSlots.indexOf(time);
//     const startIndex = timeSlots.indexOf(shift.startTime);
//     const endIndex = timeSlots.indexOf(shift.endTime);
    
//     return timeIndex >= startIndex && timeIndex <= endIndex;
//   };

//   const getCellContent = (day, time) => {
//     const shift = shifts.find(s => isTimeInShift(day, time, s));
//     if (!shift) return null;
    
//     // Only show text on the first time slot of the shift
//     if (time === shift.startTime) {
//       return (
//         <div className={`shift-block ${shift.requesterType}`}>
//           {shift.profession} ({shift.details})
//         </div>
//       );
//     }
//     return <div className={`shift-block ${shift.requesterType}`}></div>;
//   };

//   return (
//     <div className="app-container">
//       <div className="calendar-container">
//         {/* Date Range */}
//         <div className="date-range">
//           {new Date().toLocaleDateString()} - {new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}
//         </div>

//         {/* Calendar Header */}
//         <div className="calendar-header">
//           <div className="time-label">Time</div>
//           {days.map(day => (
//             <div key={day} className="day-header">{day}</div>
//           ))}
//         </div>

//         {/* Calendar Body */}
//         <div className="calendar-body">
//           {timeSlots.map(time => (
//             <div key={time} className="time-row">
//               <div className="time-slot">{time}</div>
//               {days.map(day => (
//                 <div key={`${day}-${time}`} className="day-cell">
//                   {getCellContent(day, time)}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="action-panel">
//         <button 
//           className="request-button"
//           onClick={() => setShowForm(true)}
//         >
//           REQUEST SHIFT
//         </button>

//         {showForm && (
//           <form className="shift-form" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Requester Type:</label>
//               <select 
//                 name="requesterType" 
//                 value={formData.requesterType}
//                 onChange={handleInputChange}
//               >
//                 <option value="professional">Professional</option>
//                 <option value="clinic">Clinic</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Day:</label>
//               <select 
//                 name="day" 
//                 value={formData.day}
//                 onChange={handleInputChange}
//               >
//                 {days.map(day => (
//                   <option key={day} value={day}>{day}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Start Time:</label>
//               <select 
//                 name="startTime" 
//                 value={formData.startTime}
//                 onChange={handleInputChange}
//               >
//                 {timeSlots.map(time => (
//                   <option key={`start-${time}`} value={time}>{time}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>End Time:</label>
//               <select 
//                 name="endTime" 
//                 value={formData.endTime}
//                 onChange={handleInputChange}
//               >
//                 {timeSlots.map(time => (
//                   <option key={`end-${time}`} value={time}>{time}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Profession:</label>
//               <input
//                 type="text"
//                 name="profession"
//                 value={formData.profession}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Details:</label>
//               <input
//                 type="text"
//                 name="details"
//                 value={formData.details}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <button type="submit" className="submit-button">
//               SUBMIT SHIFT
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;



//SECOND PART WHICH CURR WORKS:

// 

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navigation from './Navigation';
// import CalendarPage from './CalendarPage';
// import ChatPage from './ChatPage';
// import ProfilePage from './ProfilePage';
// import './App.css';

// function App() {
//   const [currentRole, setCurrentRole] = useState('clinic'); // 'clinic' or 'nurse'

//   const toggleRole = () => {
//     setCurrentRole(currentRole === 'clinic' ? 'nurse' : 'clinic');
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Navigation currentRole={currentRole} onRoleToggle={toggleRole} />
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<CalendarPage currentRole={currentRole} />} />
//             <Route path="/profile" element={<ProfilePage currentRole={currentRole} />} />
//             <Route path="/chat" element={<ChatPage currentRole={currentRole} />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;





 // ACTUALLLL
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
// import Navigation from './Navigation';
// import CalendarPage from './CalendarPage';
// import ChatPage from './ChatPage';
// import ProfilePage from './ProfilePage';
// import './App.css';
// import { Amplify } from 'aws-amplify';
// import awsconfig from './aws-exports'; 

// Amplify.configure(awsconfig);

// function App() {
//   const [currentRole, setCurrentRole] = useState('clinic');

//   const toggleRole = () => {
//     setCurrentRole(currentRole === 'clinic' ? 'nurse' : 'clinic');
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Navigation currentRole={currentRole} onRoleToggle={toggleRole} />
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<CalendarPage currentRole={currentRole} />} />
//             <Route path="/chat" element={<ChatPage currentRole={currentRole} />} />
//             <Route path="/profile" element={<ProfilePage currentRole={currentRole} />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import CalendarPage from './CalendarPage';
import ChatPage from './ChatPage';
import ProfilePage from './ProfilePage';
import './App.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports'; 
import { DataStore } from '@aws-amplify/datastore';

Amplify.configure(awsconfig);

function App() {
  const [currentRole, setCurrentRole] = useState('clinic');

  const toggleRole = () => {
    setCurrentRole(currentRole === 'clinic' ? 'nurse' : 'clinic');
  };

  return (
    <Router>
      <div className="app">
        <Navigation currentRole={currentRole} onRoleToggle={toggleRole} />
        <div className="content">
          <Routes>
            <Route path="/" element={<CalendarPage currentRole={currentRole} />} />
            <Route path="/chat" element={<ChatPage currentRole={currentRole} />} />
            <Route path="/profile" element={<ProfilePage currentRole={currentRole} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;