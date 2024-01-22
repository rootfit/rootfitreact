-- 회원 테이블
CREATE TABLE IF NOT EXISTS userTBL(
     id VARCHAR(20) NOT NULL,
     password VARCHAR(200) NOT NULL,
     nickname VARCHAR(10) NOT NULL,
     phone VARCHAR(20) NOT NULL,
     email VARCHAR(50) NOT NULL,
     addr VARCHAR(100),
     createAt DATETIME DEFAULT now(),
     isAdmin ENUM NOT NULL DEFULT 'N',
     healthSelect JSON,
     PRIMARY KEY (id)
);

-- 게시글 테이블
CREATE TABLE IF NOT EXISTS boardTBL(
     id INT NOT NULL AUTO_INCREMENT,
     user_id VARCHAR(20) NOT NULL
     createAt DATETIME DEFUALT now(),
     title VARCHAR(100) NOT NULL,
     content TEXT NOT NULL,
     cnt INT DEFUALT '0',
     recent INT DEFUALT '0',
     img VARCHAR(50),
     CONSTRAINT fk_id FOREIGN KEY(id) REFERENCE user(id),
     PRIMARY KEY (id)
);

-- 댓글 테이블
CREATE TABLE IF NOT EXISTS commentTBL(
     id INT NOT NULL AUTO_INCREMENT,
     user_id VARCHAR(20) NOT NULL,
     createAt DATETIME DEFUALT now(),
     board_id INT NOT NULL,
     content TINYTEXT NOT NULL,
     CONSTRAINT fk_id FOREIGN KEY(id) REFERENCE user(id),
     CONSTRAINT fk_id FOREIGN KEY(id) REFERENCE board(id),
     PRIMARY KEY (id)
);

-- Do Health List 테이블
CREATE TABLE IF NOT EXISTS healthlistTBL(
     healthNo VARCHAR(200) NOT NULL,
     healthTitle VARCHAR(20) NOT NULL,
     healthContent VARCHAR(100) NOT NULL,
     PRIMARY KEY (healthNo)
);

-- Do Health List 누적 테이블
CREATE TABLE IF NOT EXISTS healthselectTBL(
     healthNo VARCHAR NOT NULL,
     user_id VARCHAR(20),
     createAt DATE  NOT NULL DEFAULT now(),
     healthSelect JSON NOT NULL,
     CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCE user(id),
     PRIMARY KEY (healthNo)
);

-- 장바구니 테이블
CREATE TABLE IF NOT EXISTS cartTbl(
     cartNum INT NOT NULL AUTO_INCREMENT,
     id VARCHAR NOT NULL,
     prodNum NUMERIC NOT NULL,
     quantity NUMERIC NOT NULL,
     indate DATETIME NULL DEFAULT now(),
     PRIMARY KEY(cartNum),
     CONSTRAINT fk_id FOREIGN KEY(id) REFERENCE user(id),
     CONSTRAINT fk_prodNum FOREIGN KEY(prodNum) REFERENCE product(prodNum)
);

-- 주문 테이블
CREATE TABLE IF NOT EXISTS orderTBL(
     orderNum INT NOT NULL AUTO_INCREMENT,
     id VARCHAR NOT NULL,
     indate DATETIME NULL DEFAULT now(),
     prodNum INT NOT NULL AUTO_INCREMENT,
     quantity INT NOT NULL AUTO_INCREMENT,
     result CHAR(1) DEFAUTL 1,
     PRIMARY KEY(orderNum),
     CONSTRAINT fk_id FOREIGN KEY(id) REFERENCE user(id),
     CONSTRAINT fk_prodNum FOREIGN KEY(prodNum) REFERENCE product(prodNum))

CREATE SEQUENCE order_seq START WITH 1 INCREMENT BY 1;

-- 상품 테이블
CREATE TABLE IF NOT EXISTS productTBL(
     prodNum INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(200) NOT NULL,
     kind CHAR(1)  NOT NULL,
     price NUMERIC(7) NOT NULL,
     content VARCHAR(1000) NOT NULL,
     image VARCHAR DEFAULT ‘default.jpg’ NOT NULL,
     useYn CHAR DEFAULT ‘y’,
     PRIMARY KEY(prodNum)
);

