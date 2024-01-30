const getPool = require('../common/pool');

const sql = {
  getAllProducts: 'SELECT * FROM productTBL',
  getProductById: 'SELECT * FROM productTBL WHERE prodNum = ?',
  addProduct: 'INSERT INTO productTBL (name, kind, price, content, image) values (?,?,?,?,?)',
  updateProduct: 'UPDATE productTBL SET ? WHERE prodNum = ?',
  deleteProduct: 'DELETE FROM productTBL WHERE prodNum = ?'
}


const ProductDAO = {
  // 모든 상품 목록 가져오기
  getAllProducts: async (callback) => {
    let conn = null;
    try {
      const pool = getPool(); // 풀을 먼저 얻어오고
      console.log('0000'); // 로그 추가

      conn = await pool.getConnection();
      console.log('1111'); // 연결 얻음을 확인

      const [results] = await conn.query('SELECT * FROM productTBL');
      console.log('Query results:', results); // 쿼리 결과 확인
      callback({ status: 200, message: 'productOK', data: results });
    } catch (error) {
      console.log(error)
      callback({ status: 500, message: '상품 불러오기 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      console.log('2222'); // 연결 해제 확인
    }
  },

  // 특정 상품 가져오기
  getProductById: async (prodNum, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [results] = await conn.query(sql.getProductById, [prodNum]);
      console.log('111', results);
      callback({ status: 200, message: 'OK', data: results[0] });
    } catch (error) {
      callback({ status: 500, message: '상품 불러오기 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 상품 추가
  addProduct: async (name, kind, price, content, fileName, callback) => {
    let conn = null;
    try {
      const pool = getPool();
      console.log('0'); // 로그 추가

      conn = await pool.getConnection();
      console.log('1'); // 연결 얻음을 확인
       
      const [results] = await conn.query(sql.addProduct, [name, kind, price, content, fileName]);
      
      console.log('222', results);
      callback({ status: 200, message: 'OK', data: results });
    } catch (error) {
      console.error('Error executing addProduct query:', error);
      callback({ status: 500, message: '상품 추가 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 상품 수정
  updateProduct: async (prodNum, updatedProduct, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [results] = await conn.query(sql.updateProduct, [updatedProduct, prodNum]);
      callback({ status: 200, message: 'OK', data: results });
      console.log('333', results);
    } catch (error) {
      callback({ status: 500, message: '상품 수정 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 상품 삭제
  deleteProduct: async (prodNum, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [results] = await conn.query(sql.deleteProduct, [prodNum]);
      callback({ status: 200, message: 'OK', data: results });
      console.log('444', results);
    } catch (error) {
      callback({ status: 500, message: '상품 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  }
};

module.exports = ProductDAO;