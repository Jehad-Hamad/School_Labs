SELECT *
FROM borrower b
WHERE NOT EXISTS (
    SELECT *
    FROM book_loans bl
    WHERE b.card_no = bl.card_no
);
