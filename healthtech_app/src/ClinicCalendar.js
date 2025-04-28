import React, { useState } from 'react';
import './App.css';

const ClinicCalendar = () => {
  const [postedShifts, setPostedShifts] = useState([
    {
      id: 1,
      day: "MON",
      startTime: "11:00 AM",
      endTime: "2:00 PM",
      role: "Registered Nurse",
      accepted: true,
      nurse: {
        name: "Sarah Johnson",
        experience: "5 years",
        specialties: ["Emergency Care", "Pediatrics"]
      }
    },
    {
      id: 2,
      day: "WED",
      startTime: "8:00 AM",
      endTime: "4:00 PM",
      role: "Pediatric Nurse",
      accepted: false
    }
  ]);

  const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI'];
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const getCellContent = (day, time) => {
    const shift = postedShifts.find(s => 
      s.day === day && 
      time >= s.startTime && 
      time <= s.endTime
    );
    
    if (!shift) return null;

    if (time === shift.startTime) {
      return (
        <div className={`shift-block ${shift.accepted ? 'accepted' : 'pending'}`}>
          <div className="shift-header">
            {shift.accepted ? "Accepted by Nurse" : "Pending Acceptance"}
          </div>
          <div className="shift-role">{shift.role}</div>
          {shift.accepted && (
            <div className="shift-nurse">{shift.nurse.name}</div>
          )}
        </div>
      );
    }
    return <div className={`shift-block ${shift.accepted ? 'accepted' : 'pending'}`}></div>;
  };

  return (
    <div className="calendar-container">
      <h2>Clinic's Calendar</h2>
      <div className="date-range">
        {new Date().toLocaleDateString()} - {new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString()}
      </div>

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
  );
};

export default ClinicCalendar;