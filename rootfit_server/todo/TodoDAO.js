const getPool = require('../common/pool');

const sql = {
  healthList: 'SELECT * FROM healthlistTBL',

  // 테스트용 insert (현재 이걸로 사용)
  insertSelect: 'INSERT INTO healthselectTBL (healthNo, user_id, healthSelect) VALUES (?, ?, ?);',
  // 실사용 insert (사용X)
  // healthSelectInsert:
  //   'INSERT INTO healthselectTBL (user_id, healthSelect) VALUES (?, ?)',

  // 테스트용 누적 데이터 불러오기
  selectList:
    'SELECT * FROM healthselectTBL WHERE user_id = "ha" AND datediff(createAT, now()) = 0;',
  // 실사용 누적 데이터 불러오기
  // selectList: 'SELECT * FROM healthselectTBL WHERE id = ? AND datediff(createAT, now()) = 0;',

  // 테스트용 유저 데이터 불러오기
  loadList: 'SELECT healthSelect FROM userTBL WHERE id = "kim";',
  // 실사용 유저 데이터 불러오기
  // loadList: 'SELECT * FROM healthselectTBL WHERE id = ?;',

  // 테스트용 유저 update
  updateSelect: 'UPDATE userTBL SET healthSelect = ? WHERE id = "kim";',
  // 실사용 유저 update
  // healthSelect: 'UPDATE userTBL SET healthSelect = ? WHERE id = ?;',
};

const todoDAO = {
  // 유저에게 admin이 작성한 헬스리스트 목록을 보냄
  healthlist: async (callback) => {
    let conn = null;
    try {
      console.log('healthlist try 시작...');
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.healthList, {});
      // console.log(resp);
      console.log('healthlist callback 완료');
      callback({ status: 200, message: 'OK', data: resp });
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'healthlist callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 유저가 선택한 헬스리스트를 업데이트
  updateselect: async (data, callback) => {
    const jsonData = JSON.stringify(data);
    const jsonList = { healthSelect: jsonData };
    let conn = null;
    try {
      console.log('updateselect try 시작...');
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.updateSelect, [jsonList.healthSelect]);
      console.log('updateselect callback 완료');
      callback({ status: 200, message: 'OK' });
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'updateselect callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 유저의 누적 데이터를 저장
  insertselect: async (data, callback) => {
    const jsonData = JSON.stringify(data);
    const jsonList = { healthNo: 's7', user_id: 'hong', healthSelect: jsonData }; // healthNo와 user_id는 임시값. healthNo는 수동으로 계속 바꿔줘야 함.
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.insertSelect, [
        jsonList.healthNo,
        jsonList.user_id,
        jsonList.healthSelect,
      ]);
      console.log('insertselect callback 완료');
      callback({ status: 200, message: '헬스리스트가 누적 테이블에 저장되었습니다.' });
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'insertselect callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 헬스리스트 메인 화면에 나가는 데이터
  loadlist: async (callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.loadList, []);
      const data = Object.values(resp[0].healthSelect);
      console.log('loadlist callback 완료');
      callback({ status: 200, message: '회원 테이블을 불러왔습니다.', data: data });
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'loadlist callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = todoDAO;
