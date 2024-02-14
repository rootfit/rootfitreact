import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import CheckboxList from './CheckboxList';
import HealthModal from './HealthModal';
import HealthSuccessModal from './HealthSuccessModal';
import TodayReport from './TodayReport';

const HealthList = (props) => {
  // 1. useState 초기값 설정
  const [tasks, setTasks] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsopen] = useState(false);
  const [update, setUpdate] = useState([]);
  const [successState, setSuccessState] = useState([false, false, false, false, false]);

  // 모달 열기
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 모달 열기
  const openSuccess = () => {
    setSuccessIsopen(true);
  };

  // 모달 닫기
  const closeSuccess = () => {
    setSuccessIsopen(false);
  };

  // 현재 날짜 정보 가져오기
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일`;

  // 자정에 초기화하는 함수
  const resetTasksAtMidnight = () => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeUntilMidnight = midnight - now;
    setTimeout(() => {
      setTasks([]);
    }, timeUntilMidnight);
  };

  // 달성도 서버에 저장하는 함수
  const updateloadNo = useCallback(async (data) => {
    data['id'] = props.userID;
    console.log('updateloadNo', data);
    const resp = await axios.post('http://localhost:8000/todo/updatesuccess/', data);
  }, []);

  // 달성도 상태를 업데이트하는 함수
  const changeUpdate = () => {
    const todaySuccessIndex = [];
    successState.forEach((item, index) => {
      if (item === true) todaySuccessIndex.push(index);
    });

    let todaySuccessList = {};
    if (todaySuccessIndex.length > 0) {
      update.forEach((item, index) => {
        todaySuccessList[update[index]] = successState[index];
      });
      updateloadNo(todaySuccessList); // 누적 데이터 업데이트
    } else {
      alert('달성하신 목표를 1개 이상 체크하셔야 저장할 수 있어요!');
    }
  };

  // 누적 데이터가 변경되면 체크박스 상태 업데이트
  const changeSuccessState = () => {
    setSuccessState((prevStates) => {
      const newStates = [...prevStates];
      props.loadCheck.forEach((item, index) => {
        newStates[index] = item;
      });
      return newStates;
    });
  };

  // 클릭된 체크박스의 상태를 토글
  const toggleCheckbox = (index) => {
    setSuccessState((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
    setUpdate(props.loadNo);
  };

  // useEffect를 이용한 자정 초기화 및 데이터 로딩
  useEffect(() => {
    resetTasksAtMidnight();
    const intervalId = setInterval(() => {
      resetTasksAtMidnight();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    props.checkMember();
  }, []);

  useEffect(() => {
    props.getLoadSelect();
  }, [modalIsOpen]);

  useEffect(() => {
    changeSuccessState();
  }, [props.loadCheck]);

  // JSX 반환
  return (
    <div className='container mt-5'>
      <h1 className='title-single'>Health List</h1>
      <span className='color-text-a'>💪 나만의 헬스리스트 🏋️‍♂️</span>

      <div className='d-flex justify-content-end' style={{ marginTop: '-70px' }}>
        <button
          type='button'
          className='btn btn-dark m-1 col-2'
          style={{ height: '50px', fontWeight: 'bold' }}
          onClick={() => openModal()}
        >
          헬스리스트 추가
        </button>

        <HealthModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          userID={props.userID}
          isSaved={props.isSaved}
        />
      </div>

      <h2 className='text-center mb-4'>건강한 일상을 가꾸는 소소한 루틴</h2>
      <h3 className='text-center mb-4'>HealthList를 추가하고 매일 루틴을 체크해봐요💫</h3>

      <p className='text-center mb-4'>{formattedDate}</p>

      <ul className='list-group mt-3 list-inline mx-auto justify-content-center'>
        {props.loadTitle.map((task, index) => (
          <li
            key={index}
            className='list-group-item d-flex justify-content-between align-items-center'
          >
            {task.healthTitle}
            <input
              type='checkbox'
              checked={successState[index]}
              onChange={() => toggleCheckbox(index)}
              className='mx-2 checkbox'
            />
          </li>
        ))}
      </ul>

      {/* 그래프 */}
      <TodayReport
        successState={successState}
        successIsOpen={successIsOpen}
        update={update}
        loadCheck={props.loadCheck}
      />

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
          changeUpdate={changeUpdate}
        />
      </div>
    </div>
  );
};

export default HealthList;
