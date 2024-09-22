import React, { useState, useCallback, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../user/context/UserContext';

const TodoContext = React.createContext(null);

export const TodoProvider = (props) => {
  // Context 데이터
  const values = useContext(UserContext);
  const userID = values.state.user.id;

  // 헬스리스트 목록 상태
  const [healthList, setHealthList] = useState([]);

  // 유저 데이터 상태
  const [userSavedData, setUserSavedData] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  // 유저의 오늘 헬스리스트 상태
  const [todayTasks, setTodayTasks] = useState([
    { id: '1', no: '', name: '', success: false, successpercent: 0 },
    { id: '2', no: '', name: '', success: false },
    { id: '3', no: '', name: '', success: false },
    { id: '4', no: '', name: '', success: false },
    { id: '5', no: '', name: '', success: false },
  ]);

  // 유저의 헬스리스트 달성률 상태
  const [successPercent, setSuccessPercent] = useState(0);

  // ----------------------------------------------------------

  // 당일 날짜 데이터
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const mon = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  const formattedDate = `${year}년 ${mon}월 ${date}일`;

  // ------------ 누적 데이터 ----------- //

  // 유저 올해 1년 누적 데이터
  const getLoadYear = useCallback(async (userID) => {
    console.log('getLoadYear 실행됨!', userID);
    const reqList = [userID, year];
    const resp = await axios.post('http://localhost:8000/todo/loadyear', reqList);
    // console.log('getLoadYear', resp.data.data);
    setUserSavedData(resp.data.data);
  }, []);

  // 올해 이번달 데이터
  const changeThisMonth = () => {
    const monthSuccess = [];
    const monthDate = [];
    let result = [];
    let monthData = [];

    // 이번달 데이터 편집
    yearData.forEach((item, index) => {
      if (
        item['year'] === currentDate.getFullYear() &&
        item['month'] === currentDate.getMonth() + 1
      ) {
        monthSuccess.push(`${item['value']}`);
        monthDate.push(`${item['month']}/${item['date']}`);
      }
    });
    result = [monthDate, monthSuccess];
    // setMonthDate(result);
  };

  // 이번주 데이터
  const changeThisWeek = () => {
    // 올해 이번달 데이터 구하기
    const thisMonthData = [];
    yearData.forEach((item, index) => {
      if (
        item['year'] === currentDate.getFullYear() &&
        item['month'] === currentDate.getMonth() + 1
      ) {
        thisMonthData.push(item);
      }
    });

    const todayDay = currentDate.getDay();
    const todayDate = currentDate.getDate();
    const start = todayDate - todayDay;
    const end = todayDate + 6 - todayDay;
    let result = [0, 0, 0, 0, 0, 0, 0];
    thisMonthData.forEach((item, index) => {
      if (end >= item['date'] && item['date'] >= start) {
        result[item['day']] = item['value'];
      }
    });
    setWeekDate(result);
  };

  // 당일 데이터
  const getTodayTasks = useCallback(async (userID) => {
    console.log('getTodayTasks 실행됨!', userID);
    const resp = await axios.get('http://localhost:8000/todo/loadselect/' + userID);
    if (resp.data.status === 205) {
      setIsSaved(false);
    } else {
      const savedData = resp.data.data;
      setTodayTasks(resp.data.data);

      const sp = savedData[0].successpercent;
      setSuccessPercent(sp);

      savedData.forEach((item) => {
        if (item.success === true) {
          changeCheckSuccess(item.id);
        }
      });

      setIsSaved(true);
    }
  }, []);

  // ------------ 헬스리스트 추가 모달 ----------- //

  // 1. admin이 작성한 헬스리스트 목록 req
  const getHealthList = useCallback(async () => {
    const resp = await axios.get('http://localhost:8000/todo/healthlist');
    let newHealthList = resp.data.data;
    setHealthList(newHealthList);
  }, []);

  // 2. 유저 데이터 최초 저장
  const insertTodayTasks = useCallback(async (data, id) => {
    data[5] = { userID: id, date: currentDate };
    const resp = await axios.post('http://localhost:8000/todo/insertselect', data);
  }, []);

  // 3. 유저 데이터 업데이트
  const updateTodayTasks = useCallback(async (data, id) => {
    data[5] = { userID: id };
    const resp = await axios.post('http://localhost:8000/todo/updateselect/', data);
  }, []);

  // ------------ 달성률 저장 모달 ----------- //

  // 1. 달성률 계산 및 업데이트
  const changeSuccessPercent = (data) => {
    let mc = data[1];
    let sp = Math.round((data[0].length / mc) * 100);
    setSuccessPercent(sp);
  };

  // 2. 유저 데이터 업데이트 (달성도 포함)
  const changeTodaySuccess = useCallback((data) => {
    let newTodaySuccess = todayTasks;
    if (data[0].length > 0) {
      newTodaySuccess.forEach((item) => {
        if (data[0].includes(item.id)) {
          item.success = true;
        } else {
          item.success = false;
        }
      });
      changeSuccessPercent(data);
      newTodaySuccess[0].successpercent = successPercent;
    } else {
      setSuccessPercent(0);
    }
    setTodayTasks(newTodaySuccess);
    updateTodayTasks(newTodaySuccess, userID);
  }, []);

  // -------- 상속 -------- //
  const todoValues = {
    state: {
      healthList,
      isSaved,
      successPercent,
      currentDate,
      formattedDate,
      todayTasks,
    },
    actions: {
      changeThisWeek,
      changeThisMonth,
      setTodayTasks,
      insertTodayTasks,
      updateTodayTasks,
      setIsSaved,
      changeTodaySuccess,
      getTodayTasks,
      getLoadYear,
      getHealthList,
    },
  };
  return <TodoContext.Provider value={todoValues}>{props.children}</TodoContext.Provider>;
};

export default TodoContext;
