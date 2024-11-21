// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Replace with your MySQL username (default: root)
  password: 'root',     // Replace with your MySQL password (default: '')
  database: 'acvs1',    // Replace with your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Route to create a student
app.post('/create-student', (req, res) => {
  const { studentID, email, name, dob, addressCity, addressArea, phoneNumber } = req.body;
  console.log(studentID, email, name, dob, addressCity, addressArea, phoneNumber)
  const sql = `INSERT INTO student (student_id, email, name, date_of_birth, address_city, address_area, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(sql, [studentID, email, name, dob, addressCity, addressArea, phoneNumber], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Student created successfully' });
  });
});

// Route to issue a credential
// Route to issue a credential
app.post('/issue-credential', (req, res) => {
  const { credentialID, major, gpa, issueDate, institutionID, studentID } = req.body;
  console.log(credentialID, major, gpa, issueDate, institutionID, studentID);

  // SQL query to check if the student exists in the student table
  const checkStudentSQL = `SELECT * FROM student WHERE student_id = ?`;
  
  db.query(checkStudentSQL, [studentID], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Check if any result is returned (i.e., student exists)
    if (results.length === 0) {
      return res.status(404).json({ message: 'Student ID does not exist. Credential not issued.' });
    }

    // Proceed to issue the credential since the student exists
    const insertCredentialSQL = `INSERT INTO academic_credentials (credential_id, major, gpa, issue_date, institution_id, student_id) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(insertCredentialSQL, [credentialID, major, gpa, issueDate, institutionID, studentID], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Credential issued successfully' });
    });
  });
});

app.get('/verify-credential/:credentialID', (req, res) => {
  const credentialID = req.params.credentialID;

  const query = 'SELECT verification_status FROM Blockchain_Record WHERE credential_id = ?';
  db.query(query, [credentialID], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Error verifying credential' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Credential not found' });
    }

    return res.json({ verification_status: result[0].verification_status });
  });
});


// Route to search by student ID
app.get('/search-by-credential-id/:credentialID', (req, res) => {
  const { credentialID } = req.params;
  console.log('Calling stored procedure for credential ID:', credentialID);

  const query = `CALL SearchByCredentialID(?)`;
  db.execute(query, [credentialID], (err, results) => {
    if (err) {
      console.error('Stored Procedure Error:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results[0].length === 0) {
      return res.status(404).json({ message: 'No record found for the given Credential ID' });
    }
    res.json(results[0]); // Results from the SELECT statement inside the procedure
  });
});


app.post('/search-student-institution', (req, res) => {
  const { studentID, institutionID } = req.body;
  console.log('Calling stored procedure for:', studentID, institutionID);

  const query = `CALL SearchStudentInstitution(?, ?)`;
  db.execute(query, [studentID, institutionID], (err, results) => {
    if (err) {
      console.error('Stored Procedure Error:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results[0].length === 0) {
      return res.status(404).json({ message: 'No record found for the given Student and Institution ID' });
    }
    res.json(results[0]); // Results from the SELECT statement inside the procedure
  });
});


// Route to update a student
app.put('/update-student', (req, res) => {
  const { studentID, email, name, dob, addressCity, addressArea, phoneNumber } = req.body;

  const sql = `UPDATE student 
               SET email = ?, name = ?, date_of_birth = ?, address_city = ?, address_area = ?, phone_number = ? 
               WHERE student_id = ?`;

  db.query(sql, [email, name, dob, addressCity, addressArea, phoneNumber, studentID], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully' });
  });
});

app.delete('/delete-student', (req, res) => {
  const { studentID, institutionID } = req.body;

  // Check if student exists in the given institution
  const checkSQL = `SELECT * FROM student WHERE student_id = ?`;
  db.query(checkSQL, [studentID, institutionID], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Student not found in the given institution' });
    }

    // Delete the student
    const deleteSQL = `DELETE FROM student WHERE student_id = ?`;
    db.query(deleteSQL, [studentID, institutionID], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(200).json({ message: 'Student deleted successfully' });
    });
  });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
