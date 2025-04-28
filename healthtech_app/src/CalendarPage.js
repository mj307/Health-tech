// src/CalendarPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function CalendarPage({ currentRole }) {
  const days      = ['MON','TUES','WED','THURS','FRI','SAT'];
  const timeSlots = [
    '9:00 AM','10:00 AM','11:00 AM','12:00 PM',
    '1:00 PM','2:00 PM','3:00 PM','4:00 PM',
    '5:00 PM','6:00 PM','7:00 PM','8:00 PM'
  ];

  const [shifts,   setShifts]   = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    requesterType: 'professional',
    day:           'MON',
    startTime:     '9:00 AM',
    endTime:       '11:00 AM',
    profession:    '',
    details:       ''
  });

  // 1) Load existing shifts
  useEffect(() => {
    async function fetchShifts() {
      try {
        const res = await axios.get(
          `${baseURL}/api/calendar/Appointments`
        );
        setShifts(res.data);
      } catch (err) {
        console.error('Failed to load shifts', err);
      }
    }
    fetchShifts();
  }, []);

  // 2) Form change handler
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  // 3) Submit new shift
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseURL}/api/calendar/createAppointments/`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setShifts(prev => [...prev, res.data]);
      setShowForm(false);
      setFormData({
        requesterType: 'professional',
        day:           'MON',
        startTime:     '9:00 AM',
        endTime:       '11:00 AM',
        profession:    '',
        details:       ''
      });
    } catch (err) {
      console.error('Error creating shift', err);
      alert('Error creating shift');
    }
  };

  // 4) Helpers to render the grid
  const isInShift = (day, time, s) => {
    if (s.day !== day) return false;
    const i = timeSlots.indexOf(time);
    return (
      i >= timeSlots.indexOf(s.startTime) &&
      i <= timeSlots.indexOf(s.endTime)
    );
  };
  const renderCell = (day, time) => {
    const s = shifts.find(x => isInShift(day, time, x));
    if (!s) return null;
    if (time === s.startTime) {
      return (
        <div className={`shift-block ${s.requesterType}`}>
          {s.profession} ({s.details})
        </div>
      );
    }
    return <div className={`shift-block ${s.requesterType}`} />;
  };

  return (
    <div className="app-container">
      <div className="calendar-container">
        <div className="calendar-header">
          <div className="time-label">Time</div>
          {days.map(d => (
            <div key={d} className="day-header">{d}</div>
          ))}
        </div>
        <div className="calendar-body">
          {timeSlots.map(time => (
            <div key={time} className="time-row">
              <div className="time-slot">{time}</div>
              {days.map(d => (
                <div key={`${d}-${time}`} className="day-cell">
                  {renderCell(d, time)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Clinic only: show the form */}
      {currentRole === 'clinic' && (
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
                <label>Requester Type:</label>
                <select
                  name="requesterType"
                  value={formData.requesterType}
                  onChange={handleChange}
                >
                  <option value="professional">Professional</option>
                  <option value="clinic">Clinic</option>
                </select>
              </div>

              <div className="form-group">
                <label>Day:</label>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                >
                  {days.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Start Time:</label>
                <select
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                >
                  {timeSlots.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>End Time:</label>
                <select
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                >
                  {timeSlots.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Profession:</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Details:</label>
                <input
                  type="text"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="submit-button">
                SUBMIT SHIFT
              </button>
              <button
                type="button"
                className="submit-button"
                style={{ marginLeft: 8, background: '#888' }}
                onClick={() => setShowForm(false)}
              >
                CANCEL
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
