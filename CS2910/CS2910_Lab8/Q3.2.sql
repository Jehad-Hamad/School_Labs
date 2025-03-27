SELECT branch_id, count(*)
FROM book_copies
GROUP BY branch_id
HAVING COUNT(*) > 2;


SELECT branch_id, SUM(no_of_copies) AS total_copies
FROM book_copies
GROUP BY branch_id
HAVING SUM(no_of_copies) > 5;



SELECT branch_id, SUM(no_of_copies) AS total_copies
FROM book_copies
GROUP BY branch_id
HAVING COUNT(*) > 2 AND SUM(no_of_copies) > 5;
-- needed to have more than 2 books as i love have three books max so no branch would be show up if it was 3
