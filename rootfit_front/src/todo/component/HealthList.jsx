import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';

import HealthModal from './HealthModal';
import HealthSuccessModal from './HealthSuccessModal';

import CheckboxList from './CheckboxList';
import TodayReport from './TodayReport';
import WeekReport from './WeekReport';
import MonthReport from './MonthReport';
import YearReport from './YearReport';

import TodoContext from '../context/todoContext';

const HealthList = (props) => {
  // 1. state 초기값 설정
  const [tasks, setTasks] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsopen] = useState(false);

  // 공용 데이터 불러옴
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;
  const todoActions = todoValues.actions;

  // 헬스리스트 추가 모달 열기
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 헬스리스트 추가 모달 닫기
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 달성률 저장 모달 열기
  const openSuccess = () => {
    const todaySuccessIndex = [];
    todoState.successState.forEach((item, index) => {
      if (item === true) todaySuccessIndex.push(index);
    });
    // console.log('.....', todaySuccessIndex.length)
    if (todaySuccessIndex.length > 0) {
      setSuccessIsopen(true);
    } else {
      alert('달성하신 목표를 1개 이상 체크하셔야 저장할 수 있어요!');
    }
  };

  // 달성률 저장 모달 닫기
  const closeSuccess = () => {
    setSuccessIsopen(false);
  };

  // 자정에 초기화하는 함수
  const resetTasksAtMidnight = () => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeUntilMidnight = midnight - now;
    setTimeout(() => {
      setTasks([]);
    }, timeUntilMidnight);
  };

  // 달성도 서버에 업데이트하는 함수
  const updateLoadCheck = useCallback(async (data) => {
    const resp = await axios.post('http://localhost:8000/todo/updatesuccess/', data);
  }, []);

  // 달성도 상태 업데이트하는 함수
  const changeLoadCheck = () => {
    const todaySuccessIndex = [];
    todoState.successState.forEach((item, index) => {
      if (item === true) todaySuccessIndex.push(index);
    });
    let todaySuccessList = {};
    if (todaySuccessIndex.length > 0) {
      todoState.loadNo.forEach((item, index) => {
        todaySuccessList[todoState.loadNo[index]] = todoState.successState[index];
      });
      todaySuccessList['id'] = props.userID;
      todaySuccessList['successPercent'] = todoState.successPercent;
      updateLoadCheck(todaySuccessList); // 누적 데이터 업데이트
    } else {
      alert('달성하신 목표를 1개 이상 체크하셔야 저장할 수 있어요!');
    }
  };

  // useEffect를 이용한 자정 초기화 및 데이터 로딩
  useEffect(() => {
    resetTasksAtMidnight();
    const intervalId = setInterval(() => {
      resetTasksAtMidnight();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // 유저 누적 데이터 업데이트
  useEffect(() => {
    todoActions.getLoadSelect(props.userID);
  }, [modalIsOpen]);

  // 유저 달성률 업데이트
  useEffect(() => {
    if (successIsOpen === true) {
      todoActions.changeGraphReport();
    }
  }, [successIsOpen]);

  // JSX 반환
  return (
    <div className='container mt-5'>
      <h1 className='title-single'>헬스리스트</h1>
      {/* <span className='color-text-a'>💪 나만의 헬스리스트 🏋️‍♂️</span> */}
      <br />
      <br />
      <h2 className='text-left mb-4'>건강한 일상을 가꾸는 소소한 루틴 💪</h2>
      <h2 className='text-left mb-4'>헬스리스트와 함께 매일 루틴을 체크해봐요! 💫</h2>

      <p className='text-center mb-4'>{todoState.formattedDate}</p>
      <div className='row justify-content-center align-items-center'>
        {/* 체크박스 */}
        <div className='col-4'>
          <div className='d-flex justify-content-end' style={{ marginTop: '-70px' }}>
            <button
              type='button'
              className='btn btn-dark m-1 col-2'
              style={{ height: '50px', fontWeight: 'bold' }}
              onClick={() => openModal()}
            >
              헬스리스트 추가
            </button>
            <HealthModal modalIsOpen={modalIsOpen} closeModal={closeModal} userID={props.userID} />
          </div>
          <CheckboxList disabled={false} />
          <div className='d-flex justify-content-center' style={{ marginTop: '+10px' }}>
            <button
              type='button'
              className='btn btn-primary m-1 col-2'
              style={{ height: '50px', fontWeight: 'bold' }}
              onClick={() => {
                openSuccess();
              }}
            >
              달성도 저장
            </button>

            <HealthSuccessModal
              successIsOpen={successIsOpen}
              closeSuccess={closeSuccess}
              changeLoadCheck={changeLoadCheck}
            />
          </div>
        </div>
        <div className='col-6'>
          {/* 그래프 */}
          <TodayReport successIsOpen={successIsOpen} closeSuccess={closeSuccess} />
        </div>
      </div>
      <div>
        <h2>일주일 달성률</h2>
        <WeekReport successIsOpen={successIsOpen} closeSuccess={closeSuccess} />
      </div>
      <div>
        <h2>한달 달성률</h2>
        <MonthReport successIsOpen={successIsOpen} closeSuccess={closeSuccess} />
      </div>
      <div>
        <h2>올해 달성률</h2>
        <YearReport successIsOpen={successIsOpen} closeSuccess={closeSuccess} />
      </div>
    </div>
  );
};

export default HealthList;
