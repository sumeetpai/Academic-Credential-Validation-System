import React, { useState } from 'react';

function IssueCredential() {
  const [credentialID, setCredentialID] = useState('');
  const [studentID, setStudentID] = useState('');
  const [institutionID, setInstitutionID] = useState('');
  const [major, setMajor] = useState('');
  const [gpa, setGpa] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [message, setMessage] = useState('');

  const handleIssueCredential = async () => {
    const response = await fetch('http://localhost:5000/issue-credential', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credentialID, major, gpa, issueDate, institutionID, studentID })
    });
    const data = await response.json();
    setMessage(data.message || 'Credential issued successfully');
    console.log(credentialID, major, gpa, issueDate, institutionID, studentID)
  };

  return (
    <div className="form-container">
      <h2>Issue Credential</h2>
      <label>Credential ID</label>
      <input type="text" value={credentialID} onChange={(e) => setCredentialID(e.target.value)} placeholder="Enter unique credential ID" />
      <label>Major</label>
      <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="Enter major" />
      <label>GPA</label>
      <input type="number" value={gpa} onChange={(e) => setGpa(e.target.value)} placeholder="Enter GPA" />
      <label>Issue Date</label>
      <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
      <label>Institution ID</label>
      <input type="text" value={institutionID} onChange={(e) => setInstitutionID(e.target.value)} placeholder="Enter institution ID" />
      <label>Student Id</label>
      <input type="text" value={studentID} onChange={(e) => setStudentID(e.target.value)} placeholder="Enter Student ID" />
      
      <button onClick={handleIssueCredential}>Issue Credential</button>
      <p>{message}</p>
    </div>
    
  );
}

export default IssueCredential;
