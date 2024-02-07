-- <회원>
-- 회원테이블
CREATE TABLE IF NOT EXISTS userTBL(
     id VARCHAR(20) NOT NULL,
     password VARCHAR(200) NOT NULL,
     nickname VARCHAR(10) NOT NULL,
     phone VARCHAR(20) NOT NULL,
     email VARCHAR(200) NOT NULL UNIQUE,
     addr VARCHAR(100),
     createAt DATETIME DEFAULT now(),
     isAdmin Boolean NOT NULL DEFAULT false,
     healthSelect JSON,
     PRIMARY KEY (id)
);



-- <보드>
-- 게시글 테이블
CREATE TABLE IF NOT EXISTS boardTBL(
     id INT NOT NULL AUTO_INCREMENT,
     user_id VARCHAR(20) NOT NULL,
     createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
     title VARCHAR(100) NOT NULL,
     content TEXT NOT NULL,
     cnt INT DEFAULT '0',
     reccnt INT DEFAULT '0',
     img VARCHAR(50),
     CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES userTBL(id),
     PRIMARY KEY (id)
);

-- 댓글테이블
CREATE TABLE IF NOT EXISTS commentTBL(
     id INT NOT NULL AUTO_INCREMENT,
     user_id VARCHAR(20) NOT NULL,
     createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
     board_id INT NOT NULL,
     content varchar(100) NOT NULL,
     CONSTRAINT fk_comment_user_id FOREIGN KEY(user_id) REFERENCES userTBL(id),
     CONSTRAINT fk_comment_board_id FOREIGN KEY(board_id) REFERENCES boardTBL(id),
     PRIMARY KEY (id)
);



-- <헬스리스트>
-- Health List 테이블
CREATE TABLE IF NOT EXISTS healthlistTBL(
     healthNo VARCHAR(200) NOT NULL,
     healthTitle VARCHAR(20) NOT NULL,
     healthContent VARCHAR(100) NOT NULL,
     PRIMARY KEY (healthNo)
);

-- Health List 누적 데이터 테이블
CREATE TABLE IF NOT EXISTS healthselectTBL(
     healthNo VARCHAR(200) NOT NULL,
     user_id VARCHAR(20),
     createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     healthSelect JSON NOT NULL,
     CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES userTBL(id),
     PRIMARY KEY (healthNo)
);



-- <쇼핑>
-- 주문 테이블
CREATE TABLE IF NOT EXISTS orderTBL(
     orderNum INT NOT NULL AUTO_INCREMENT,
     id VARCHAR(20) NOT NULL,
     nickname VARCHAR(10) NOT NULL,
     phone VARCHAR(20) NOT NULL,
     email VARCHAR(50) NOT NULL,
     addr VARCHAR(100),
     prodNum INT NOT NULL,
     name VARCHAR(200),
     price NUMERIC(7) NOT NULL,
     quantity NUMERIC(50),
     PRIMARY KEY(orderNum),
     CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES userTBL(id),
     CONSTRAINT fk_nickname FOREIGN KEY(nickname) REFERENCES userTBL(nickname),
     CONSTRAINT fk_phone FOREIGN KEY(phone) REFERENCES userTBL(phone),
     CONSTRAINT fk_email FOREIGN KEY(email) REFERENCES userTBL(email),
     CONSTRAINT fk_addr FOREIGN KEY(addr) REFERENCES userTBL(addr),
     CONSTRAINT fk_prodNum FOREIGN KEY(prodNum) REFERENCES productTBL(prodNum),
     CONSTRAINT fk_name FOREIGN KEY(name) REFERENCES productTBL(name),
     CONSTRAINT fk_price FOREIGN KEY(price) REFERENCES productTBL(price)
);
SELECT * FROM orderTBL;

-- 상품 테이블
CREATE TABLE IF NOT EXISTS productTBL(
     prodNum INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(200) NOT NULL,
     kind CHAR(1)  NOT NULL,
     price NUMERIC(7) NOT NULL,
     content VARCHAR(1000) NOT NULL,
     image VARCHAR(200),
     PRIMARY KEY(prodNum)
);
     CREATE INDEX idx_name ON producttbl (name);
     CREATE INDEX idx_price ON producttbl (price);
SELECT * FROM productTBL;
