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
  const [healthSelect, setHelathSelect] = useState({});
  const [loadTitle, setLoadTitle] = useState([]);
  const [loadNo, setLoadNo] = useState([]);
  const [loadCheck, setLoadCheck] = useState([]);
  // const [successState, setSuccessState] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  // 로그인 중인 회원 정보를 불러옴
  const values = useContext(UserContext);
  const userID = values.state.user.id;

  // 회원의 누적 데이터를 바탕으로 헬스리스트 타이틀만 불러오는 함수
  const getLoadSelect = useCallback(async () => {
    const resp = await axios.get('http://localhost:8000/todo/loadselect/' + userID);
    if (resp.data.status === 205) {
      // console.log('getLoadSelect', resp.data.data);
      setLoadTitle(resp.data.data[3]);
    } else {
      console.log('getLoadSelect', resp.data.data);
      setHelathSelect(resp.data.data[0]);
      setLoadTitle(resp.data.data[3]);
      setIsSaved(true);
    }
  }, []);

  // 달성도 업데이트 하는 함수
  const updatehealthSelect = useCallback(async () => {
    // data['id'] = props.userID;
    console.log('updateLoadCheck', loadNo, loadCheck);
    // const resp = await axios.post('http://localhost:8000/todo/updateselect/', data);
    // alert('저장되었습니다.');
  }, []);

  const changehealthSelect = useCallback(() => {
    console.log('changehealthSelect', '잘 도착!'); // [0, 1]
    const todaySuccessIndex = [];
    let newlist = [...successState];
    successState.forEach((item, index) => {
      if (item === true) todaySuccessIndex.push(index);
    });

    let newHealthSelect = { ...healthSelect };
    if (todaySuccessIndex.length > 0) {
      console.log('todaySuccessIndex', todaySuccessIndex);
      console.log('newHealthSelect', newHealthSelect);
      todaySuccessIndex.forEach((item) => {
        newHealthSelect[item] = successState[item];
      });
      setHelathSelect(newHealthSelect); // 누적 데이터 업데이트
    }
    // else {
    //   alert('달성하신 목표를 1개 이상 체크하셔야 저장할 수 있어요!');
    // }
    // updateLoadCheck(data) // 누적 데이터 업데이트
  });

  const changeSuccessState = useCallback((index) => {
    setSuccessState((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  });

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <HealthList
              getLoadSelect={getLoadSelect}
              // getLoadCheck={getLoadCheck}
              loadTitle={loadTitle}
              loadNo={loadNo}
              loadCheck={loadCheck}
              isSaved={isSaved}
              userID={userID}
              changeLoadCheck={changehealthSelect}
              updateLoadCheck={updatehealthSelect}
              setLoadCheck={setLoadCheck}
              healthSelect={healthSelect}
              changeSuccessState={changeSuccessState}
            />
          }
        />
        <Route path='/report' element={<TodayReport />} />
      </Routes>
    </div>
  );
};

export default TodoContainer;
