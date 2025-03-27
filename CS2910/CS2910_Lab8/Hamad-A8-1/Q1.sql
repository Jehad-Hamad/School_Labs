
-- Shows all borrowers and what books they borrowed even if none
select *
from borrower AS b
LEFT JOIN book_loans AS bl ON bl.card_no = b.card_no;

-- Q1
-- Retrieve the names of borrowers who have no loans
SELECT *
FROM borrower AS b
WHERE NOT EXISTS (
    SELECT *
    FROM book_loans AS bl
    WHERE b.card_no = bl.card_no
);
