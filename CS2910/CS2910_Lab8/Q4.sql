
-- Gets info of all borrowers
SELECT *
FROM borrower AS b;

-- Gets all of info of books
SELECT *
FROM book AS bk;

-- Gets all info from book loans
SELECT *
FROM book_loans AS bl;


-- Q4
-- Select the names, phone numbers of all borrowers including those who have no
-- loans along with titles of books
SELECT b.name, b.phone, bk.title
FROM borrower AS b
LEFT OUTER JOIN book_loans AS bl ON b.card_no = bl.card_no
LEFT OUTER JOIN book AS bk ON bl.book_id = bk.book_id;
