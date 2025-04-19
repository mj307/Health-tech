import React, { useState } from 'react';
import './App.css';

const NurseCalendar = () => {
  // Sample shifts from different clinics
  const [availableShifts, setAvailableShifts] = useState([
    {
      id: 1,
      clinic: "City Health Clinic",
      day: "MON",
      startTime: "9:00 AM",
      endTime: "5:00 PM",
      role: "Registered Nurse",
      address: "123 Main St, Cityville",
      accepted: false
    },
    {
      id: 2,
      clinic: "Downtown Medical",
      day: "WED",
      startTime: "8:00 AM",
      endTime: "4:00 PM",
      role: "Pediatric Nurse",
      address: "456 Center Ave, Townsville",
      accepted: true // Already accepted
    }
  ]);

  const handleAcceptShift = (shiftId) => {
    setAvailableShifts(prevShifts => 
      prevShifts.map(shift => 
        shift.id === shiftId ? { ...shift, accepted: true } : shift
      )
    );
  };

  const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI'];
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const getCellContent = (day, time) => {
    const shift = availableShifts.find(s => 
      s.day === day && 
      time >= s.startTime && 
      time <= s.endTime
    );
    
    if (!shift) return null;

    if (time === shift.startTime) {
      return (
        <div 
          className={`shift-block ${shift.accepted ? 'accepted' : 'available'}`}
          onClick={() => !shift.accepted && handleAcceptShift(shift.id)}
        >
          <div className="shift-header">
            {shift.accepted ? "Shift Accepted" : "Available Shift"}
          </div>
          <div className="shift-role">{shift.role}</div>
          {shift.accepted && (
            <div className="shift-clinic">{shift.clinic}</div>
          )}
        </div>
      );
    }
    return <div className={`shift-block ${shift.accepted ? 'accepted' : 'available'}`}></div>;
  };

  return (
    <div className="calendar-container">
      <h2>Nurse's Calendar</h2>
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

export default NurseCalendar;