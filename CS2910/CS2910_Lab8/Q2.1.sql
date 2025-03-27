-- SQLite









--using joins and nested
/* SELECT b.title, c.no_of_copies
FROM book as b
JOIN book_copies as c on b.book_id = c.book_id
WHERE c.no_of_copies > (
    SELECT MAX(c2.no_of_copies)
    FROM book_copies as c2
    JOIN library_branch as lb ON c2.branch_id = lb.branch_id
    where lb.branch_id = 1
);
 */