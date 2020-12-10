INSERT INTO dptable (name) values (Legal);
INSERT INTO dptable (name) values (Marketing);
INSERT INTO dptable (name) values (Sales);
INSERT INTO dptable (name) values (BoardofDirectors);
INSERT INTO dptable (name) values (R&D);

INSERT INTO role (title, salary, dptid) values ('Engineer', 1000000, 5);
INSERT INTO role (title, salary, dptid) values ('Intern', 2);
INSERT INTO role (title, salary, dptid) values ('Manager', 3);
INSERT INTO role (title, salary, dptid) values ('Lawyer', 4);
INSERT INTO role (title, salary, dptid) values ('Marketer', 5);
INSERT INTO role (title, salary, dptid) values ('CTO', 6);


INSERT INTO employees (firstName, lastName, roleid, mngrid) values ('Jane', 'Austen', 2, 1);
INSERT INTO employees (firstName, lastName, roleid, mngrid) values ('Mark', 'Twain', 1, 1);
INSERT INTO employees (firstName, lastName, roleid, mngrid) values ('Lewis', 'Carroll', 3, );
INSERT INTO employees (firstName, lastName, roleid, mngrdi) values ('Andre', 'Asselin', 6, );
INSERT INTO employees (firstName, lastName, roleid, mngrid) values ('Jane', 'Austen', 2, 1);
INSERT INTO employees (firstName, lastName, roleid, mngrid) values ('Mark', 'Twain', 1, 1);
INSERT INTO employees (firstName, lastName, roleid, mngrid) values ('Lewis', 'Carroll', 3, );
INSERT INTO employees (firstName, lastName, roleid, mngrdi) values ('Andre', 'Asselin', 6, );

SELECT * FROM role;
SELECT * FROM employees;
SELECT * FROM dptable;