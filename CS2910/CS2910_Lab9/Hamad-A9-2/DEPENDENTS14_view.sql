CREATE VIEW DEPENDENTS14 (Dep_name, Bdate, ESSN) AS
SELECT
    dep.dependent_name,
    dep.bdate,
    dep.essn
FROM
    `DEPENDENT` AS dep
WHERE
    TIMESTAMPDIFF (YEAR, Bdate, CURDATE()) < 40
WITH
    CHECK OPTION;

DROP VIEW `DEPENDENTS14`;

UPDATE DEPENDENTS14
SET Bdate = '1960-01-01'
WHERE Dep_name = 'Alice'; 
