
CREATE VIEW DEPT_INFO(Dept_name, n_emps, ave_salary, max_salary, manager_ssn)
AS
SELECT d.Dname, 
       COUNT(e.SSN),
       AVG(e.Salary), 
       MAX(e.Salary), 
       d.mgr_ssn
FROM `DEPARTMENT` AS d
JOIN `EMPLOYEE` AS e ON d.dnumber = e.dno
GROUP BY d.Dname, d.mgr_ssn;

DROP VIEW DEPT_INFO;


