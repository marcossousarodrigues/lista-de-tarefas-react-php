

CREATE TABLE tasks(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    description VARCHAR(100),
    datestart date,
    datefinish date,
    createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updadtedAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE users(
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updadtedAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
)

ALTER TABLE tasks ADD COLUMN fk_userid INT

ALTER TABLE tasks ADD CONSTRAINT fk_userid
FOREIGN KEY(fk_userid) REFERENCES users (id)


ALTER TABLE tasks ADD COLUMN conclude VARCHAR(2)
