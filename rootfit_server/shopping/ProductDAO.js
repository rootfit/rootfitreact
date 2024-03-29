const getPool = require('../common/pool');

const sql = {
  getAllProducts: 'SELECT * FROM productTBL',
  getProductById: 'SELECT * FROM productTBL WHERE prodNum = ?',
  addProduct: 'INSERT INTO productTBL (name, kind, price, content, image) values (?,?,?,?,?)',
  getHomeProducts: 'SELECT * FROM productTBL',
  // updateProduct: 'UPDATE productTBL SET ? WHERE prodNum = ?',
  // deleteProduct: 'DELETE FROM productTBL WHERE prodNum = ?'
}


const ProductDAO = {
  // 필터적용 상품 목록 가져오기
  getAllProducts: async (filter, callback) => {
    let conn = null;
    try {
      const pool = getPool(); // 풀을 먼저 얻어오고
      console.log('0000'); // 로그 추가

      conn = await pool.getConnection();
      console.log('1111'); // 연결 얻음을 확인

      let sql = 'SELECT * FROM productTBL'
      if (filter !== "*") {
        sql += ' WHERE kind = "' + filter + '"'
      }
      console.log("sql", sql)
      // const [results] = await conn.query('SELECT * FROM productTBL'); <--- 전체불러오기 복기용
      const [results] = await conn.query(sql);
      // console.log('Query results:', results); // 쿼리 결과 확인 <--- DB가 뭐 넘겨주는지 확인용
      callback({ status: 200, message: 'productOK', data: results });
    } catch (error) {
      console.log(error)
      callback({ status: 500, message: '상품 불러오기 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      conn.release(); // 커넥션을 풀에 반환
      conn.destroy(); // 커넥션을 완전히 닫음
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
      conn.release(); // 커넥션을 풀에 반환
      conn.destroy(); // 커넥션을 완전히 닫음
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


    // 메인페이지 상품 목록 가져오기
    getHomeProducts: async (callback) => {
      let conn = null;
      try {
        const pool = getPool(); // 풀을 먼저 얻어오고
        console.log('00000'); // 로그 추가
  
        conn = await pool.getConnection();
        console.log('11111'); // 연결 얻음을 확인
        const [results] = await conn.query('SELECT * FROM productTBL');  
        callback({ status: 200, message: 'productOK2', data: results });
        // console.log('Query results:', results); // 쿼리 결과 확인 <--- DB가 뭐 넘겨주는지 확인용
        }catch (error) {
        console.log(error)
        callback({ status: 500, message: '상품 불러오기 실패', error: error });
      } finally {
        if (conn !== null) conn.release();
        conn.release(); // 커넥션을 풀에 반환
        conn.destroy(); // 커넥션을 완전히 닫음
        console.log('2222'); // 연결 해제 확인
      }
    },

  // // 상품 수정
  // updateProduct: async (prodNum, updatedProduct, callback) => {
  //   let conn = null;
  //   try {
  //     conn = await getPool().getConnection();
  //     const [results] = await conn.query(sql.updateProduct, [updatedProduct, prodNum]);
  //     callback({ status: 200, message: 'OK', data: results });
  //     console.log('333', results);
  //   } catch (error) {
  //     callback({ status: 500, message: '상품 수정 실패', error: error });
  //   } finally {
  //     if (conn !== null) conn.release();
  //   }
  // },

  // // 상품 삭제
  // deleteProduct: async (prodNum, callback) => {
  //   let conn = null;
  //   try {
  //     conn = await getPool().getConnection();
  //     const [results] = await conn.query(sql.deleteProduct, [prodNum]);
  //     callback({ status: 200, message: 'OK', data: results });
  //     console.log('444', results);
  //   } catch (error) {
  //     callback({ status: 500, message: '상품 삭제 실패', error: error });
  //   } finally {
  //     if (conn !== null) conn.release();
  //   }
  // }
};

module.exports = ProductDAO;