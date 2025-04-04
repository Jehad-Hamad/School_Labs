/* 2025-04-03 11:35:43 [21 ms] */ 
DROP TABLE IF EXISTS EMPLOYEE;
/* 2025-04-03 11:35:45 [61 ms] */ 
create table EMPLOYEE(
fname varchar(20) NOT NULL,
minit varchar(1),
lname varchar(25) NOT NULL,
ssn varchar(9) DEFAULT '000000000',
bdate date,
address varchar(50),
sex varchar(1),
salary int CHECK (salary>0) NOT NULL,
super_ssn varchar(9),
dno int,
PRIMARY KEY(ssn),
FOREIGN KEY (super_ssn) REFERENCES EMPLOYEE(ssn)
ON DELETE SET NULL
ON UPDATE CASCADE
);
/* 2025-04-03 11:35:47 [9 ms] */ 
DROP TABLE IF EXISTS DEPARTMENT;
/* 2025-04-03 11:35:47 [37 ms] */ 
create table DEPARTMENT(
dname varchar(25) NOT NULL,
dnumber int,
mgr_ssn varchar(9),
mgr_start_date date,
PRIMARY KEY(dnumber),
FOREIGN KEY (mgr_ssn) REFERENCES EMPLOYEE(ssn)
ON DELETE SET NULL
ON UPDATE CASCADE
);
/* 2025-04-03 11:35:49 [4 ms] */ 
DROP TABLE IF EXISTS DEPT_LOCATIONS;
/* 2025-04-03 11:35:52 [52 ms] */ 
create table DEPT_LOCATIONS(
dnumber int,
dlocation varchar(20) NOT NULL,
PRIMARY KEY(dnumber,dlocation),
FOREIGN KEY (dnumber) REFERENCES DEPARTMENT(dnumber)
ON DELETE CASCADE
ON UPDATE CASCADE
);
/* 2025-04-03 11:35:53 [6 ms] */ 
DROP TABLE IF EXISTS PROJECT;
/* 2025-04-03 11:35:56 [57 ms] */ 
create table PROJECT(
pname varchar(20) NOT NULL,
pnumber int,
plocation varchar(20),
dnum int,
PRIMARY KEY(pnumber),
FOREIGN KEY (dnum) REFERENCES DEPARTMENT(dnumber)
ON DELETE SET NULL
ON UPDATE CASCADE
);
/* 2025-04-03 11:35:58 [13 ms] */ 
DROP TABLE IF EXISTS WORKS_ON;
/* 2025-04-03 11:36:00 [77 ms] */ 
create table WORKS_ON(
essn varchar(9),
pno int,
phours float(5,1),
PRIMARY KEY(essn, pno),
FOREIGN KEY (essn) REFERENCES EMPLOYEE(ssn)
ON DELETE NO ACTION
ON UPDATE CASCADE
);
/* 2025-04-03 11:36:02 [4 ms] */ 
DROP TABLE IF EXISTS DEPENDENT;
/* 2025-04-03 11:36:03 [38 ms] */ 
create table DEPENDENT(
essn varchar(9),
dependent_name varchar(20) NOT NULL,
sex varchar(1),
bdate date,
relationship varchar(20) NOT NULL,
PRIMARY KEY(essn, dependent_name),
FOREIGN KEY (essn) REFERENCES EMPLOYEE(ssn)
ON DELETE CASCADE
ON UPDATE CASCADE
);
/* 2025-04-03 11:38:33 [15 ms] */ 
INSERT INTO EMPLOYEE(fname, minit, lname, ssn, bdate, address, sex, salary, super_ssn, dno)
VALUES
('James', 'E', 'Borg', '888665555', '1937-11-10', '450 Stone, Houston, TX', 'M', 55000, NULL, 1);
/* 2025-04-03 11:40:13 [12 ms] */ 
INSERT INTO EMPLOYEE(fname, minit, lname, ssn, bdate, address, sex, salary, super_ssn, dno)
VALUES
('Franklin', 'T', 'Wong', '333445555', '1955-12-08', '638 Voss, Houston, TX', 'M', 40000, '888665555', 5),
('Jennifer', 'S', 'Wallace', '987654321', '1941-06-20', '291 Berry, Bellaire, TX', 'F', 43000, '888665555', 4);
/* 2025-04-03 11:40:57 [16 ms] */ 
INSERT INTO EMPLOYEE(fname, minit, lname, ssn, bdate, address, sex, salary, super_ssn, dno)
VALUES
('John', 'B', 'Smith', '123456789', '1965-01-09', '731 Fondren, Houston, TX', 'M', 30000, '333445555', 5),
('Alicia', 'J', 'Zelaya', '999887777', '1968-01-19', '3321 Castle, Spring, TX', 'F', 25000, '987654321', 4),
('Ramesh', 'K', 'Narayan', '666884444', '1962-09-15', '975 Fire Oak, Humble, TX', 'M', 38000, '333445555', 5),
('Joyce', 'A', 'English', '453453453', '1972-07-31', '5631 Rice, Houston, TX', 'F', 25000, '333445555', 5),
('Ahmad', 'V', 'Jabbar', '987987987', '1969-03-29', '980 Dallas, Houston, TX', 'M', 25000, '987654321', 4);
/* 2025-04-03 11:42:42 [12 ms] */ 
INSERT INTO DEPARTMENT(dname, dnumber, mgr_ssn, mgr_start_date)
VALUES
('Research', 5, '333445555', '1988-05-22'),
('Administration', 4, '987654321', '1995-01-01'),
('Headquarters', 1, '888665555', '1981-06-19');
/* 2025-04-03 11:44:06 [8 ms] */ 
INSERT INTO DEPT_LOCATIONS(Dnumber, Dlocation)
VALUES
(1, 'Houston'),
(4, 'Stafford'),
(5, 'Bellaire'),
(5, 'Sugarland'),
(5, 'Houston');
/* 2025-04-03 11:44:07 [16 ms] */ 
INSERT INTO PROJECT(pname, pnumber, plocation, dnum)
VALUES
('ProductX', 1, 'Bellaire', 5),
('ProductY', 2, 'Sugarland', 5),
('ProductZ', 3, 'Houston', 5),
('Computerization', 10, 'Stafford', 4),
('Reorganization', 20, 'Houston', 1),
('Newbenefits', 30, 'Stafford', 4);
/* 2025-04-03 11:44:10 [16 ms] */ 
INSERT INTO WORKS_ON(essn, pno, phours)
VALUES
('123456789', 1, 32.5),
('123456789', 2, 7.5),
('666884444', 3, 40.0),
('453453453', 1, 20.0),
('453453453', 2, 20.0),
('333445555', 2, 10.0),
('333445555', 3, 10.0),
('333445555', 10, 10.0),
('333445555', 20, 10.0),
('999887777', 30, 30.0),
('999887777', 10, 10.0),
('987987987', 10, 35.0),
('987987987', 30, 5.0),
('987654321', 30, 20.0),
('987654321', 20, 15.0),
('888665555', 20, NULL);
/* 2025-04-03 11:44:12 [23 ms] */ 
INSERT INTO DEPENDENT(essn, dependent_name, sex, bdate, relationship)
VALUES
('333445555', 'Alice', 'F', '1986-04-05', 'Daughter'),
('333445555', 'Theodore', 'M', '1983-10-25', 'Son'),
('333445555', 'Joy', 'F', '1958-05-03', 'Spouse'),
('987654321', 'Abner', 'M', '1942-02-28', 'Spouse'),
('123456789', 'Michael', 'M', '1988-01-04', 'Son'),
('123456789', 'Alice', 'F', '1988-12-30', 'Daughter'),
('123456789', 'Elizabeth', 'F', '1967-05-05', 'Spouse');
/* 2025-04-03 11:50:58 [157 ms] */ 
ALTER TABLE EMPLOYEE
ADD CONSTRAINT fk_dept
FOREIGN KEY (dno)
REFERENCES DEPARTMENT (dnumber)
ON DELETE SET NULL
ON UPDATE CASCADE;
/* 2025-04-03 15:45:42 [71 ms] */ 
CREATE TRIGGER capitalize_names_before_insert
BEFORE INSERT ON EMPLOYEE
FOR EACH ROW
BEGIN
    SET NEW.fname = CONCAT(UCASE(LEFT(NEW.fname, 1)), SUBSTRING(NEW.fname, 2)),
        NEW.lname = CONCAT(UCASE(LEFT(NEW.lname, 1)), SUBSTRING(NEW.lname, 2));
