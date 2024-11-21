import React, { useState } from 'react';

function CreateStudent() {
  const [studentID, setStudentID] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressArea, setAddressArea] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateStudent = async () => {
    console.log(studentID, email, name, dob, addressCity, addressArea, phoneNumber)
    const response = await fetch('http://localhost:5000/create-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentID, email, name, dob, addressCity, addressArea, phoneNumber })
    });
    const data = await response.json();
    setMessage(data.message || 'Student created successfully, credential record added automatically if conditions met.');
  };

  return (
    <div className="form-container">
      <h2>Create Student</h2>
      <label>Student ID</label>
      <input type="text" value={studentID} onChange={(e) => setStudentID(e.target.value)} placeholder="Enter unique student ID" />
      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter student's email" />
      <label>Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter student's full name" />
      <label>Date of Birth</label>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      <label>City</label>
      <input type="text" value={addressCity} onChange={(e) => setAddressCity(e.target.value)} placeholder="Enter city" />
      <label>Area</label>
      <input type="text" value={addressArea} onChange={(e) => setAddressArea(e.target.value)} placeholder="Enter area" />
      <label>Phone Number</label>
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter phone number" />
      <button onClick={handleCreateStudent}>Create Student</button>
      <p>{message}</p>
    </div>
  );
}

export default CreateStudent;
