
import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Shift } from './models';
import './App.css';

function CalendarPage({ currentRole }) {
  const [shifts, setShifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load shifts and set up real-time updates
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        console.log('Fetching shifts from DataStore...');
        const data = await DataStore.query(Shift);
    
        const processedData = data.map(shift => ({
          ...shift,
          startTime: formatTime(shift.startTime),
          endTime: formatTime(shift.endTime),
        }));
    
        console.log('Fetched shifts:', processedData);
        setShifts(processedData);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const formatTime = (timeString) => {
      if (!timeString) return '';
      const [hourStr, minuteStr] = timeString.split(':');
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    };


    let subscription;
    const setup = async () => {
      await DataStore.start(); // Ensure DataStore is initialized
      await fetchShifts();
      subscription = DataStore.observe(Shift).subscribe(() => {
        console.log('Shift change detected, refreshing...');
        fetchShifts();
      });
    };

    setup();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const convertToAWSTimeFormat = (timeStr) => {
    // Example: "9:00 AM" -> "09:00:00"
    const [time, modifier] = timeStr.split(' ');
  
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = String(parseInt(hours, 10) + 12);
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
  
    if (hours.length === 1) hours = '0' + hours;
  
    return `${hours}:${minutes}:00`;
  };
  

  const handleAddShift = async (newShift) => {
    try {
      console.log('Attempting to save shift:', newShift);
  
      const shiftToSave = new Shift({
        day: newShift.day,
        startTime: convertToAWSTimeFormat(newShift.startTime),
        endTime: convertToAWSTimeFormat(newShift.endTime),
        role: newShift.role,
        details: newShift.details,
        clinicName: "Sunny Smile",
        status: "PENDING",
        nurseName: null
      });
  
      const savedShift = await DataStore.save(shiftToSave);
      console.log('Successfully saved shift:', savedShift);
  
    } catch (error) {
      console.error('Error saving shift:', error);
    }
  };
  

  const handleAcceptShift = async (shiftId) => {
    try {
      console.log('Attempting to accept shift:', shiftId);
      const shiftToUpdate = await DataStore.query(Shift, shiftId);
      
      if (shiftToUpdate) {
        const updatedShift = await DataStore.save(
          Shift.copyOf(shiftToUpdate, updated => {
            updated.status = "ACCEPTED";
            updated.nurseName = "Nurse Maha Siva";
          })
        );
        console.log('Successfully accepted shift:', updatedShift);
      }
    } catch (error) {
      console.error('Error accepting shift:', error);
    }
  };

  const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI'];
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const isTimeInShift = (day, time, shift) => {
    if (!shift || shift.day !== day) return false;
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
        <div className={`shift-block ${shift.status === 'ACCEPTED' ? 'accepted' : 'available'}`}>
          <div className="shift-header">
            {shift.status === 'ACCEPTED' ? "Shift Taken" : "Available Shift"}
          </div>
          <div className="shift-role">{shift.role}</div>
          {currentRole === 'nurse' && shift.status === 'PENDING' && (
            <div className="shift-actions">
              <button 
                className="accept-btn" 
                onClick={() => handleAcceptShift(shift.id)}
                aria-label="Accept shift"
              >
                ✓
              </button>
              <button className="decline-btn" aria-label="Decline shift">
                ✗
              </button>
            </div>
          )}
          {shift.status === 'ACCEPTED' && currentRole === 'clinic' && (
            <div className="shift-nurse">Accepted by: {shift.nurseName}</div>
          )}
        </div>
      );
    }
    return <div className={`shift-block ${shift.status === 'ACCEPTED' ? 'accepted' : 'available'}`}></div>;
  };

  if (isLoading) {
    return (
      <div className="calendar-page">
        <div className="calendar-container">
          <h2>Loading shifts...</h2>
        </div>
      </div>
    );
  }

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
    if (!formData.role.trim()) {
      alert('Please enter a role');
      return;
    }
    onSubmit(formData);
    setFormData({
      day: 'MON',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      role: 'Dental Hygienist',
      details: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className="shift-form" onSubmit={handleSubmit}>
      <h3>Post a New Shift</h3>
      <div className="form-group">
        <label htmlFor="day">Day:</label>
        <select 
          id="day"
          name="day" 
          value={formData.day} 
          onChange={handleChange}
        >
          <option value="MON">Monday</option>
          <option value="TUES">Tuesday</option>
          <option value="WED">Wednesday</option>
          <option value="THURS">Thursday</option>
          <option value="FRI">Friday</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="startTime">Start Time:</label>
        <select 
          id="startTime"
          name="startTime" 
          value={formData.startTime} 
          onChange={handleChange}
        >
          <option value="8:00 AM">8:00 AM</option>
          <option value="9:00 AM">9:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="12:00 PM">12:00 PM</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="endTime">End Time:</label>
        <select 
          id="endTime"
          name="endTime" 
          value={formData.endTime} 
          onChange={handleChange}
        >
          <option value="12:00 PM">12:00 PM</option>
          <option value="1:00 PM">1:00 PM</option>
          <option value="2:00 PM">2:00 PM</option>
          <option value="3:00 PM">3:00 PM</option>
          <option value="4:00 PM">4:00 PM</option>
          <option value="5:00 PM">5:00 PM</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <input
          id="role"
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          placeholder="Enter role title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="details">Details:</label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Shift description (optional)"
          rows={3}
        />
      </div>

      <button type="submit" className="post-btn">
        Post Shift
      </button>
    </form>
  );
};

export default CalendarPage;
