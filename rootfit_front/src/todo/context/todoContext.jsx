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
    { id: '1', no: '', name: '' },
    { id: '2', no: '', name: '' },
    { id: '3', no: '', name: '' },
    { id: '4', no: '', name: '' },
    { id: '5', no: '', name: '' },
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

  // -------- 기본 데이터 -------- //

  // 오늘 날짜 정보
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const mon = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  const formattedDate = `${year}년 ${mon}월 ${date}일`;

  // 유저의 올해 1년 누적 데이터를 불러옴
  const getLoadYear = async (userID) => {
    const reqList = [userID, year];
    const resp = await axios.post('http://localhost:8000/todo/loadyear', reqList);
    setUserSavedData(resp.data.data);
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

  // 회원의 당일 누적 데이터를 불러옴
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

  // -------- 체크박스 목록 -------- //

  // 달성한 체크박스 체크 시 체크 상태 변경
  const changeCheckSuccess = (taskId) => {
    const tasksCompleted = checkSuccess.includes(taskId)
      ? checkSuccess.filter((value) => value !== taskId)
      : [...checkSuccess, taskId];

    setCheckSuccess(tasksCompleted);
  };

  // -------- 헬스리스트 추가 모달 -------- //

  // 1. 헬스리스트 모달 상태 변경
  const changeHealthModal = useCallback(() => {
    let newHealthMoal = !healthModalOpen;
    setHealthModalOpen(newHealthMoal);
  }, []);

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
    data['id'] = props.userID;
    data['successPercent'] = successPercent;
    data['date'] = currentDate;
    const resp = await axios.post('http://localhost:8000/todo/insertselect', data);
  }, []);

  const updateTodayTasks = useCallback(async (data) => {
    data['id'] = props.userID;
    data['successPercent'] = successPercent;
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
      changeHealthModal();
      alert('저장되었습니다.');
    }
  });

  // -------- 달성률 저장 모달 -------- //

  // 1. 달성률 모달 상태 변경
  const changeSuccessModal = useCallback(() => {
    if (checkSuccess.length > 0) {
      let newSuccessModal = !successModalOpen;
      setSuccessModalOpen(newSuccessModal);
    } else {
      alert('달성한 목표를 1개 이상 체크하셔야 저장할 수 있어요!');
    }
  });

  // 2. 유저의 달성도를 서버에 업데이트
  const updateLoadCheck = useCallback(async (data) => {
    const resp = await axios.post('http://localhost:8000/todo/updatesuccess/', data);
  }, []);

  // 달성도 상태 업데이트하는 함수
  const changeLoadCheck = () => {
    let todaySuccessList = {};
    if (todaySuccessIndex.length > 0) {
      loadNo.forEach((item, index) => {
        todaySuccessList[loadNo[index]] = checkSuccess[index];
      });
      todaySuccessList['id'] = props.userID;
      todaySuccessList['successPercent'] = successPercent;
      updateLoadCheck(todaySuccessList); // 누적 데이터 업데이트
    }
  };

  const addTask = () => {
    changeLoadCheck();
    changeSuccessModal();
  };

  // 유저 누적 데이터 업데이트
  // useEffect(() => {
  //   todoActions.getLoadSelect(props.userID);
  // }, [healthModalOpen]);

  // 유저 달성률 업데이트
  // useEffect(() => {
  //   if (successModalOpen === true) {
  // todoActions.changeGraphReport();
  // todoActions.changeThisWeek();
  // todoActions.changeThisMonth();
  //   }
  // }, [successModalOpen]);

  // 달성도 저장 버튼 클릭 후, 달성한 체크박스의 상태를 토글
  // const handleSuccessboxChange = (index) => {
  //   // console.log('handleSuccessboxChange 실행 됨!');
  //   setSuccessState((prevStates) => {
  //     const newStates = [...prevStates];
  //     newStates[index] = !newStates[index];
  //     return newStates;
  //   });
  // };

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

  // 누적 데이터가 변경되면 그래프 달성률 업데이트하는 함수
  // const changeGraphReport = () => {
  //   // console.log('changeGraphReport 실행됨!');
  //   if (loadNo.length > 0) {
  //     const newSuccess = successState.slice(0, loadNo.length - 2);
  //     console.log('loadNo.length', loadNo.length);
  //     let cnt = 0;
  //     newSuccess.forEach((item) => {
  //       if (item === true) cnt += 1;
  //     });
  //     const successPercent = Math.round((cnt / (loadNo.length - 2)) * 100);
  //     const letsgoPercent = 100 - successPercent;
  //     setSuccessPercent(successPercent);
  //     setLetsgoPercent(letsgoPercent);
  //   }
  // };

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
