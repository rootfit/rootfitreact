import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const TodoContext = React.createContext(null);

export const TodoProvider = (props) => {
  // 헬스리스트 목록 데이터
  const [healthList, setHealthList] = useState({ status: '', message: '', data: [] });
  // 유저의 누적 데이터
  const [loadNo, setLoadNo] = useState([]);
  const [loadCheck, setLoadCheck] = useState([]);
  const [loadTitle, setLoadTitle] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [yearData, setYearData] = useState([]);
  // 유저가 선택한 헬스리스트 목록 데이터
  const [checkboxState, setCheckboxState] = useState([]);
  // 달성한 체크박스 데이터
  const [successState, setSuccessState] = useState([false, false, false, false, false]);
  // 달성률 데이터
  const [letsgoPercent, setLetsgoPercent] = useState(100);
  const [successPercent, setSuccessPercent] = useState(0);
  const [weekDate, setWeekDate] = useState([0, 0]);
  const [monthDate, setMonthDate] = useState([0, 0]);

  // // // HealthModal // // //

  // 헬스리스트 요청하는 함수
  const getHealthList = useCallback(async () => {
    // console.log('getHealthList 실행 됨!');
    const resp = await axios.get('http://localhost:8000/todo/healthlist');
    // 헬스리스트의 각 항목에 대한 초기 체크 상태를 false로 설정
    setSuccessState(resp.data.data.map(() => false));
    setHealthList(resp.data);
  }, []);

  // 헬스모달에서 선택한 체크박스의 상태를 토글
  const handleCheckboxChange = (index) => {
    // console.log('handleCheckboxChange 실행 됨!');
    setCheckboxState((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // // // 유저 관련 데이터 // // //

  const currentDate = new Date();

  // // 회원의 1년 누적 데이터를 불러오는 함수 // //
  const getLoadYear = useCallback(async (userID) => {
    const dateData = `${currentDate.getFullYear()}`;
    const reqList = [userID, dateData];
    const resp = await axios.post('http://localhost:8000/todo/loadyear', reqList);
    setYearData(resp.data.data);
    changeThisWeek(resp.data.data);
    changeThisMonth(resp.data.data);
  }, []);

  // 이번주 데이터 구하기
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

  // 올해 이번달 데이터 구하기
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
    setMonthDate(result);
  };

  // // 회원의 당일 누적 데이터를 불러오는 함수 // //
  const getLoadSelect = useCallback(async (userID) => {
    // console.log('getLoadSelect 실행됨!');
    const resp = await axios.get('http://localhost:8000/todo/loadselect/' + userID);
    // 누적 데이터가 없는 경우
    if (resp.data.status === 205) {
      // console.log('getLoadSelect205', resp.data.data);
      setLoadTitle(resp.data.data);
    } else {
      // 누적데이터가 있는 경우
      // console.log('getLoadSelect', resp.data.data);
      setLoadNo(resp.data.data[1]);
      setLoadCheck(resp.data.data[2]);
      setLoadTitle(resp.data.data[3]);
      setSuccessPercent(resp.data.data[4]);
      setLetsgoPercent(100 - resp.data.data[4]);
      setIsSaved(true);
    }
    getLoadYear(userID);
  }, []);

  // // 달성도 저장 버튼 클릭 후, 달성한 체크박스의 상태를 토글하는 함수 // //
  const handleSuccessboxChange = (index) => {
    // console.log('handleSuccessboxChange 실행 됨!');
    setSuccessState((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // // 누적 데이터가 변경되면 달성한 체크박스의 상태 업데이트하는 함수 // //
  const changeSuccessState = useCallback(async () => {
    // console.log('changeSuccessState 실행됨!');
    setSuccessState((prevStates) => {
      const newStates = [...prevStates];
      loadCheck.forEach((item, index) => {
        newStates[index] = item;
      });
      return newStates;
    });
  }, []);

  // // 누적 데이터가 변경되면 그래프 달성률 업데이트하는 함수 // //
  const changeGraphReport = () => {
    // console.log('changeGraphReport 실행됨!');
    if (loadNo.length > 0) {
      const newSuccess = successState.slice(0, loadNo.length - 2);
      console.log('loadNo.length', loadNo.length);
      let cnt = 0;
      newSuccess.forEach((item) => {
        if (item === true) cnt += 1;
      });
      const successPercent = Math.round((cnt / (loadNo.length - 2)) * 100);
      const letsgoPercent = 100 - successPercent;
      setSuccessPercent(successPercent);
      setLetsgoPercent(letsgoPercent);
    }
  };

  // // // 헬스리스트 // // //

  // // 날짜 정보 // //
  // 현재 날짜 정보 가져오기
  const formattedDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일`;

  // // // useEffect // // //

  useEffect(() => {
    changeGraphReport();
    getHealthList();
  }, []);

  useEffect(() => {
    changeSuccessState();
    changeGraphReport();
  }, [loadCheck]);

  useEffect(() => {
    changeGraphReport();
  }, [successState]);

  // // // 상속 // // //

  const todoValues = {
    state: {
      healthList,
      loadNo,
      loadCheck,
      loadTitle,
      isSaved,
      checkboxState,
      successState,
      successPercent,
      letsgoPercent,
      currentDate,
      formattedDate,
      yearData,
      weekDate,
      monthDate,
    },
    actions: {
      getHealthList,
      getLoadSelect,
      changeGraphReport,
      handleCheckboxChange,
      handleSuccessboxChange,
      getLoadYear,
      changeThisWeek,
      changeThisMonth,
    },
  };
  return <TodoContext.Provider value={todoValues}>{props.children}</TodoContext.Provider>;
};

export default TodoContext;
