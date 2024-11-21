import React, { useState } from 'react';

function SearchStudent() {
  const [studentID, setStudentID] = useState('');
  const [credentialID, setCredentialID] = useState('');
  const [institutionID, setInstitutionID] = useState('');
  const [searchResult, setSearchResult] = useState('');

  // Search by Credential ID
  const handleSearchByCredentialID = async () => {
    try {
      const response = await fetch(`http://localhost:5000/search-by-credential-id/${credentialID}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setSearchResult(JSON.stringify(data, null, 2)); // Display result as formatted JSON
    } catch (error) {
      setSearchResult(`Error: ${error.message}`);
    }
  };

  // Search by Student ID and Institution ID
  const handleSearchByStudentAndInstitution = async () => {
    try {
      const response = await fetch(`http://localhost:5000/search-student-institution`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentID, institutionID }),
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setSearchResult(JSON.stringify(data, null, 2)); // Display result as formatted JSON
    } catch (error) {
      setSearchResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Search Student</h2>

      {/* Credential ID Search */}
      <label>Credential ID</label>
      <input
        type="text"
        value={credentialID}
        onChange={(e) => setCredentialID(e.target.value)}
        placeholder="Enter credential ID"
      />
      <button onClick={handleSearchByCredentialID}>Search by Credential ID</button>

      {/* Student ID and Institution ID Search */}
      <label>Student ID</label>
      <input
        type="text"
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
        placeholder="Enter student ID"
      />
      <label>Institution ID</label>
      <input
        type="text"
        value={institutionID}
        onChange={(e) => setInstitutionID(e.target.value)}
        placeholder="Enter institution ID"
      />
      <button onClick={handleSearchByStudentAndInstitution}>
        Search by Student ID & Institution ID
      </button>

      {/* Search Results */}
      <pre>{searchResult}</pre>
    </div>
  );
}

export default SearchStudent;
