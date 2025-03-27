SELECT b.name, b.phone, bk.title
FROM borrower AS b
LEFT OUTER JOIN book_loans AS bl ON b.card_no = bl.card_no
LEFT OUTER JOIN book AS bk ON bl.book_id = bk.book_id;
