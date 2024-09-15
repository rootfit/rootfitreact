const getPool = require('../common/pool');

const sql = {
  // 헬스리스트 목록 불러오기
  healthList: 'SELECT * FROM healthlistTBL;',

  // 유저 누적 데이터 중 당일 healthSelect만 불러오기
  loadTodaySelect:
    'SELECT healthSelect FROM healthselectTBL WHERE user_id = ? AND datediff(createAT, now()) = 0;',

  // 유저 누적 데이터 중 연도가 같은 데이터만 불러오기
  loadSameYear:
    'SELECT createAt, healthSelect FROM healthselectTBL WHERE user_id = ? AND createAT BETWEEN ? AND now();',

  // 유저 누적 데이터 최초 저장하기
  insertSelect: 'INSERT INTO healthselectTBL (healthNo, user_id, healthSelect) VALUES (?, ?, ?);',

  // 유저 누적 데이터 업데이트 하기
  updateOnlySelect:
    'UPDATE healthselectTBL SET healthSelect = ? WHERE user_id = ? AND datediff(createAT, now()) = 0;',
};

const todoDAO = {
  // healthlist: admin이 작성한 헬스리스트 목록을 호출
  healthlist: async (callback) => {
    let conn = null;
    try {
      console.log('healthlist try 시작...');
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.healthList, {});
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

  // loadSelect: 누적 데이터 중 유저가 당일 저장한 데이터를 호출
  loadselect: async (item, callback) => {
    console.log('load', item);

    let conn = null;
    try {
      console.log('loadselect try 시작...');
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.loadTodaySelect, item);
      console.log(resp);

      if (resp.length === 0) {
        console.log('누적 데이터 없습니다!!!');
        callback({ status: 205, message: '저장된 데이터가 없습니다.' });
        console.log('loadselect callback 완료');
      } else {
        console.log('누적 데이터 있습니다!!!');
        callback({ status: 200, message: '저장된 데이터를 불러왔습니다.', data: resp });
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

  // loadyear: 유저의 올해 1년 데이터 호출
  loadayear: async (data, callback) => {
    let conn = null;
    try {
      console.log('loadyear try 시작...');
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.loadSameYear, [data[0], data[1]]);
      // console.log('loadayear resp', resp);

      // resultList: 전체 캘린터에 반영될 데이터
      const resultList = [];
      resp.forEach((item, index) => {
        let newList = {};

        // 첫번째 데이터
        let createYear = item['createAt'];
        let year = createYear.getFullYear();
        let month = createYear.getMonth() + 1;
        if (month <= 9) {
          month = '0' + `${month}`;
        }
        let date = createYear.getDate();
        if (date <= 9) {
          date = '0' + `${date}`;
        }
        let calendar = `${year}-${month}-${date}`;

        // 두번째 데이터
        const successPercent = item['healthSelect']['successPercent'];

        newList['value'] = successPercent;
        newList['calendar'] = calendar;
        newList['year'] = year;
        newList['month'] = createYear.getMonth() + 1;
        newList['date'] = createYear.getDate();
        newList['day'] = createYear.getDay();

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

  // insertselect: 유저가 모달창에서 선택해서 저장한 데이터를 누적 데이터 db에 저장
  insertselect: async (data, callback) => {
    let conn = null;
    try {
      console.log('insertselect try 시작...');
      conn = await getPool().getConnection();
      const lastData = data.pop();
      const userID = lastData.userID;
      const todayDate = lastData.date;
      const columnData = 's' + userID + todayDate;
      const jsonData = JSON.stringify(data);
      const insertData = {
        healthNo: columnData,
        user_id: userID,
        healthSelect: jsonData,
      };
      const [resp] = await conn.query(sql.insertSelect, [
        insertData.healthNo,
        insertData.user_id,
        insertData.healthSelect,
      ]);
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
      const lastData = data.pop();
      const userID = lastData.userID;
      const jsonData = JSON.stringify(data);
      const updateData = { healthSelect: jsonData, user_id: userID };
      const [resp] = await conn.query(sql.updateOnlySelect, [
        updateData.healthSelect,
        updateData.user_id,
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
};

module.exports = todoDAO;
