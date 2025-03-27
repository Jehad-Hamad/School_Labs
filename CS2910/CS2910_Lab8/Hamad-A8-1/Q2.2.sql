
-- Gets all books from card# = 1
SELECT bl.book_id, bl.card_no
FROM book_loans AS bl
WHERE bl.card_no = 1;

-- Only nested queries
-- Q2.2
-- Select the names and card numbers of all borrowers who borrow the same book
-- (books) that borrower whose card number = ‘1’borrows


select *
from book_loans;

SELECT b.name, b.card_no
FROM borrower AS b, book_loans AS bl1
WHERE b.card_no = bl1.card_no AND
bl1.book_id IN (
    SELECT bl2.book_id
    FROM book_loans as bl2
    WHERE bl2.card_no = 1
);


-- Using joins and nested queries
-- SELECT b.name, b.card_no
-- FROM borrower AS b       
-- JOIN book_loans AS bl1 ON b.card_no = bl1.card_no 
-- WHERE bl1.book_id IN (
--     SELECT bl2.book_id
--     FROM book_loans as bl2
--     WHERE bl2.card_no = 1
-- );