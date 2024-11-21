-- insert into blockchain_record table

DELIMITER $$

CREATE TRIGGER after_credential_issue
AFTER INSERT ON Academic_Credentials
FOR EACH ROW
BEGIN
    DECLARE currentTimestamp TIMESTAMP;
    DECLARE transactionHash VARCHAR(256);

    -- Get the current timestamp
    SET currentTimestamp = NOW();

    -- Generate a hash (for simplicity, using SHA2 with credential details)
    SET transactionHash = SHA2(CONCAT(NEW.credential_id, NEW.student_id, NEW.issue_date, NEW.major, NEW.gpa), 256);

    -- Insert into the Blockchain_Record table
    INSERT INTO Blockchain_Record (credential_id, transaction_hash, time_stamp, verification_status)
    VALUES (NEW.credential_id, transactionHash, currentTimestamp, 'Pending');
END$$

DELIMITER ;



