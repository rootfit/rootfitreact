const getPool = require('../common/pool');

const sql = {
  // todoreport test용 sql문 간단 예시
  healthList: 'SELECT * FROM healthlisttbl',
};

const todoDAO = {
  healthlist: async (callback) => {
    let conn = null;
    try {
      console.log('healthlist try 시작...');
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.healthList, []);
      console.log(resp);
      console.log('healthlist callback 완료');
      callback({ status: 200, message: 'OK', data: resp });
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'healthlist callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = todoDAO;
