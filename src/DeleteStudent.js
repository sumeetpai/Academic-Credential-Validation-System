import React, { useState } from 'react';

function DeleteStudent() {
  const [studentID, setStudentID] = useState('');
//   const [institutionID] = useState('');
  const [message, setMessage] = useState('');

  const handleDeleteStudent = async () => {
    const response = await fetch('http://localhost:5000/delete-student', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentID}),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="form-container">
      <h2>Delete Student</h2>
      <label>Student ID</label>
      <input
        type="text"
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
        placeholder="Enter student ID"
      />
      {/* <label>Institution ID</label>
      <input
        type="text"
        value={institutionID}
        onChange={(e) => setInstitutionID(e.target.value)}
        placeholder="Enter institution ID"
      /> */}
      <button onClick={handleDeleteStudent}>Delete Student</button>
      <p>{message}</p>
    </div>
  );
}

export default DeleteStudent;
