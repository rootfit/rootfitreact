import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// import { produce } from 'immer';

import HealthList from './component/HealthList';
import TodayReport from './component/TodayReport';
// import MonthReport from './component/MonthReport';

import UserContext from '../user/context/UserContext';
import { useContext } from 'react';

const TodoContainer = () => {
  const [loadNo, setLoadNo] = useState([]);
  const [loadCheck, setLoadCheck] = useState([]);
  const [loadTitle, setLoadTitle] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  // 로그인 중인 회원 정보를 불러옴
  const values = useContext(UserContext);
  const userID = values.state.user.id;

  // 회원의 누적 데이터를 불러오는 함수
  const getLoadSelect = useCallback(async () => {
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

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <HealthList
              getLoadSelect={getLoadSelect}
              loadNo={loadNo}
              loadCheck={loadCheck}
              loadTitle={loadTitle}
              isSaved={isSaved}
              userID={userID}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default TodoContainer;
