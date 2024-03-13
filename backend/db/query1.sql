DROP DATABASE IF EXISTS login;
CREATE DATABASE login;
USE login;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
	user_id  INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    PRIMARY KEY(user_id)
);

INSERT INTO users (email, password)
VALUES ('crsebastian_el_capo_2015@gmail.com', 'crsebastian777');
SELECT * FROM users;