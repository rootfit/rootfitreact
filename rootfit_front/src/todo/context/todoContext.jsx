import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const TodoContext = React.createContext(null);

export const TodoProvider = (props) => {
  const [loadNo, setLoadNo] = useState([]);
  const [loadCheck, setLoadCheck] = useState([]);
  const [loadTitle, setLoadTitle] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [checkboxState, setCheckboxState] = useState([false, false, false, false, false]);
  const [letsgoPercent, setLetsgoPercent] = useState(100);
  const [successPercent, setSuccessPercent] = useState(0);

  // 회원의 누적 데이터를 불러오는 함수
  const getLoadSelect = useCallback(async (userID) => {
    console.log('getLoadSelect 실행됨!');
    const resp = await axios.get('http://localhost:8000/todo/loadselect/' + userID);
    if (resp.data.status === 205) {
      // console.log('getLoadSelect', resp.data.data);
      setLoadTitle(resp.data.data);
    } else {
      // console.log('getLoadSelect', resp.data.data);
      setLoadNo(resp.data.data[1]);
      setLoadCheck(resp.data.data[2]);
      setLoadTitle(resp.data.data[3]);
      setIsSaved(true);
    }
  }, []);

  // 클릭된 체크박스의 상태를 토글
  const handleCheckboxChange = (index) => {
    setCheckboxState((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // 누적 데이터가 변경되면 체크박스 상태 업데이트
  const changeCheckboxState = () => {
    setCheckboxState((prevStates) => {
      const newStates = [...prevStates];
      loadCheck.forEach((item, index) => {
        newStates[index] = item;
      });
      return newStates;
    });
    changeGraphReport();
  };

  // 그래프 달성률 업데이트
  const changeGraphReport = useCallback(() => {
    if (loadNo.length > 0) {
      const newSuccess = checkboxState.slice(0, loadNo.length);
      let cnt = 0;
      newSuccess.forEach((item) => {
        if (item === true) cnt += 1;
      });
      const reach = Math.floor((cnt / loadNo.length) * 100);
      const go = 100 - reach;
      setLetsgoPercent(reach);
      setLetsgoPercent(go);
    }
  });

  // 로그아웃 시 데이터 리셋
  const resetData = () => {
    setLoadNo([]);
    setLoadCheck([]);
    setLoadTitle([]);
    setIsSaved(false);
    setLetsgoPercent(0);
    setLetsgoPercent(100);
  };

  // 현재 날짜 정보 가져오기
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일`;

  useEffect(() => {
    getLoadSelect();
    changeGraphReport();
  }, []);

  useEffect(() => {
    changeCheckboxState();
  }, [loadCheck]);

  const todoValues = {
    state: {
      loadNo,
      loadCheck,
      loadTitle,
      isSaved,
      checkboxState,
      successPercent,
      letsgoPercent,
      formattedDate,
    },
    actions: {
      getLoadSelect,
      handleCheckboxChange,
      changeCheckboxState,
      changeGraphReport,
      resetData,
    },
  };
  return <TodoContext.Provider value={todoValues}>{props.children}</TodoContext.Provider>;
};

export default TodoContext;