END;
/* 2025-04-03 17:20:48 [59 ms] */ 
INSERT INTO EMPLOYEE(fname, minit, lname, ssn, bdate, address, sex, salary, super_ssn, dno)
VALUES
('jehad', 'M', 'hamad', '12332121', '2005-01-06', NULL, 'M', 45000, NULL, 1);
/* 2025-04-03 17:34:52 [42 ms] */ 
CREATE TRIGGER bdate_before_insert
BEFORE INSERT ON DEPENDENT
FOR EACH ROW
BEGIN
    IF NEW.bdate > CURDATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Invalid birthdate! Cannot be in the future.';
    END IF;
END;
/* 2025-04-03 17:53:22 [20 ms] */ 
CREATE TRIGGER bdate_before_update
BEFORE Update ON DEPENDENT
FOR EACH ROW
BEGIN
    IF NEW.bdate > CURDATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Invalid birthdate! Cannot be in the future.';
    END IF;
END;

/* 2025-04-03 22:03:25 [42 ms] */ 
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
END;
/* 2025-04-03 22:07:48 [18 ms] */ 
UPDATE `WORKS_ON`
SET phours = 30
WHERE essn = '333445555' AND pno = 20;
/* 2025-04-03 23:00:21 [27 ms] */ 
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
END;
/* 2025-04-03 23:01:40 [3 ms] */ 
SELECT * FROM `WORKS_ON` where essn = '12332121' LIMIT 100;
/* 2025-04-03 23:02:21 [10 ms] */ 
INSERT INTO WORKS_ON (essn, pno, phours) VALUES 
('12332121', 1, 15),
('12332121', 2, 20);
/* 2025-04-03 23:04:01 [2 ms] */ 

SELECT * FROM `WORKS_ON` where essn = '12323121' LIMIT 100;
/* 2025-04-03 23:04:09 [2 ms] */ 
INSERT INTO WORKS_ON (essn, pno, phours) VALUES 
('12332121', 3, 18);

/* 2025-04-03 23:08:24 [3 ms] */ 
SELECT * FROM `WORKS_ON` WHERE essn = '12332121' LIMIT 100;
