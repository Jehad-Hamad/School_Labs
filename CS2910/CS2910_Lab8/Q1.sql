--shows all borrowers and what books they borrowed even if noneS
select *
from borrower as b
LEFT JOIN book_loans as bl ON bl.card_no = b.card_no;

--shows only person that has no books taken out
SELECT *
FROM borrower b
WHERE NOT EXISTS (
    SELECT *
    FROM book_loans bl
    WHERE b.card_no = bl.card_no
);
