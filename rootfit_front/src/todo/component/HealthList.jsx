import React, { useState, useEffect, useCallback } from 'react';
import HealthModal from './HealthModal';
import axios from 'axios';

const HealthList = (props) => {
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkboxState, setCheckboxState] = useState([false, false, false, false, false]);

  // 모달 열기
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // // 태스크 삭제
  // const deleteTask = (index) => {
  //   const updatedTasks = [...tasks];
  //   updatedTasks.splice(index, 1);
  //   setTasks(updatedTasks);
  // };

  // 현재 날짜 정보 가져오기
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일`;

  // 헬스리스트 추가 함수
  const addHealthList = async (newHealthList) => {
    // 새로운 헬스리스트를 메인 창에 추가
    const updatedTasks = [...tasks, newHealthList];
    setTasks(updatedTasks);

    // 서버에 데이터 저장
    try {
      await axios.post('http://localhost:8000/todo/saveHealthList', { healthList: checkboxState });
      console.log('HealthList 저장 성공');
    } catch (error) {
      console.error('Error 저장 실패', error);
    }
  };

  // 저장 버튼 클릭 시 체크박스 상태 저장
  // try {
  //   axios.post('http://localhost:8000/todo/saveHealthList', {
  //     healthList: checkboxState,
  //   });
  //   console.log('HealthList 저장 성공');
  // } catch (error) {
  //   console.error('Error 저장 실패', error);
  // }

  // 자정에 초기화하는 함수
  const resetTasksAtMidnight = () => {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // 다음 날 자정
      0,
      0,
      0
    );

    const timeUntilMidnight = midnight - now;
    setTimeout(() => {
      setTasks([]);
    }, timeUntilMidnight);
  };

  // 체크박스 상태만 변경(setCheckboxState)하는 함수
  const updateCheckboxState = (index) => {
    const toUpdateCheckbox = [...checkboxState];
    toUpdateCheckbox[index] = !checkboxState[index];
    setCheckboxState(toUpdateCheckbox);
  };

  useEffect(() => {
    // 자정에 초기화 함수 호출
    resetTasksAtMidnight();

    // 매 초마다 자정에 초기화 함수 호출
    const intervalId = setInterval(() => {
      resetTasksAtMidnight();
    }, 1000);

    // 컴포넌트가 언마운트될 때 clearInterval 호출
    return () => clearInterval(intervalId);
  }, []);

  // 모달창이 닫히면 자동으로 유저 누적 데이터를 불러옴
  useEffect(() => {
    props.getLoadList();
  }, [modalIsOpen]);

  return (
    <div className='container mt-5'>
      {/* 페이지 제목 */}
      <h1 className='title-single'>Health List</h1>
      <span className='color-text-a'>💪 나만의 헬스리스트 🏋️‍♂️</span>

      <div className='d-flex justify-content-end' style={{ marginTop: '-70px' }}>
        {/* 새로운 헬스리스트 추가 버튼 */}
        <button
          type='button'
          className='btn btn-dark m-1 col-2'
          style={{ height: '50px', fontWeight: 'bold' }}
          onClick={() => openModal()} // 모달 열기
        >
          헬스리스트 추가
        </button>

        {/* 모달 */}
        <HealthModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal} // 모달 닫기
          userID={props.userID}
          isSaved={props.isSaved}
          // checkboxState={checkboxState}
          // setCheckboxState={setCheckboxState}
          // addHealthList={addHealthList} // 모달에서 추가된 헬스리스트를 메인 창에 전달
        />
      </div>

      <h2 className='text-center mb-4'>건강한 일상을 가꾸는 소소한 루틴</h2>
      <h3 className='text-center mb-4'>HealthList를 추가하고 매일 루틴을 체크해봐요💫</h3>

      {/* 현재 날짜 표시 */}
      <p className='text-center mb-4'>{formattedDate}</p>

      {/* 헬스리스트 목록 */}
      <ul className='list-group mt-3'>
        {props.loadList.map((task, index) => (
          <li
            key={index}
            className='list-group-item d-flex justify-content-between align-items-center'
          >
            {/* 태스크 내용 */}
            {task.healthTitle}
            {/* 체크박스 */}
            <input
              type='checkbox'
              checked={checkboxState[index]} // 체크박스 상태 반영
              onChange={() => updateCheckboxState(index)}
              className='mx-2'
            />
          </li>
        ))}
      </ul>
      {/* 저장 버튼 */}
      <div className='d-flex justify-center-end' style={{ marginTop: '+10px' }}>
        <button
          type='button'
          className='btn btn-primary m-1 col-2'
          style={{ height: '50px', fontWeight: 'bold' }}
          onClick={() => {}}
        >
          달성도 저장
        </button>
      </div>
    </div>
  );
};

export default HealthList;
