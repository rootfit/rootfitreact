const getPool = require('../common/pool');

// SQL 쿼리 정의
const sql = {
  getAllOrders: 'SELECT * FROM productTBL WHERE prodNum = ?',  // 특정 주문 번호로 주문 조회
  addOrder: 'INSERT INTO orderTBL (id, prodNum, name, email, nickname, addr, phone, price, quantity) values (?, ?, ?, ?, ?, ?, ?, ?, ?)'  // 주문 추가
};


const OrderDAO = {
  // 모든 주문 조회
  getAllOrders: async (prodNum, callback) => {
    let conn = null;
    try {
      const pool = getPool();
      console.log('0'); // 로그 추가

      conn = await pool.getConnection();
      console.log('1'); // 연결 얻음을 확인

      const [results] = await conn.query(sql.getAllOrders, [prodNum]);
      console.log('Query results:', results); // 쿼리 결과 확인
      callback({ status: 200, message: 'OK', data: results });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '주문 불러오기 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      console.log('2'); // 연결 해제 확인
    }
  },

  // 주문상품 DB 추가
  addOrder: async (id, prodNum, name, email, nickname, addr, phone, price, quantity, callback) => {
    let conn = null;
    try {
      const pool = getPool();
      console.log('000'); // 로그 추가

      conn = await pool.getConnection();
      console.log('111'); // 연결 얻음을 확인

      const [results] = await conn.query(sql.addOrder, [id, prodNum, name, email, nickname, addr, phone, price, quantity]);

      console.log('222', results);
      callback({ status: 200, message: 'OK', data: results });
    } catch (error) {
      console.error('Error executing addOrder query:', error);
      callback({ status: 500, message: '상품 추가 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      console.log('Connection released');
    }
  },



};

module.exports = OrderDAO;