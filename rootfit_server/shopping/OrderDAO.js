const getPool = require('../common/pool');

// SQL 쿼리 정의
const sql = {
  getAllOrders: 'SELECT * FROM productTBL WHERE prodNum = ?',  // 특정 주문 번호로 주문 조회
  getUsers: 'SELECT * FROM userTBL WHERE id = ? AND nickname = ? AND email = ? AND addr = ? AND phone = ?',
  addOrder: 'INSERT INTO orderTBL orderTBL (quantity) values (?)'  // 주문 추가
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

  getUsers: async ({id, nickname, email, addr, phone,}, callback) => {
    let conn = null;
    try {
      const pool = getPool();
      console.log('00'); // 로그 추가

      conn = await pool.getConnection();
      console.log('11'); // 연결 얻음을 확인

      const [results] = await conn.query(sql.getUsers, [id, nickname, email, addr, phone])
      console.log('Query results:', results); // 쿼리 결과확인
      callback({ status: 200, message: 'OK', data: results })

    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '주문 불러오기 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      console.log('2'); // 연결 해제 확인
    }
  },

  // // 주문 추가
  // addOrder: async (orderData, callback) => {
  //   let conn = null;
  //   try {
  //     const pool = getPool();
  //     console.log('000'); // 로그 추가

  //     conn = await pool.getConnection();
  //     console.log('111'); // 연결 얻음을 확인

  //     const [results] = await conn.query('INSERT INTO orderTBL orderTBL (quantity) values (?)', orderData);
  //     console.log('Query results:', results); // 쿼리 결과 확인
  //     callback({ status: 200, message: 'OK', data: results.insertId });
  //   } catch (error) {
  //     console.error(error);
  //     callback({ status: 500, message: '주문 추가 실패', error: error });
  //   } finally {
  //     if (conn !== null) conn.release();
  //     console.log('222'); // 연결 해제 확인
  //   }
  // },

};

module.exports = OrderDAO;