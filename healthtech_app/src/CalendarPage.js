import React, { useState } from 'react';
import './App.css';

function CalendarPage({ currentRole }) {
  const [shifts, setShifts] = useState([
    {
    }
  ]);

  const handleAddShift = (newShift) => {
    setShifts([...shifts, {
      ...newShift,
      id: Date.now(),
      clinic: "Sunny Smile",
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
        <h2>{currentRole === 'clinic' ? 'Sunny Smile' : 'Nurse Maha Siva'}'s Calendar</h2>

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
