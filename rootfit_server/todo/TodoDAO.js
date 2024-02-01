const getPool = require('../common/pool');

const sql = {
  healthList: 'SELECT * FROM healthlistTBL',
  // 테스트용 insert (현재 이걸로 사용)
  insertSelect: 'INSERT INTO healthselectTBL (healthNo, user_id, healthSelect) VALUES (?, ?, ?);',
  // 실사용 (사용X)
  // healthSelectInsert:
  //   'INSERT INTO healthselectTBL (user_id, healthSelect) VALUES (?, ?)',

  // 아래는 임시 봉인!!!!
  // 테스트용 update
  // updateSelect: 'UPDATE userTBL SET healthSelect = ? WHERE id = "kim";',
  // 실사용 update
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
      console.log('healthlist callback 완료');
      callback({ status: 200, message: 'OK', data: resp });
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'healthlist callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 유저의 누적 데이터를 저장
  insertselect: async (data, callback) => {
    const jsonData = JSON.stringify(data);
    const jsonList = { healthNo: 's6', user_id: 'hong', healthSelect: jsonData }; // healthNo와 user_id는 임시값. healthNo는 수동으로 계속 바꿔줘야 함.
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

  // 유저가 선택한 헬스리스트를 업데이트 (임시 봉인)
  // updateselect: async (data, callback) => {
  //   let conn = null;
  //   try {
  //     console.log('updateselect try 시작...');
  //     console.log('update', item);
  //     conn = await getPool().getConnection();
  //     const [resp] = await conn.query(sql.updateSelect, data.healthSelect);
  //     console.log('resp', resp);
  //     console.log('updateselect callback 완료');
  //     callback({ status: 200, message: 'OK' });
  //   } catch (error) {
  //     console.log(error.message);
  //     return { status: 500, message: 'updateselect callback 실패', error: error };
  //   } finally {
  //     if (conn !== null) conn.release();
  //   }
  // },
};

module.exports = todoDAO;
