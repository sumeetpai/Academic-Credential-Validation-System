-- find students without credentials
SELECT student_id, name 
FROM Student 
WHERE student_id NOT IN (SELECT student_id FROM Academic_Credentials);

-- get credentials for a specific institution
SELECT credential_id 
FROM Academic_Credentials 
WHERE institution_id = (
    SELECT institution_id 
    FROM Institution 
    WHERE name = 'I001'
);


