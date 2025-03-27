
-- Select book_id, branch_id, branch_name, # of books 
-- from book copies and library branchs and order them by the branch id
SELECT c.book_id, c.branch_id, lb.branch_name, c.no_of_copies
FROM book_copies AS c
JOIN library_branch AS lb on c.branch_id = lb.branch_id
ORDER BY c.branch_id;


-- Check the solution output average no_copies value for each branch
SELECT c.branch_id, lb.branch_name, avg(c.no_of_copies) as Ave_no_of_books
FROM book_copies AS c, library_branch AS lb
WHERE c.branch_id = lb.branch_id
GROUP BY c.branch_id;

-- Q3.1
-- For each branch whose average no_copies value is more than 50, retrieve the
-- branch name and the number of copies stores in that branch.
SELECT c.branch_id, lb.branch_name, sum(c.no_of_copies) as total_books
FROM book_copies AS c, library_branch AS lb
WHERE c.branch_id = lb.branch_id
GROUP BY c.branch_id
HAVING avg(c.no_of_copies) > 3;
-- Had to adjust the ave number of books as most book copies are small with largest being 10