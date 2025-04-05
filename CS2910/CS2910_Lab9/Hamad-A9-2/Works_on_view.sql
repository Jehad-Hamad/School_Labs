CREATE VIEW WORKS_ON_VIEW (SSN, Lname, dname, Proj_name, Hours, Manager_SSN) AS
SELECT
    e.ssn,
    e.lname,
    d.dname,
    p.pname,
    w.phours,
    d.mgr_ssn
FROM
    `EMPLOYEE` AS e
    JOIN `WORKS_ON` AS w ON e.ssn = w.essn
    JOIN `PROJECT` AS p ON w.pno = p.pnumber
    JOIN `DEPARTMENT` AS d ON p.dnum = d.dnumber;

DROP View `WORKS_ON_VIEW`;

SELECT
    SSN,
    Lname
from
    `WORKS_ON_VIEW`
WHERE
    Proj_name IN ('ProductY', 'Reorganization')
    and `Manager_SSN` = '888665555';
