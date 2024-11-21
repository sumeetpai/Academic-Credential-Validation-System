-- Employer table
CREATE TABLE Employer (
    employer_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    industry VARCHAR(100),
    address VARCHAR(200),
    area VARCHAR(100),
    city VARCHAR(100)
);

-- Student table
CREATE TABLE Student (
    student_id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    address_city VARCHAR(100),
    address_area VARCHAR(100),
    phone_numbers VARCHAR(100)
);

-- Institution table
CREATE TABLE Institution (
    institution_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address_city VARCHAR(100),
    address_state VARCHAR(100),
    website VARCHAR(100),
    phone VARCHAR(50),
    accreditation VARCHAR(100)
);

-- Academic Credentials table
CREATE TABLE Academic_Credentials (
    credential_id VARCHAR(50) PRIMARY KEY,
    major VARCHAR(100),
    gpa DECIMAL(3,2),
    issue_date DATE,
    institution_id VARCHAR(50),
    student_id VARCHAR(50),
    FOREIGN KEY (institution_id) REFERENCES Institution(institution_id),
    FOREIGN KEY (student_id) REFERENCES Student(student_id)
);

-- Blockchain Record table
CREATE TABLE Blockchain_Record (
    credential_id VARCHAR(50) PRIMARY KEY,
    transaction_hash VARCHAR(256) NOT NULL,
    time_stamp TIMESTAMP,
    verification_status VARCHAR(50),
    FOREIGN KEY (credential_id) REFERENCES Academic_Credentials(credential_id)
);

