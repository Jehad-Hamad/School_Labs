-- SQLite
SELECT *
from book_copies
ORDER by branch_id;


SELECT *, count(*)
FROM book_copies
GROUP BY branch_id
HAVING COUNT(book_id) > 2;

SELECT bc.branch_id, COUNT(*) AS books_c
FROM book_copies AS bc
WHERE bc.no_of_copies > 2
GROUP BY branch_id;


select branch_id, COUNT(*) AS books_c
FROM book_copies
WHERE no_of_copies > 2
GROUP BY branch_id
HAVING COUNT(*) > 2;