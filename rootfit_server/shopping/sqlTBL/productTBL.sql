CREATE TABLE IF NOT EXISTS product(
     prodNum INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(200) NOT NULL,
     kind CHAR(1)  NOT NULL,
     price NUMERIC(7) NOT NULL,
     content VARCHAR(1000) NOT NULL,
     image VARCHAR DEFAULT ‘default.jpg’ NOT NULL,
     useYn CHAR DEFAULT ‘y’,
     PRIMARY KEY(prodNum)
);
