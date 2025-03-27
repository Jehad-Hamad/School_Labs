
-- Output branches that have more than 3 books
SELECT c.branch_id, count(*)
FROM book_copies AS c
GROUP BY c.branch_id
HAVING COUNT(*) > 2;

-- The total number of books whose no_copies value exceeds 5 in each branch
SELECT c.branch_id, SUM(c.no_of_copies) AS total_copies
FROM book_copies as c
GROUP BY c.branch_id
HAVING SUM(c.no_of_copies) > 5;

-- Q3.2
-- For each branch that has more than 3 books retrieve the branch ID 
-- and the number of those books whose no_copies value exceeds 5
SELECT c.branch_id, SUM(c.no_of_copies) AS total_copies
FROM book_copies as c
GROUP BY c.branch_id
HAVING COUNT(*) > 2 AND SUM(c.no_of_copies) > 5;
-- Needed to have more than 2 books as i love have three books max so no branch would be show up if it was 3
