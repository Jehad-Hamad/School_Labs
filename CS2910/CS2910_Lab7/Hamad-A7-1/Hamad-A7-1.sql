PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE borrower(
    card_no INTEGER PRIMARY KEY,
    name TEXT NOT NULL CHECK(length(name) <= 50),
    address TEXT NOT NULL CHECK(length(address) <= 20),
    phone TEXT NOT NULL CHECK(length(phone) = 12),
    CONSTRAINT name_unique UNIQUE (card_no, name)
);
INSERT INTO borrower VALUES(1,'Jacky M','123 Main St','123-456-7890');
INSERT INTO borrower VALUES(2,'Morgan N','456 Elm St','234-567-8901');
INSERT INTO borrower VALUES(3,'Reece H','789 Oak St','345-678-9012');
CREATE TABLE library_branch(
    branch_id INTEGER PRIMARY KEY UNIQUE,
    branch_name TEXT NOT NULL UNIQUE,
    address TEXT NOT NULL UNIQUE CHECK(length(address) <= 20)
);
INSERT INTO library_branch VALUES(1,'Downtown Library','101 City Rd');
INSERT INTO library_branch VALUES(2,'Eastside Library','202 East Ave');
INSERT INTO library_branch VALUES(3,'Westside Library','303 West Blvd');
CREATE TABLE publisher(
    name TEXT PRIMARY KEY UNIQUE CHECK(length(name) <= 50),
    address TEXT NOT NULL UNIQUE CHECK(length(address) <= 20),
    phone TEXT NOT NULL CHECK(length(phone) = 12)
);
INSERT INTO publisher VALUES('Penguin Books','12 Penguin Ln','111-222-3333');
INSERT INTO publisher VALUES('HarperCollins','45 Harper St','444-555-6666');
INSERT INTO publisher VALUES('Random House','78 Random Ave','777-888-9999');
CREATE TABLE book(
    book_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL CHECK(length(title) < 30),
    publisher_name TEXT,
    FOREIGN KEY (publisher_name) REFERENCES publisher(name)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);
INSERT INTO book VALUES(1,'The Great Adventure of Sinbad','Penguin Books');
INSERT INTO book VALUES(2,'Mystery of the Eastern Heros','HarperCollins');
INSERT INTO book VALUES(4,'Science of Tomorrows Past','Random House');
CREATE TABLE book_authors(
    book_id INTEGER,
    author_name TEXT CHECK(length(author_name) <= 20),
    PRIMARY KEY(book_id, author_name),
    FOREIGN KEY (book_id) REFERENCES book(book_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);
INSERT INTO book_authors VALUES(1,'Jayvee A');
INSERT INTO book_authors VALUES(1,'Jervie F');
INSERT INTO book_authors VALUES(2,'Jyrene M');
INSERT INTO book_authors VALUES(4,'Sophia M');
CREATE TABLE book_copies(
    book_id INTEGER,
    branch_id INTEGER,
    no_of_copies INTEGER CHECK(no_of_copies >= 0),
    PRIMARY KEY(book_id, branch_id),
    FOREIGN KEY (book_id) REFERENCES book(book_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
    FOREIGN KEY (branch_id) REFERENCES library_branch(branch_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);
INSERT INTO book_copies VALUES(1,1,5);
INSERT INTO book_copies VALUES(1,2,2);
INSERT INTO book_copies VALUES(2,1,3);
INSERT INTO book_copies VALUES(2,3,4);
INSERT INTO book_copies VALUES(4,2,1);
CREATE TABLE book_loans(
    book_id INTEGER,
    branch_id INTEGER,
    card_no INTEGER,
    date_out TEXT NOT NULL CHECK(length(date_out) = 10),
    due_date TEXT NOT NULL CHECK(length(due_date) = 10),
    PRIMARY KEY(book_id, branch_id, card_no),
    FOREIGN KEY (book_id) REFERENCES book(book_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    FOREIGN KEY (branch_id) REFERENCES library_branch(branch_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    FOREIGN KEY (card_no) REFERENCES borrower(card_no)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);
INSERT INTO book_loans VALUES(1,1,1,'2025-03-01','2025-03-15');
INSERT INTO book_loans VALUES(2,3,2,'2025-03-05','2025-03-20');
INSERT INTO book_loans VALUES(4,2,3,'2025-03-10','2025-03-25');
COMMIT;
