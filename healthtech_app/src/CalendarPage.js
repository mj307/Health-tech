import React, { useState } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [shifts, setShifts] = useState([]);
  const [formData, setFormData] = useState({
    day: 'MON',
    startTime: '9:00 AM',
    endTime: '11:00 AM',
    profession: '',
    details: ''
  });

  const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', 
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newShift = {
      ...formData,
      id: Date.now(),
      requesterType: 'clinic' // Only clinics can post shifts
    };
    setShifts([...shifts, newShift]);
    setShowForm(false);
    // Reset form
    setFormData({
      day: 'MON',
      startTime: '9:00 AM',
      endTime: '11:00 AM',
      profession: '',
      details: ''
    });
  };

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
    
    // Only show text on the first time slot of the shift
    if (time === shift.startTime) {
      return (
        <div className="shift-block clinic">
          {shift.profession} ({shift.details})
        </div>
      );
    }
    return <div className="shift-block clinic"></div>;
  };

  return (
    <div className="app-container">
      <div className="calendar-container">
        {/* Date Range */}
        <div className="date-range">
          {new Date().toLocaleDateString()} - {new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}
        </div>

        {/* Calendar Header */}
        <div className="calendar-header">
          <div className="time-label">Time</div>
          {days.map(day => (
            <div key={day} className="day-header">{day}</div>
          ))}
        </div>

        {/* Calendar Body */}
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

      <div className="action-panel">
        <button 
          className="request-button"
          onClick={() => setShowForm(true)}
        >
          REQUEST SHIFT
        </button>

        {showForm && (
          <form className="shift-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Day:</label>
              <select 
                name="day" 
                value={formData.day}
                onChange={handleInputChange}
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Start Time:</label>
              <select 
                name="startTime" 
                value={formData.startTime}
                onChange={handleInputChange}
              >
                {timeSlots.map(time => (
                  <option key={`start-${time}`} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>End Time:</label>
              <select 
                name="endTime" 
                value={formData.endTime}
                onChange={handleInputChange}
              >
                {timeSlots.map(time => (
                  <option key={`end-${time}`} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Profession:</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Details:</label>
              <input
                type="text"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="submit-button">
              SUBMIT SHIFT
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;