INSERT INTO dptable (name) values (Legal);
INSERT INTO dptable (name) values (Finance);
INSERT INTO dptable (name) values (Sales);
INSERT INTO dptable (name) values (R&D);

INSERT INTO role (title, salary, dptid) values ('Engineer', 100000, 4);
INSERT INTO role (title, salary, dptid) values ('Accountant', 80000, 2);
INSERT INTO role (title, salary, dptid) values ('Manager', 80000, 3);
INSERT INTO role (title, salary, dptid) values ('Lawyer', 150000, 1);
INSERT INTO role (title, salary, dptid) values ('Sales Person', 65000, 3);



INSERT INTO employee (firstName, lastName, roleid, mngrid) values ('Jane', 'Austen', 1, 1);
INSERT INTO employee (firstName, lastName, roleid, mngrid) values ('Mark', 'Twain', 2, 2);
INSERT INTO employee (firstName, lastName, roleid, mngrid) values ('Lewis', 'Carroll', 3, 3);
INSERT INTO employee (firstName, lastName, roleid, mngrid) values ('Andre', 'Asselin', 4, 4);
INSERT INTO employee (firstName, lastName, roleid, mngrid) values ('James', 'Dallas', 5, 3);
INSERT INTO employee (firstName, lastName, roleid, mngrid) values ('Michelle', 'Thompson', 1, 1);
INSERT INTO employee (firstName, lastName, roleid, mngrid) values ('Leroy', 'Jenkins', 2, 1);
INSERT INTO employee (firstName, lastName, roleid, mngrid) values ('Riley', 'Reid', 5, 3);
INSERT INTO employee (firstName, lastName, roleid, mngrid) values ('Donald', 'Glover', 2, 2);
INSERT INTO employee (firstName, lastName, roleid, mngrid) values ('Alexis', 'Texas', 5, 3);

SELECT * FROM role;
SELECT * FROM employee;
SELECT * FROM dptable;