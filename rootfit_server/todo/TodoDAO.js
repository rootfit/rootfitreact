const getPool = require('../common/pool');

const sql = {
  // 헬스리스트 목록 불러오기
  healthList: 'SELECT * FROM healthlistTBL;',

  // 유저 누적 데이터 중 당일 healthSelect만 불러오기
  loadOnlySelect:
    'SELECT healthSelect FROM healthselectTBL WHERE user_id = ? AND datediff(createAT, now()) = 0;',

  // 유저 누적 데이터 중 연도가 같은 데이터만 불러오기
  loadSameYear:
    'SELECT createAt, healthSelect FROM healthselectTBL WHERE user_id = ? AND createAT BETWEEN ? AND now();',

  // 유저 누적 데이터 최초 저장하기
  insertSelect: 'INSERT INTO healthselectTBL (healthNo, user_id, healthSelect) VALUES (?, ?, ?);',

  // 유저 누적 데이터 업데이트 하기
  updateOnlySelect:
    'UPDATE healthselectTBL SET healthSelect = ? WHERE user_id = ? AND datediff(createAT, now()) = 0;',

  // ❌아래는 사용 안 되는 중❌
  // 테스트용 당일 유저 누적 데이터 전체 불러오기
  // loadAllSelect: 'SELECT * FROM healthselectTBL WHERE user_id = ?;',
  // 실사용 당일 누적 데이터 전체 불러오기
  // loadAllSelect: 'SELECT * FROM healthselectTBL WHERE id = ? AND datediff(createAT, now()) = 0;',
};

