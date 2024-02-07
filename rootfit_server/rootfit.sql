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
SELECT * FROM healthlistTBL;
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c9','영양제 챙겨먹기 💊','영양제를 먹는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c10','자기 전 스트레칭 🛏️','자기 전에 스트레칭을 하는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c11','햇볕 10분 쬐기 🌻','햇볕을 10분 쬐는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c12','선크림 꼭 바르기 🌞','선크림을 반드시 바르는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c13','하루 한번 계단 이용 👟','하루에 한번 계단을 이용하는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c14','커피 한잔만 마시기 ☕','하루에 커피를 한잔만 마시는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c15','스쿼트 20개 💃','스쿼트 운동을 20회 하는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c16','버피 20개 🕺','버피 운동을 20회 하는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c17','땀흘리며 운동하기 ⛹️‍♀️','땀을 흘리며 운동하는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c18','6시간 푹 자기 🌓','6시간동안 숙면하는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c1','아침 챙겨먹기 🍚','아침을 먹는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c19','목표 시간에 눕기 🛌','목표한 시간에 수면 준비를 하는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c20','하루 하나 내자신 칭찬하기 🥰','하루에 한번 자신을 칭찬하는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c2','밥 대신 샐러드 🥗','밥 대신 샐러드를 먹는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c3','모닝 스트레칭 🧘','아침에 스트레칭을 하는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c4','공복 유산소 🚴','공복에 유산소 운동을 하는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c5','공복에 물 한잔 💧','공복에 물 한잔 마시는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c6','1L 이상 물 마시기 🐳','1L 이상의 물을 마시는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c7','5000보 걷기 🚶','걸음을 5000보 걷는 행동');
INSERT INTO healthlistTBL (`healthNo`,`healthTitle`,`healthContent`) VALUES ('c8','10000보 걷기 🏃‍♀️','걸음을 10000보 걷는 행동');

-- Health List 누적 데이터 테이블
CREATE TABLE IF NOT EXISTS healthselectTBL(
     healthNo VARCHAR(200) NOT NULL,
     user_id VARCHAR(20),
     createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     healthSelect JSON NOT NULL,
     CONSTRAINT fk_user_id2 FOREIGN KEY(user_id) REFERENCES userTBL(id),
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

INSERT INTO productTBL (`prodNum`,`name`,`kind`,`price`,`content`,`image`) VALUES (1,'닭가슴살 패티','A',2800,'A-11707273343752.jpg','A1707273343755.png');
INSERT INTO productTBL (`prodNum`,`name`,`kind`,`price`,`content`,`image`) VALUES (2,'프로틴 바','A',2000,'A-11707273365299.jpg','A1707273365304.png');
INSERT INTO productTBL (`prodNum`,`name`,`kind`,`price`,`content`,`image`) VALUES (3,'프로틴 파우더','A',38900,'A-11707273385366.jpg','A1707273385369.png');
INSERT INTO productTBL (`prodNum`,`name`,`kind`,`price`,`content`,`image`) VALUES (4,'비타민A','B',18400,'B-11707273409217.jpg','B1707273409222.png');
INSERT INTO productTBL (`prodNum`,`name`,`kind`,`price`,`content`,`image`) VALUES (5,'비타민B','B',27800,'B-11707273425211.jpg','B1707273425215.png');
INSERT INTO productTBL (`prodNum`,`name`,`kind`,`price`,`content`,`image`) VALUES (6,'비타민C','B',19000,'B-11707273444025.jpg','B1707273444031.png');
INSERT INTO productTBL (`prodNum`,`name`,`kind`,`price`,`content`,`image`) VALUES (7,'제로 콜라','C',1200,'C-11707273468163.jpg','C1707273468167.png');
INSERT INTO productTBL (`prodNum`,`name`,`kind`,`price`,`content`,`image`) VALUES (8,'제로 사이다','C',1300,'C-11707273483166.jpg','C1707273483169.png');
INSERT INTO productTBL (`prodNum`,`name`,`kind`,`price`,`content`,`image`) VALUES (9,'저당 사탕','C',3200,'C-11707273516062.jpg','C1707273516066.png');
