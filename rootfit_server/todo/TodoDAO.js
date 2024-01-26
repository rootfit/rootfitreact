const getPool = require('../common/pool');

const sql = {
  // todoreport test용 sql문 간단 예시
  healthList: 'SELECT * FROM healthlistTBL',
  healthSelect: 'INSERT INTO userTBL () VALUES (?)',
  healthSelectInsert:
    'INSERT INTO healthselectTBL (healthNo, user_id, healthSelect) VALUES (?, ?, ?)',
};

const todoDAO = {
  // 유저에게 admin이 작성한 헬스리스트 목록을 보냄
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
  // 유저가 선택한 헬스리스트를 저장

  // 유저의 누적 데이터를 저장 (작업중)
  healthselectinsert: async (list, callback) => {
    let conn = null;
    try {
      console.log('healthselectinsert try 시작...');
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.healthSelectInsert, [
        list.healthNo,
        list.user_id,
        list.healthSelect,
      ]);
      console.log(resp);
      console.log('healthselectinsert callback 완료');
      callback({ status: 200, message: '헬스리스트가 누적 테이블에 저장되었습니다.', data: resp });
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'healthselectinsert callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = todoDAO;
