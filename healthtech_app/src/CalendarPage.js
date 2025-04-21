// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [showForm, setShowForm] = useState(false);
//   const [shifts, setShifts] = useState([]);
//   const [formData, setFormData] = useState({
//     day: 'MON',
//     startTime: '9:00 AM',
//     endTime: '11:00 AM',
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
//       id: Date.now(),
//       requesterType: 'clinic' // Only clinics can post shifts
//     };
//     setShifts([...shifts, newShift]);
//     setShowForm(false);
//     // Reset form
//     setFormData({
//       day: 'MON',
//       startTime: '9:00 AM',
//       endTime: '11:00 AM',
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
//         <div className="shift-block clinic">
//           {shift.profession} ({shift.details})
//         </div>
//       );
//     }
//     return <div className="shift-block clinic"></div>;
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


// WORKING RN

// import React, { useState } from 'react';
// import './App.css';

// function CalendarPage({ currentRole }) {
//   // Shared state for shifts (in a real app, this would be in a global state)
//   const [shifts, setShifts] = useState([
//     {
//       id: 1,
//       clinic: "Dental Service",
//       day: "MON",
//       startTime: "9:00 AM",
//       endTime: "5:00 PM",
//       role: "Dental Hygienist",
//       details: "Teeth cleaning and checkups",
//       accepted: false
//     }
//   ]);

//   const handleAddShift = (newShift) => {
//     setShifts([...shifts, {
//       ...newShift,
//       id: Date.now(),
//       clinic: "Dental Service",
//       accepted: false
//     }]);
//   };

//   const handleAcceptShift = (shiftId) => {
//     setShifts(shifts.map(shift => 
//       shift.id === shiftId ? { ...shift, accepted: true } : shift
//     ));
//   };

//   const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI'];
//   const timeSlots = [
//     '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
//     '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
//   ];

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

//     if (time === shift.startTime) {
//       return (
//         <div className={`shift-block ${shift.accepted ? 'accepted' : 'available'}`}>
//           <div className="shift-header">
//             {shift.accepted ? "Shift Taken" : "Available Shift"}
//           </div>
//           <div className="shift-role">{shift.role}</div>
//           {currentRole === 'nurse' && !shift.accepted && (
//             <div className="shift-actions">
//               <button className="accept-btn" onClick={() => handleAcceptShift(shift.id)}>✓</button>
//               <button className="decline-btn">✗</button>
//             </div>
//           )}
//           {shift.accepted && currentRole === 'clinic' && (
//             <div className="shift-nurse">Accepted by: Nurse Maha Siva</div>
//           )}
//         </div>
//       );
//     }
//     return <div className={`shift-block ${shift.accepted ? 'accepted' : 'available'}`}></div>;
//   };

//   return (
//     <div className="calendar-container">
//       <h2>{currentRole === 'clinic' ? 'Dental Service' : 'Nurse Maha Siva'}'s Calendar</h2>
      
//       {currentRole === 'clinic' && (
//         <ShiftForm onSubmit={handleAddShift} />
//       )}

//       <div className="calendar-header">
//         <div className="time-label">Time</div>
//         {days.map(day => (
//           <div key={day} className="day-header">{day}</div>
//         ))}
//       </div>

//       <div className="calendar-body">
//         {timeSlots.map(time => (
//           <div key={time} className="time-row">
//             <div className="time-slot">{time}</div>
//             {days.map(day => (
//               <div key={`${day}-${time}`} className="day-cell">
//                 {getCellContent(day, time)}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const ShiftForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     day: 'MON',
//     startTime: '9:00 AM',
//     endTime: '5:00 PM',
//     role: 'Dental Hygienist',
//     details: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setFormData({
//       ...formData,
//       details: '' // Clear details but keep other fields
//     });
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <form className="shift-form" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Day:</label>
//         <select name="day" value={formData.day} onChange={handleChange}>
//           <option value="MON">Monday</option>
//           <option value="TUES">Tuesday</option>
//           <option value="WED">Wednesday</option>
//           <option value="THURS">Thursday</option>
//           <option value="FRI">Friday</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label>Start Time:</label>
//         <select name="startTime" value={formData.startTime} onChange={handleChange}>
//           <option value="8:00 AM">8:00 AM</option>
//           <option value="9:00 AM">9:00 AM</option>
//           <option value="10:00 AM">10:00 AM</option>
//           <option value="11:00 AM">11:00 AM</option>
//           <option value="12:00 PM">12:00 PM</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label>End Time:</label>
//         <select name="endTime" value={formData.endTime} onChange={handleChange}>
//           <option value="12:00 PM">12:00 PM</option>
//           <option value="1:00 PM">1:00 PM</option>
//           <option value="2:00 PM">2:00 PM</option>
//           <option value="3:00 PM">3:00 PM</option>
//           <option value="4:00 PM">4:00 PM</option>
//           <option value="5:00 PM">5:00 PM</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label>Role:</label>
//         <input
//           type="text"
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>Details:</label>
//         <textarea
//           name="details"
//           value={formData.details}
//           onChange={handleChange}
//           placeholder="Shift description..."
//         />
//       </div>

