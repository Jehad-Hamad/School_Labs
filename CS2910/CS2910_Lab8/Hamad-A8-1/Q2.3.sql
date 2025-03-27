
-- Find the biggest number of book copies
SELECT max(c.no_of_copies)
FROM book_copies as c;

-- Select eveything from book loans
SELECT *
FROM book_copies as c
ORDER BY c.branch_id;

-- Only nested queries
-- Q2.3
-- Retrieve the titles of all book which stored in the branch that has the book with
-- the highest no_copies value among all books
SELECT b.book_id, b.title, b.publisher_name, c.branch_id, c.no_of_copies
FROM book AS b, book_copies AS c
WHERE b.book_id = c.book_id AND
c.branch_id IN (
    SELECT c2.branch_id
    FROM book_copies as c2
    WHERE c2.no_of_copies = (
        SELECT MAX(c3.no_of_copies)
        FROM book_copies as c3
    )
);


-- Using joins and nested queries
-- SELECT *
-- FROM book AS b
-- JOIN book_copies AS c1 ON c1.book_id = b.book_id
-- WHERE c1.branch_id IN (
--     SELECT c2.branch_id
--     FROM book_copies AS c2
--     WHERE c2.no_of_copies = (
--         SELECT MAX(c3.no_of_copies)
--         FROM book_copies AS c3
--     )
-- );
