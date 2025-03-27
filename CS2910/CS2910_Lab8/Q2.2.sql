
--gets all books from card# = 1
SELECT book_id, card_no
FROM book_loans
WHERE card_no = 1;

--Q2.2
--select the names and card numbers of all borrowers who borrow the same book
--(books) that borrower whose card number = ‘1’borrows
SELECT b.name, b.card_no
FROM borrower as b, book_loans as bl1
WHERE b.card_no = bl1.card_no AND
bl1.book_id IN (
    SELECT bl2.book_id
    FROM book_loans as bl2
    WHERE bl2.card_no = 1
);


--using joins and nested queries
-- SELECT b.name, b.card_no
-- FROM borrower AS b       
-- JOIN book_loans AS bl1 ON b.card_no = bl1.card_no 
-- WHERE bl1.book_id IN (
--     SELECT bl2.book_id
--     FROM book_loans as bl2
--     WHERE bl2.card_no = 1
-- );