// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import IssueCredential from './IssueCredential';
import VerifyCredential from './VerifyCredential';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';
import SearchStudent from './SearchStudent';
import DeleteStudent from './DeleteStudent';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Academic Credential Validation System</h1>
        <div className="tabs">
          <Link to="/issue" className="tab">Issue Credential</Link>
          <Link to="/verify" className="tab">Verify Credential</Link>
          <Link to="/create-student" className="tab">Create Student</Link>
          <Link to="/update-student" className="tab">Update Student</Link>
          <Link to="/search-student" className="tab">Search Student</Link>
          <Link to="/delete-student" className="tab">Delete Student</Link>
        </div>
        <Routes>
          <Route path="/issue" element={<IssueCredential />} />
          <Route path="/verify" element={<VerifyCredential />} />
          <Route path="/create-student" element={<CreateStudent />} />
          <Route path="/update-student" element={<UpdateStudent />} />
          <Route path="/search-student" element={<SearchStudent />} />
          <Route path="/delete-student" element={<DeleteStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
