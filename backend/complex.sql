-- find students with more than one credential
SELECT s.name, COUNT(ac.credential_id) AS credentials_issued 
FROM Student s 
INNER JOIN Academic_Credentials ac ON s.student_id = ac.student_id 
GROUP BY s.student_id 
HAVING COUNT(ac.credential_id) > 1;

-- count of students by city and credentials issued
SELECT s.address_city, COUNT(ac.credential_id) AS total_credentials 
FROM Student s 
LEFT JOIN Academic_Credentials ac ON s.student_id = ac.student_id 
GROUP BY s.address_city;
