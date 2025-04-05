CREATE VIEW HIGH_SALARY_EMPLOYEES AS
SELECT
    *
FROM
    EMPLOYEE
WHERE
    Salary > 50000
WITH
    CHECK OPTION;


DROP VIEW `HIGH_SALARY_EMPLOYEES`;

UPDATE HIGH_SALARY_EMPLOYEES
SET `Salary` = 0
WHERE SSN = '888665555'; 

--will work
INSERT INTO `HIGH_SALARY_EMPLOYEES`(fname, minit, lname, ssn, bdate, address, sex, salary, super_ssn, dno)
VALUES('Rich', null, 'Richy', '312312312', null, null, 'M', 100000, null, 1);

--will not work
INSERT INTO `HIGH_SALARY_EMPLOYEES`(fname, minit, lname, ssn, bdate, address, sex, salary, super_ssn, dno)
VALUES('poor', null, 'broke', '312312312', null, null, 'M', 0, null, 5);