--Q8.1)
CREATE TRIGGER capitalize_names_before_insert
BEFORE INSERT ON EMPLOYEE
FOR EACH ROW
BEGIN
    SET NEW.fname = CONCAT(UCASE(LEFT(NEW.fname, 1)), SUBSTRING(NEW.fname, 2)),
        NEW.lname = CONCAT(UCASE(LEFT(NEW.lname, 1)), SUBSTRING(NEW.lname, 2));
END;

INSERT INTO EMPLOYEE(fname, minit, lname, ssn, bdate, address, sex, salary, super_ssn, dno)
VALUES
('jehad', 'M', 'hamad', '12332121', '2005-01-06', NULL, 'M', 45000, NULL, 1);


--Q8.2)
DELIMITER //
CREATE TRIGGER bdate_before_insert
BEFORE INSERT ON DEPENDENT
FOR EACH ROW
BEGIN
    IF NEW.bdate > CURDATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Invalid birthdate Insertion! Cannot be in the future.';
    END IF;
END 
DELIMITER ;

DELIMITER //
CREATE TRIGGER bdate_before_update
BEFORE Update ON DEPENDENT
FOR EACH ROW
BEGIN
    IF NEW.bdate > CURDATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Invalid birthdate! Cannot be in the future.';
    END IF;
END 
DELIMITER ;

UPDATE `DEPENDENT`
SET bdate = '2025-12-12'
WHERE essn = 123456789;

INSERT INTO DEPENDENT(essn, dependent_name, sex, bdate, relationship)
VALUES
('333445555', 'Sophia', 'F', '2025-12-12', 'Daughter');



--Q8.3)
DELIMITER //

CREATE TRIGGER update_salary_trigger
AFTER UPDATE ON WORKS_ON
FOR EACH ROW
BEGIN
    -- Declare a local variable
    SET @total_hours = (
        SELECT SUM(phours)
        FROM WORKS_ON
        WHERE essn = NEW.essn
    );

    -- If total hours exceed 50, increase the salary
    IF @total_hours > 50 THEN
        UPDATE EMPLOYEE
        SET salary = salary * 1.10  -- Increase salary by 10%
        WHERE ssn = NEW.essn;
    END IF;
END

DELIMITER ;

UPDATE `WORKS_ON`
SET phours = 30
WHERE essn = '333445555' AND pno = 20;


--Q8.4)
CREATE TRIGGER insert_salary_trigger
AFTER INSERT ON WORKS_ON
FOR EACH ROW
BEGIN
    -- Declare a local variable
    SET @total_hours = (
        SELECT SUM(phours)
        FROM WORKS_ON
        WHERE essn = NEW.essn
    );

    -- If total hours exceed 50, increase the salary
    IF @total_hours > 50 THEN
        UPDATE EMPLOYEE
        SET salary = salary * 1.10  -- Increase salary by 10%
        WHERE ssn = NEW.essn;
    END IF;
END

DELIMITER ;

-- Insert enough records to trigger salary update
INSERT INTO WORKS_ON (essn, pno, phours) VALUES 
('12332121', 1, 15),
('12332121', 2, 20);

INSERT INTO WORKS_ON (essn, pno, phours) VALUES 
('12332121', 3, 18);  -- This one should push total over 50 and trigger the salary update