//       <button type="submit">Post Shift</button>
//     </form>
//   );
// };

// export default CalendarPage;


// import React, { useState } from 'react';
// import './App.css';

// function CalendarPage({ currentRole }) {
//   const [shifts, setShifts] = useState([
//     {
//       id: 1,
//       clinic: "Dental Service",
//       day: "MON",
//       startTime: "9:00 AM",
//       endTime: "5:00 PM",
//       role: "Dental Hygienist",
//       details: "Teeth cleaning and checkups",
//       accepted: false,
//       nurseName: ""
//     }
//   ]);

//   const handleAddShift = (newShift) => {
//     setShifts([...shifts, {
//       ...newShift,
//       id: Date.now(),
//       clinic: "Dental Service",
//       accepted: false,
//       nurseName: ""
//     }]);
//   };

//   const handleAcceptShift = (shiftId) => {
//     setShifts(shifts.map(shift =>
//       shift.id === shiftId ? { ...shift, accepted: true, nurseName: "Nurse Maha Siva" } : shift
//     ));
//   };

//   const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI'];
//   const timeSlots = [
//     '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
//     '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
//   ];

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

//     if (time === shift.startTime) {
//       return (
//         <div className={`shift-block ${shift.accepted ? 'accepted' : 'available'}`}>
//           <div className="shift-header">
//             {shift.accepted ? "Shift Taken" : "Available Shift"}
//           </div>
//           <div className="shift-role">{shift.role}</div>
//           {currentRole === 'nurse' && !shift.accepted && (
//             <div className="shift-actions">
//               <button 
//                 className="accept-btn" 
//                 onClick={() => handleAcceptShift(shift.id)}
//                 aria-label="Accept shift"
//               >
//                 ✓
//               </button>
//               <button 
//                 className="decline-btn"
//                 aria-label="Decline shift"
//               >
//                 ✗
//               </button>
//             </div>
//           )}
//           {shift.accepted && currentRole === 'clinic' && (
//             <div className="shift-nurse">Accepted by: {shift.nurseName}</div>
//           )}
//         </div>
//       );
//     }
//     return <div className={`shift-block ${shift.accepted ? 'accepted' : 'available'}`}></div>;
//   };

//   return (
//     <div className="app-container">
//       <div className="calendar-container">
//         <h2>{currentRole === 'clinic' ? 'Dental Service' : 'Nurse Maha Siva'}'s Calendar</h2>
        
//         <div className="date-range">
//           Current Week: {new Date().toLocaleDateString()} - {new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}
//         </div>

//         <div className="calendar-header">
//           <div className="time-label">Time</div>
//           {days.map(day => (
//             <div key={day} className="day-header">{day}</div>
//           ))}
//         </div>

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

//       {currentRole === 'clinic' && (
//         <div className="action-panel">
//           <h3>Post New Shift</h3>
//           <ShiftForm onSubmit={handleAddShift} />
//         </div>
//       )}
//     </div>
//   );
// }

// const ShiftForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     day: 'MON',
//     startTime: '9:00 AM',
//     endTime: '5:00 PM',
//     role: 'Dental Hygienist',
//     details: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setFormData({
//       ...formData,
//       details: ''
//     });
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <form className="shift-form" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Day:</label>
//         <select name="day" value={formData.day} onChange={handleChange}>
//           <option value="MON">Monday</option>
//           <option value="TUES">Tuesday</option>
//           <option value="WED">Wednesday</option>
//           <option value="THURS">Thursday</option>
//           <option value="FRI">Friday</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label>Start Time:</label>
//         <select name="startTime" value={formData.startTime} onChange={handleChange}>
//           <option value="8:00 AM">8:00 AM</option>
//           <option value="9:00 AM">9:00 AM</option>
//           <option value="10:00 AM">10:00 AM</option>
//           <option value="11:00 AM">11:00 AM</option>
//           <option value="12:00 PM">12:00 PM</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label>End Time:</label>
//         <select name="endTime" value={formData.endTime} onChange={handleChange}>
//           <option value="12:00 PM">12:00 PM</option>
//           <option value="1:00 PM">1:00 PM</option>
//           <option value="2:00 PM">2:00 PM</option>
//           <option value="3:00 PM">3:00 PM</option>
//           <option value="4:00 PM">4:00 PM</option>
//           <option value="5:00 PM">5:00 PM</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label>Role:</label>
//         <input
//           type="text"
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>Details:</label>
//         <textarea
//           name="details"
//           value={formData.details}
//           onChange={handleChange}
//           placeholder="Shift description..."
//         />
//       </div>

