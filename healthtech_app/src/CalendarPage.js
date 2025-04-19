// src/CalendarPage.js
import React, { useState, useEffect } from 'react';
import api from './apiClient';
import axios from "axios";
import './App.css';
const baseURL = process.env.REACT_APP_API_URL;

function CalendarPage() {
  const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
  const timeSlots = [
    '9:00 AM','10:00 AM','11:00 AM','12:00 PM',
    '1:00 PM','2:00 PM','3:00 PM','4:00 PM',
    '5:00 PM','6:00 PM','7:00 PM','8:00 PM'
  ];

  // --- state hooks ---
  const [shifts, setShifts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    requesterType: 'professional',
    day: 'MON',
    startTime: '9:00 AM',
    endTime: '11:00 AM',
    profession: '',
    details: ''
  });

  // --- load existing shifts from backend ---
  useEffect(() => {
    async function fetchShifts() {
      try {
        const res = await axios.get('/api/calendar');
        // assuming your backend returns an array of shifts
        setShifts(res.data);
      } catch (err) {
        console.error('Failed to load shifts', err);
      }
    }
    fetchShifts();
  }, []);

  // --- form field handler ---
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- submit new shift ---
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/api/calendar/createAppointments`, formData);
      setShifts(prev => [...prev, res.data]);
      setShowForm(false);
      setFormData({
        requesterType: 'professional',
        day: 'MON',
        startTime: '9:00 AM',
        endTime: '11:00 AM',
        profession: '',
        details: ''
      });
    } catch (err) {
      console.error('Error creating shift', err.response || err);
      alert('Error creating shift');
    }
  };

  // --- helper to check if a shift covers this cell ---
  const isTimeInShift = (day, time, shift) => {
    if (shift.day !== day) return false;
    const ti = timeSlots.indexOf(time);
    const si = timeSlots.indexOf(shift.startTime);
    const ei = timeSlots.indexOf(shift.endTime);
    return ti >= si && ti <= ei;
  };

  // --- what to render in each cell ---
  const getCellContent = (day, time) => {
    const shift = shifts.find(s => isTimeInShift(day, time, s));
    if (!shift) return null;
    // only show text on first slot
    if (time === shift.startTime) {
      return (
        <div className={`shift-block ${shift.requesterType}`}>
          {shift.profession} ({shift.details})
        </div>
      );
    }
    return <div className={`shift-block ${shift.requesterType}`}></div>;
  };

  return (
    <div className="app-container">
      <div className="calendar-container">
        {/* Date Range Header (you can keep your dynamic dates here) */}
        <div className="date-range">
          {new Date().toLocaleDateString()} - {new Date(Date.now() + 6*24*60*60*1000).toLocaleDateString()}
        </div>

        {/* Calendar Header */}
        <div className="calendar-header">
          <div className="time-label">Time</div>
          {days.map(d => (
            <div key={d} className="day-header">{d}</div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="calendar-body">
          {timeSlots.map(time => (
            <div key={time} className="time-row">
              <div className="time-slot">{time}</div>
              {days.map(d => (
                <div key={`${d}-${time}`} className="day-cell">
                  {getCellContent(d, time)}
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
              <label>Requester Type:</label>
              <select
                name="requesterType"
                value={formData.requesterType}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              >
                {timeSlots.map(t => (
                  <option key={`s-${t}`} value={t}>{t}</option>
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
                {timeSlots.map(t => (
                  <option key={`e-${t}`} value={t}>{t}</option>
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
            <button
              type="button"
              className="submit-button"
              style={{ marginLeft: '8px', background: '#888' }}
              onClick={() => setShowForm(false)}
            >
              CANCEL
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
