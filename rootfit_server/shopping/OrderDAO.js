const getPool = require('../common/pool');

// SQL 쿼리 정의
const sql = {
  getAllOrders: 'SELECT * FROM orderTBL',  // 모든 주문 조회
  getOrderById: 'SELECT * FROM orderTBL WHERE orderNum = ?',  // 특정 주문 번호로 주문 조회
  addOrder: 'INSERT INTO orderTBL SET ?',  // 주문 추가
  updateOrder: 'UPDATE orderTBL SET ? WHERE orderNum = ?',  // 주문 수정
  deleteOrder: 'DELETE FROM orderTBL WHERE orderNum = ?',  // 주문 삭제
  getOrderProducts: 'SELECT p.prodNum, p.name AS prodName, p.price, op.quantity FROM productTBL p JOIN orderTBL o ON p.prodNum = o.prodNum JOIN orderProductTBL op ON o.orderNum = op.orderNum WHERE o.orderNum = ?'

};


const OrderDAO = {
  // 모든 주문 조회
  getAllOrders: async (callback) => {
    let conn = null;
    try {
      const pool = getPool();
      console.log('0'); // 로그 추가

      conn = await pool.getConnection();
      console.log('1'); // 연결 얻음을 확인

      const [results] = await conn.query('SELECT * FROM orderTBL');
      console.log('Query results:', results); // 쿼리 결과 확인
      callback( { status: 200, message: 'OK', data: results });
    } catch (error) {
      console.error(error);
      callback( { status: 500, message: '주문 불러오기 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      console.log('2'); // 연결 해제 확인
    }
  },

  // 특정 주문 번호로 주문 조회
  getOrderById: async (orderNum, callback) => {
    let conn = null;
    try {
      const pool = getPool();
      console.log('00'); // 로그 추가

      conn = await pool.getConnection();
      console.log('11'); // 연결 얻음을 확인

      const [results] = await conn.query('SELECT * FROM orderTBL WHERE orderNum = ?', [orderNum]);
      console.log('Query results:', results); // 쿼리 결과 확인
      callback({ status: 200, message: 'OK', data: results[0] });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '주문 불러오기 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      console.log('22'); // 연결 해제 확인
    }
  },

  // 주문 추가
  addOrder: async (orderData, callback) => {
    let conn = null;
    try {
      const pool = getPool();
      console.log('000'); // 로그 추가

      conn = await pool.getConnection();
      console.log('111'); // 연결 얻음을 확인

      const [results] = await conn.query('INSERT INTO orderTBL SET ?', orderData);
      console.log('Query results:', results); // 쿼리 결과 확인
      callback({ status: 200, message: 'OK', data: results.insertId });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '주문 추가 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      console.log('222'); // 연결 해제 확인
    }
  },

  // 주문 수정
  updateOrder: async (orderNum, updatedOrder, callback) => {
    let conn = null;
    try {
      const pool = getPool();
      console.log('0000'); // 로그 추가

      conn = await pool.getConnection();
      console.log('1111'); // 연결 얻음을 확인

      const [results] = await conn.query('UPDATE orderTBL SET ? WHERE orderNum = ?', [updatedOrder, orderNum]);
      console.log('Query results:', results); // 쿼리 결과 확인
      callback({ status: 200, message: 'OK', data: results });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '주문 수정 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      console.log('2222'); // 연결 해제 확인
    }
  },

  // 주문 삭제
  deleteOrder: async (orderNum, callback) => {
    let conn = null;
    try {
      const pool = getPool();
      console.log('00000'); // 로그 추가

      conn = await pool.getConnection();
      console.log('11111'); // 연결 얻음을 확인

      const [results] = await conn.query('DELETE FROM orderTBL WHERE orderNum = ?', [orderNum]);
      console.log('Query results:', results); // 쿼리 결과 확인
      callback({ status: 200, message: 'OK', data: results });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '주문 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      console.log('22222'); // 연결 해제 확인
    }
  },

  // 주문에 속한 상품 조회
  getOrderProducts: async (orderNum, callback) => {
    let conn = null;
    try {
      const pool = getPool();
      console.log('000000'); // 로그 추가

      conn = await pool.getConnection();
      console.log('111111'); // 연결 얻음을 확인

      const [results] = await conn.query('SELECT p.prodNum, p.name AS prodName, p.price, op.quantity FROM productTBL p JOIN orderTBL o ON p.prodNum = o.prodNum JOIN orderProductTBL op ON o.orderNum = op.orderNum WHERE o.orderNum = ?', [orderNum]);
      console.log('Query results:', results); // 쿼리 결과 확인
      callback({ status: 200, message: 'OK', data: results });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '주문 상품 조회 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      console.log('222222'); // 연결 해제 확인
    }
  },
};

module.exports = OrderDAO;