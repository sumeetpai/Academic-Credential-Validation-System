// UpdateStudent.js
import React, { useState } from 'react';

function UpdateStudent() {
  const [studentID, setStudentID] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressArea, setAddressArea] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateStudent = async () => {
    try {
      const response = await fetch('http://localhost:5000/update-student', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentID, email, name, dob, addressCity, addressArea, phoneNumber }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error updating student.');
    }
  };

  return (
    <div className="form-container">
      <h2>Update Student</h2>
      <label>Student ID</label>
      <input
        type="text"
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
        placeholder="Enter unique student ID"
        required
      />
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter student's email"
      />
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter student's full name"
      />
      <label>Date of Birth</label>
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <label>City</label>
      <input
        type="text"
        value={addressCity}
        onChange={(e) => setAddressCity(e.target.value)}
        placeholder="Enter city"
      />
      <label>Area</label>
      <input
        type="text"
        value={addressArea}
        onChange={(e) => setAddressArea(e.target.value)}
        placeholder="Enter area"
      />
      <label>Phone Number</label>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={handleUpdateStudent}>Update Student</button>
      <p>{message}</p>
    </div>
  );
}

export default UpdateStudent;
