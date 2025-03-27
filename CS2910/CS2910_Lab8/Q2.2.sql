

SELECT b.name, b.card_no
FROM borrower AS b       
JOIN book_loans AS bl1 ON b.card_no = bl1.card_no 
WHERE bl1.book_id IN (
    SELECT bl2.book_id
    FROM book_loans as bl2
    WHERE bl2.card_no = 1
);