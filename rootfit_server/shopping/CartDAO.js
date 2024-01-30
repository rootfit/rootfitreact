const getPool = require('../common/pool');

const sql = {
  getAllItemsInCart: 'SELECT * FROM cartTBL WHERE id = ?',
  addItemToCart: 'INSERT INTO cartTBL (id, prodNum, quantity) VALUES (?, ?, ?)',
  removeItemFromCart: 'DELETE FROM cartTBL WHERE cartNum = ?'
}


const CartDAO = {
  // 사용자의 장바구니에 있는 모든 상품 가져오기
  getAllItemsInCart: async (id, callback) => {
    let conn = null;
    try {
 const pool = getPool(); // 풀을 먼저 얻어오고
      console.log('0000'); // 로그 추가

      conn = await pool.getConnection();
      console.log('1111'); // 연결 얻음을 확인

 // 여기서 userTBL과 productTBL에 해당 id와 prodNum이 존재하는지 확인하는 로직이 필요
 // 생략된 부분이며, 실제 프로덕션 코드에서는 적절한 에러 처리와 함께 로직을 추가

      const [results] = await conn.query(sql.getAllItemsInCart, [id]);
      console.log('Query results:', results); // 쿼리 결과 확인
      callback({ status: 200, message: 'OK', data: results });
    } catch (error) {
      callback({ status: 500, message: '장바구니 목록 가져오기 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      console.log('2222'); // 연결 해제 확인
    }
  },

  // 장바구니에 상품 추가
  addItemToCart: async (id, prodNum, quantity, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      await conn.query(sql.addItemToCart, [id, prodNum, quantity]);
      callback({ status: 200, message: 'OK' });
    } catch (error) {
      callback({ status: 500, message: '장바구니에 상품 추가 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 장바구니에서 상품 삭제
  removeItemFromCart: async (cartNum, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      await conn.query(sql.removeItemFromCart, [cartNum]);
      callback({ status: 200, message: 'OK' });
    } catch (error) {
      callback({ status: 500, message: '장바구니에서 상품 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  }
};

module.exports = CartDAO;