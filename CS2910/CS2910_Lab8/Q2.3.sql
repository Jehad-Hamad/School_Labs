SELECT *
FROM book AS b
JOIN book_copies AS c1 ON c1.book_id = b.book_id
WHERE c1.branch_id IN (
    SELECT c2.branch_id
    FROM book_copies AS c2
    WHERE c2.no_of_copies = (
        SELECT MAX(c3.no_of_copies)
        FROM book_copies AS c3
    )
);
