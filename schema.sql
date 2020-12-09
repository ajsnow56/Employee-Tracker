DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;
USE departments_db;

CREATE TABLE dptable(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    salary DECIMAL(15,2),
    dptid INT,
    FOREIGN KEY (dptid) REFERENCES dptable(id),
    PRIMARY KEY (id),
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(100),
    lastName VARCHAR(100), 
    roleid INT,
    mngrid INT,
    FOREIGN KEY (roleid) REFERENCES role(id),
    FOREIGN KEY (mngrid) REFERENCES employee(id),
    PRIMARY KEY (id)
);