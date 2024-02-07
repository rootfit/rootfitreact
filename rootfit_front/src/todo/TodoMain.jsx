import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import HealthList from './component/HealthList';
import TodayReport from './component/TodayReport';
import HealthModal from './component/HealthModal';
// import MonthReport from './component/MonthReport';

import UserContext from '../user/context/UserContext';
import { useContext } from 'react';

const TodoContainer = () => {
  const [loadList, setLoadList] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  // 로그인 중인 회원 정보를 불러옴
  const values = useContext(UserContext);
  const userID = values.state.user.id;

  // 회원의 누적 데이터를 바탕으로 목록을 불러오는 함수
  const getLoadList = async () => {
    const resp = await axios.get('http://localhost:8000/todo/loadlist/' + userID);
    if (resp.data.status === 205) {
      // console.log('getLoadList', resp.data.data);
      setLoadList(resp.data.data);
    } else {
      console.log('getLoadList', resp.data.data); // [{…}, {…}, {…}]
      setLoadList(resp.data.data);
      setIsSaved(true);
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <HealthList
              getLoadList={getLoadList}
              loadList={loadList}
              isSaved={isSaved}
              userID={userID}
            />
          }
        />
        <Route path='/report' element={<TodayReport />} />
      </Routes>
    </div>
  );
};

export default TodoContainer;
