
-- 장바구니 테이블
CREATE TABLE IF NOT EXISTS cartTbl(
     cartNum INT NOT NULL AUTO_INCREMENT,
     id VARCHAR(20) NOT NULL,
     prodNum NUMERIC NOT NULL,
     quantity NUMERIC NOT NULL,
     indate DATETIME NULL DEFAULT now(),
     PRIMARY KEY(cartNum)
);

-- 주문 테이블
CREATE TABLE IF NOT EXISTS orderTBL(
     orderNum INT NOT NULL AUTO_INCREMENT,
     id VARCHAR(20) NOT NULL,
     indate DATETIME NULL DEFAULT now(),
     prodNum INT NOT NULL AUTO_INCREMENT,
     quantity INT NOT NULL AUTO_INCREMENT,
     result CHAR(1) DEFAULT 1,
     PRIMARY KEY(orderNum)
);

-- 상품 테이블
CREATE TABLE IF NOT EXISTS productTBL(
     prodNum INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(200) NOT NULL,
     kind CHAR(1)  NOT NULL,
     price NUMERIC(7) NOT NULL,
     content VARCHAR(1000) NOT NULL,
     image VARCHAR(20),
     PRIMARY KEY(prodNum)
);

SELECT * FROM productTBL