const todoDAO = {
  // loadSelect: 누적 데이터 중 유저가 저장한 헬스리스트 제목만 불러옴.
  loadselect: async (item, callback) => {
    let conn = null;
    try {
      console.log('loadselect try 시작...');
      conn = await getPool().getConnection();
      // resp: 누적 데이터 db에서 유저의 데이터를 바탕으로 누적 데이터 불러옴.
      const [resp] = await conn.query(sql.loadOnlySelect, [item.id]);

      if (resp.length === 0) {
        console.log('누적 데이터 없습니다!!!');
        const emptyList = [
          { healthTitle: '' },
          { healthTitle: '' },
          { healthTitle: '' },
          { healthTitle: '' },
          { healthTitle: '' },
        ];
        callback({ status: 205, message: '저장된 데이터가 없습니다.', data: emptyList });
        console.log('loadselect callback 완료');
      } else {
        console.log('누적 데이터 있습니다!!!');
        // selectKeys: 누적 데이터 중에서 'c1', 'c2' 등 key값만 불러옴.
        const selectKeys = Object.keys(resp[0].healthSelect);
        // selectValues: 누적 데이터 중에서 'true', 'false' 등 value값만 불러옴.
        const selectValues = Object.values(resp[0].healthSelect);
        // selectAll: 누적 데이터 중에서 healthSelect만 불러옴.
        const selectAll = [];
        selectKeys.forEach((item, index) => {
          let newList = {};
          newList['healthNo'] = item;
          newList['isSueccess'] = selectValues[index];
          selectAll.push(newList);
        });

        // titleSql: key값을 바탕으로 healthlistTBL에서 healthTitle을 불러옴.
        let titleSql = `SELECT healthTitle FROM healthlistTBL WHERE healthNo IN (`;
        selectKeys.forEach((item, index) => {
          titleSql += "'" + item + "'";
          if (index < selectKeys.length - 1) titleSql += ',';
        });
        titleSql += `)`;
        const [titlelist] = await conn.query(titleSql);

        const dataList = [selectAll, selectKeys, selectValues, titlelist];
        // console.log('dataList', dataList);
        callback({ status: 200, message: '저장된 데이터를 불러왔습니다.', data: dataList });
        console.log('loadselect callback 완료');
      }
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'loadselect callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
      conn.release(); // 커넥션을 풀에 반환
      conn.destroy(); // 커넥션을 완전히 닫음
      console.log('연결 해제'); // 연결 해제 확인
    }
  },

  // healthlist: 모달창을 열면 admin이 작성한 헬스리스트 목록 20개를 출력함.
  healthlist: async (callback) => {
    let conn = null;
    try {
      console.log('healthlist try 시작...');
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.healthList, {});
      // console.log('healthlist', resp);
      callback({ status: 200, message: '헬스리스트 목록을 불러왔습니다.', data: resp });
      console.log('healthlist callback 완료');
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'healthlist callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
      conn.release(); // 커넥션을 풀에 반환
      conn.destroy(); // 커넥션을 완전히 닫음
      console.log('연결 해제'); // 연결 해제 확인
    }
  },

  // insertselect: 유저가 모달창에서 선택해서 저장한 데이터를 누적 데이터 db에 저장
  insertselect: async (data, callback) => {
    let conn = null;
    try {
      console.log('insertselect try 시작...');
      conn = await getPool().getConnection();
      const user_id = data.id;
      delete data.id;
      const jsonData = JSON.stringify(data);
      // console.log('insertselect jsonData', jsonData);
      const todayDate = `${Date.now()}`;
      const columnData = 's' + user_id + todayDate;
      const jsonList = { healthNo: columnData, user_id: user_id, healthSelect: jsonData };
      // console.log('insertselect jsonList', jsonList);
      const [resp] = await conn.query(sql.insertSelect, [
        jsonList.healthNo,
        jsonList.user_id,
        jsonList.healthSelect,
      ]);
      console.log('resp', resp);
      callback({ status: 200, message: '헬스리스트가 누적 테이블에 저장되었습니다.' });
      console.log('insertselect callback 완료');
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'insertselect callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
      conn.release(); // 커넥션을 풀에 반환
      conn.destroy(); // 커넥션을 완전히 닫음
      console.log('연결 해제'); // 연결 해제 확인
    }
  },

  // updateselect: 유저가 선택한 헬스리스트를 업데이트
  updateselect: async (data, callback) => {
    let conn = null;
    try {
      console.log('updateselect try 시작...');
      conn = await getPool().getConnection();
      const user_id = data.id;
      delete data.id;
      const jsonData = JSON.stringify(data);
      // console.log('updateselect jsonData', jsonData);
      const jsonList = { healthSelect: jsonData, user_id: user_id };
      // console.log('updateselect jsonList', jsonList);
      const [resp] = await conn.query(sql.updateOnlySelect, [
        jsonList.healthSelect,
        jsonList.user_id,
      ]);
      callback({ status: 200, message: '헬스리스트가 누적 테이블에 업데이트 되었습니다.' });
      console.log('updateselect callback 완료');
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'updateselect callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
      conn.release(); // 커넥션을 풀에 반환
      conn.destroy(); // 커넥션을 완전히 닫음
      console.log('연결 해제'); // 연결 해제 확인
    }
  },

  // updatesuccess: 유저의 달성도를 업데이트
  updatesuccess: async (data, callback) => {
    let conn = null;
    try {
      console.log('updatesuccess try 시작...');
      conn = await getPool().getConnection();
      const user_id = data.id;
      delete data.id;
      // console.log('updatesuccess data', data);
      const jsonData = JSON.stringify(data);
      const jsonList = { healthSelect: jsonData, user_id: user_id };
      // console.log('updatesuccess jsonList', jsonList);
      const [resp] = await conn.query(sql.updateOnlySelect, [
        jsonList.healthSelect,
        jsonList.user_id,
      ]);
      callback({ status: 200, message: '달성도가 누적 테이블에 업데이트 되었습니다.' });
      console.log('updatesuccess callback 완료');
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'updatesuccess callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
      conn.release(); // 커넥션을 풀에 반환
      conn.destroy(); // 커넥션을 완전히 닫음
      console.log('연결 해제'); // 연결 해제 확인
    }
  },

  // loadyear: 유저의 1년 달성도를 불러옴
  loadayear: async (data, callback) => {
    let conn = null;
    try {
      console.log('loadyear try 시작...');
      conn = await getPool().getConnection();
      console.log('loadayear data', data);
      const [resp] = await conn.query(sql.loadSameYear, [data[0], data[1]]);
      console.log('loadayear resp', resp);

      // resultList: 전체 캘린터에 반영될 데이터
      const resultList = [];
      resp.forEach((item, index) => {
        let newList = {};
        // 첫번째 데이터
        const createYear = item['createAt'];
        const year = createYear.getFullYear();
        let month = createYear.getMonth() + 1;
        if (month <= 9) {
          month = '0' + `${month}`;
        }
        let date = createYear.getDate();
        if (date <= 9) {
          date = '0' + `${date}`;
        }
        const day = `${year}-${month}-${date}`;
        // 두번째 데이터
        const successPercent = item['healthSelect']['successPercent'];

        newList['value'] = successPercent;
        newList['day'] = day;

        resultList.push(newList);
      });
      callback({ status: 200, message: '1년 달성도가 로드 되었습니다.', data: resultList });
      console.log('loadyear callback 완료');
    } catch (error) {
      console.log(error.message);
      return { status: 500, message: 'loadyear callback 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
      conn.release(); // 커넥션을 풀에 반환
      conn.destroy(); // 커넥션을 완전히 닫음
      console.log('연결 해제'); // 연결 해제 확인
    }
  },
};

module.exports = todoDAO;
