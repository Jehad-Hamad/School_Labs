-- SQLite
select book_copies.branch_id, library_branch.branch_name, avg(book_copies.no_of_copies) as Ave_no_of_books
from book_copies, library_branch 
where book_copies.branch_id = library_branch.branch_id
GROUP BY book_copies.branch_id;

-- SQLite
select book_copies.branch_id, library_branch.branch_name, sum(book_copies.no_of_copies) as total_books
from book_copies, library_branch 
where book_copies.branch_id = library_branch.branch_id
GROUP BY book_copies.branch_id
HAVING avg(book_copies.no_of_copies) > 3;

-- had to adjust the ave number of books as most book copies are small with largest being 10