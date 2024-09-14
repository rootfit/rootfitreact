import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const TodoContext = React.createContext(null);

export const TodoProvider = (props) => {
  // 헬스리스트 목록 상태
  const [healthList, setHealthList] = useState([]);

  // 유저 관련 상태
  const [userSavedData, setUserSavedData] = useState([]);
  const [loadCheck, setLoadCheck] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  // 모달창 상태
  const [healthModalOpen, setHealthModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // 유저의 오늘 헬스리스트 상태
  const [todayTasks, setTodayTasks] = useState([
    { id: '1', no: '', name: '', success: false },
    { id: '2', no: '', name: '', success: false },
    { id: '3', no: '', name: '', success: false },
    { id: '4', no: '', name: '', success: false },
    { id: '5', no: '', name: '', success: false },
  ]);

  // 유저의 헬스리스트 모달창 체크 상태
  const [modalCheck, setModalCheck] = useState([]);

  // 유저가 달성한 체크박스를 체크한 상태
  const [checkSuccess, setCheckSuccess] = useState([]);

  // 유저의 헬스리스트 달성률 상태
  const [letsgoPercent, setLetsgoPercent] = useState(100);
  const [successPercent, setSuccessPercent] = useState(0);
  const [weekDate, setWeekDate] = useState([0, 0]);
  const [monthDate, setMonthDate] = useState([0, 0]);

  // ----------------------------------------------------------

  // 오늘 날짜 정보
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const mon = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  const formattedDate = `${year}년 ${mon}월 ${date}일`;

  // ------------ 누적 데이터 ----------- //

  // 유저 올해 1년 누적 데이터
  const getLoadYear = async (userID) => {
    const reqList = [userID, year];
    const resp = await axios.post('http://localhost:8000/todo/loadyear', reqList);
    setUserSavedData(resp.data.data);
  };

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
    setMonthDate(result);
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
  const getLoadSelect = useCallback(async (userID) => {
    // console.log('getLoadSelect 실행됨!');
    const resp = await axios.get('http://localhost:8000/todo/loadselect/' + userID);
    // 누적 데이터가 없는 경우
    if (resp.data.status === 205) {
      console.log('getLoadSelect205', resp.data.data);
      setIsSaved(false);
    } else {
      // 누적데이터가 있는 경우
      console.log('getLoadSelect', resp.data.data);
      setUserSavedData(resp.data.data);
      setIsSaved(true);
    }
    getLoadYear(userID);
  }, []);

  // useEffect
  useEffect(() => {
    // changeGraphReport();
    getHealthList();
  }, []);

  useEffect(() => {
    // changeSuccessState();
    // changeGraphReport();
  }, [loadCheck]);

  // useEffect(() => {
  //   changeGraphReport();
  // }, [successState]);

  // ------------ 헬스리스트 추가 모달 ----------- //

  // 1. 헬스리스트 모달 상태 변경
  const changeHealthModal = useCallback(() => {
    let newHealthMoal = !healthModalOpen;
    setHealthModalOpen(newHealthMoal);
  }, [healthModalOpen]);

  // 2. admin이 작성한 헬스리스트 목록 req
  const getHealthList = async () => {
    const resp = await axios.get('http://localhost:8000/todo/healthlist');
    let newHealthList = resp.data.data;
    setHealthList(newHealthList);
  };

  // 3. 유저의 헬스리스트 모달 체크 상태
  const changeModalCheck = (index) => {
    const newCheck = modalCheck.includes(index)
      ? modalCheck.filter((value) => value !== index)
      : [...modalCheck, index];

    setModalCheck(newCheck);
  };

  // 4. 유저 데이터를 서버에 저장 or 업데이트
  const insertTodayTasks = useCallback(async (data) => {
    data['userId'] = props.userID;
    data['date'] = currentDate;
    const resp = await axios.post('http://localhost:8000/todo/insertselect', data);
  }, []);

  const updateTodayTasks = useCallback(async (data) => {
    data['userId'] = props.userID;
    data['date'] = currentDate;
    const resp = await axios.post('http://localhost:8000/todo/updateselect/', data);
  }, []);

  // 5. 유저의 오늘 데이터 변경
  const changeTodayTasks = useCallback(() => {
    if (modalCheck.length > 6) {
      alert('목록은 5개까지 선택하실 수 있습니다.');
    } else if (modalCheck.length <= 0) {
      alert('1개 이상 체크해야 저장하실 수 있습니다.');
    } else {
      const newTodayTasks = todayTasks;

      modalCheck.forEach((item, index) => {
        newTodayTasks[index].no = healthList[item].healthNo;
        newTodayTasks[index].name = healthList[item].healthTitle;
      });

      if (isSaved === false) {
        insertTodayTasks(newTodayTasks);
        setIsSaved(true);
      } else {
        updateTodayTasks(newTodayTasks);
      }

      setTodayTasks(newTodayTasks);
      alert('저장되었습니다.');
      changeHealthModal();
    }
  });

  // ------------ 달성률 저장 모달 ----------- //

  // 1. 달성한 체크박스 체크 시 체크 상태 변경
  const changeCheckSuccess = (taskId) => {
    const newCheckSuccess = checkSuccess.includes(taskId)
      ? checkSuccess.filter((value) => value !== taskId)
      : [...checkSuccess, taskId];

    setCheckSuccess(newCheckSuccess);
  };

  // 2. 달성률 모달 상태 변경
  const changeSuccessModal = useCallback(() => {
    let newSuccessModal = !successModalOpen;
    setSuccessModalOpen(newSuccessModal);
  }, [successModalOpen]);

  // 3. 유저의 달성도를 서버에 업데이트
  const updateTodaySuccess = useCallback(async (data) => {
    const resp = await axios.post('http://localhost:8000/todo/updatesuccess/', data);
  }, []);

  // 4. 달성률 계산 및 업데이트
  const changeSuccessPercent = (cnt) => {
    const mc = modalCheck.length;
    const sp = Math.round((cnt / mc) * 100);
    setSuccessPercent(sp);
    setLetsgoPercent(100 - sp);
  };

  // 5. 유저의 오늘 달성도 상태 변경
  const changeTodaySuccess = useCallback(() => {
    const newTodaySuccess = todayTasks;
    let successCnt = 0;
    newTodaySuccess.forEach((item) => {
      if (checkSuccess.includes(item.id)) {
        item.success = true;
        successCnt += 1;
      } else {
        item.success = false;
      }
    });
    setTodayTasks(newTodaySuccess);
    if (successCnt > 0) {
      changeSuccessPercent(successCnt);
    } else {
      setLetsgoPercent(100);
      setSuccessPercent(0);
    }
    // updateLoadCheck(todaySuccessList);
  });

  const addTask = () => {
    changeTodaySuccess();
    changeSuccessModal();
  };

  // 유저 누적 데이터 업데이트
  // useEffect(() => {
  //   todoActions.getLoadSelect(props.userID);
  // }, [healthModalOpen]);

  // 유저 달성률 업데이트
  // useEffect(() => {
  //   if (successModalOpen === true) {
  // changeGraphReport();
  // changeThisWeek();
  // changeThisMonth();
  //   }
  // }, [successModalOpen]);

  // 누적 데이터가 변경되면 달성한 체크박스의 상태 업데이트
  // const changeSuccessState = useCallback(async () => {
  //   // console.log('changeSuccessState 실행됨!');
  //   setSuccessState((prevStates) => {
  //     const newStates = [...prevStates];
  //     loadCheck.forEach((item, index) => {
  //       newStates[index] = item;
  //     });
  //     return newStates;
  //   });
  // }, []);

  // -------- 상속 -------- //

  const todoValues = {
    state: {
      healthList,
      healthModalOpen,
      successModalOpen,
      isSaved,
      successPercent,
      letsgoPercent,
      currentDate,
      formattedDate,
      checkSuccess,
      todayTasks,
      modalCheck,
    },
    actions: {
      getLoadSelect,
      changeCheckSuccess,
      changeThisWeek,
      changeThisMonth,
      changeHealthModal,
      changeSuccessModal,
      changeTodayTasks,
      changeModalCheck,
      addTask,
    },
  };
  return <TodoContext.Provider value={todoValues}>{props.children}</TodoContext.Provider>;
};

export default TodoContext;
