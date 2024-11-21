-- get all students and their credentials
SELECT s.student_id, s.name, ac.credential_id, ac.major, ac.gpa 
FROM Student s 
LEFT JOIN Academic_Credentials ac ON s.student_id = ac.student_id;

-- find institutions for each credetial issued

SELECT ac.credential_id, ac.major, i.name AS institution_name 
FROM Academic_Credentials ac 
INNER JOIN Institution i ON ac.institution_id = i.institution_id;
