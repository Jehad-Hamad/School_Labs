
--shows books copies and what book they are as long as branch
SELECT c.branch_id, b.title, c.no_of_copies
FROM book_copies AS c
JOIN book AS b ON b.book_id = c.book_id;

--shows max # of books for branch 1
SELECT c.branch_id, b.title, Max(c.no_of_copies)
FROM book_copies AS c
JOIN book AS b ON b.book_id = c.book_id
WHERE c.branch_id = 1;

--only nested queries
--get the branch id title and # of books where i have more books that the max amount in branch 1
SELECT c.branch_id, b.title, c.no_of_copies
FROM book AS b, book_copies AS c
    WHERE b.book_id = c.book_id AND
        c.no_of_copies > (
        SELECT MAX(c2.no_of_copies)
        FROM book_copies AS c2
        WHERE c2.branch_id = 1
);




--using joins and nested queries
-- SELECT c.branch_id, b.title, c.no_of_copies
-- FROM book AS b
-- JOIN book_copies as c ON b.book_id = c.book_id
-- WHERE c.no_of_copies > (
--     SELECT MAX(c2.no_of_copies)
--     FROM book_copies AS c2
--     where c2.branch_id = 1
-- );