//       <button type="submit" className="submit-button">Post Shift</button>
//     </form>
//   );
// };

// export default CalendarPage;


import React, { useState } from 'react';
import './App.css';

function CalendarPage({ currentRole }) {
  const [shifts, setShifts] = useState([
    {
      // id: 1,
      // clinic: "Dental Service",
      // day: "MON",
      // startTime: "9:00 AM",
      // endTime: "5:00 PM",
      // role: "Dental Hygienist",
      // details: "Teeth cleaning and checkups",
      // accepted: false
    }
  ]);

  const handleAddShift = (newShift) => {
    setShifts([...shifts, {
      ...newShift,
      id: Date.now(),
      clinic: "Dental Service",
      accepted: false
    }]);
  };

  const handleAcceptShift = (shiftId) => {
    setShifts(shifts.map(shift =>
      shift.id === shiftId ? { ...shift, accepted: true } : shift
    ));
  };

  const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI'];
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const isTimeInShift = (day, time, shift) => {
    if (shift.day !== day) return false;
    const timeIndex = timeSlots.indexOf(time);
    const startIndex = timeSlots.indexOf(shift.startTime);
    const endIndex = timeSlots.indexOf(shift.endTime);
    return timeIndex >= startIndex && timeIndex <= endIndex;
  };

  const getCellContent = (day, time) => {
    const shift = shifts.find(s => isTimeInShift(day, time, s));
    if (!shift) return null;

    if (time === shift.startTime) {
      return (
        <div className={`shift-block ${shift.accepted ? 'accepted' : 'available'}`}>
          <div className="shift-header">
            {shift.accepted ? "Shift Taken" : "Available Shift"}
          </div>
          <div className="shift-role">{shift.role}</div>
          {currentRole === 'nurse' && !shift.accepted && (
            <div className="shift-actions">
              <button className="accept-btn" onClick={() => handleAcceptShift(shift.id)}>✓</button>
              <button className="decline-btn">✗</button>
            </div>
          )}
          {shift.accepted && currentRole === 'clinic' && (
            <div className="shift-nurse">Accepted by: Nurse Maha Siva</div>
          )}
        </div>
      );
    }
    return <div className={`shift-block ${shift.accepted ? 'accepted' : 'available'}`}></div>;
  };

  return (
    <div className="calendar-page">
      <div className="calendar-container">
        <h2>{currentRole === 'clinic' ? 'Dental Service' : 'Nurse Maha Siva'}'s Calendar</h2>

        <div className="calendar-header">
          <div className="time-label">Time</div>
          {days.map(day => (
            <div key={day} className="day-header">{day}</div>
          ))}
        </div>

        <div className="calendar-body">
          {timeSlots.map(time => (
            <div key={time} className="time-row">
              <div className="time-slot">{time}</div>
              {days.map(day => (
                <div key={`${day}-${time}`} className="day-cell">
                  {getCellContent(day, time)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {currentRole === 'clinic' && (
        <div className="form-sidebar">
          <ShiftForm onSubmit={handleAddShift} />
        </div>
      )}
    </div>
  );
}

const ShiftForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    day: 'MON',
    startTime: '9:00 AM',
    endTime: '5:00 PM',
    role: 'Dental Hygienist',
    details: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      ...formData,
      details: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="shift-form" onSubmit={handleSubmit}>
      <h3>Post a New Shift</h3>
      <div className="form-group">
        <label>Day:</label>
        <select name="day" value={formData.day} onChange={handleChange}>
          <option value="MON">Monday</option>
          <option value="TUES">Tuesday</option>
          <option value="WED">Wednesday</option>
          <option value="THURS">Thursday</option>
          <option value="FRI">Friday</option>
        </select>
      </div>

      <div className="form-group">
        <label>Start Time:</label>
        <select name="startTime" value={formData.startTime} onChange={handleChange}>
          <option value="8:00 AM">8:00 AM</option>
          <option value="9:00 AM">9:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="12:00 PM">12:00 PM</option>
        </select>
      </div>

      <div className="form-group">
        <label>End Time:</label>
        <select name="endTime" value={formData.endTime} onChange={handleChange}>
          <option value="12:00 PM">12:00 PM</option>
          <option value="1:00 PM">1:00 PM</option>
          <option value="2:00 PM">2:00 PM</option>
          <option value="3:00 PM">3:00 PM</option>
          <option value="4:00 PM">4:00 PM</option>
          <option value="5:00 PM">5:00 PM</option>
        </select>
      </div>

      <div className="form-group">
        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Details:</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Shift description..."
        />
      </div>

      <button type="submit">Post Shift</button>
    </form>
  );
};

export default CalendarPage;
