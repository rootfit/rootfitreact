import React, { useCallback, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import TodoContext from '../context/todoContext';

// --------------------------------------------------------------------------

const HealthModal = (props) => {
  // context
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;
  const todoActions = todoValues.actions;

  // 유저의 헬스리스트 모달창 체크 상태
  const [modalCheck, setModalCheck] = useState([]);

  // 3. 유저의 헬스리스트 모달 체크 상태
  const changeModalCheck = (index) => {
    const newCheck = modalCheck.includes(index)
      ? modalCheck.filter((value) => value !== index)
      : [...modalCheck, index];

    setModalCheck(newCheck);
  };

  // 유저의 당일 헬스리스트 데이터 변경
  const changeTodayTasks = () => {
    if (modalCheck.length > 6) {
      alert('목록은 5개까지 선택하실 수 있습니다.');
    } else if (modalCheck.length <= 0) {
      alert('1개 이상 체크해야 저장하실 수 있습니다.');
    } else {
      props.setListLength(modalCheck.length);

      let newTodayTasks = todoState.todayTasks;

      modalCheck.forEach((item, index) => {
        newTodayTasks[index].no = todoState.healthList[item].healthNo;
        newTodayTasks[index].name = todoState.healthList[item].healthTitle;
        newTodayTasks[index].success = false;
      });

      newTodayTasks = [...newTodayTasks, { userID: props.userID, date: todoState.currentDate }];

      console.log('newTodayTasks', newTodayTasks);

      if (todoState.isSaved === false) {
        todoActions.insertTodayTasks(newTodayTasks);
        todoActions.setIsSaved(true);
      } else {
        todoActions.updateTodayTasks(newTodayTasks);
      }

      alert('저장되었습니다.');
      props.changeHealthModal();
    }
  };

  // 모달 스타일
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    },
    content: {
      backgroundColor: '#E0F3BE',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '350px', // 모달 내용의 최대 너비
      maxHeight: '650px',
      margin: 'auto',
    },
  };

  // 모달 내 텍스트의 글꼴 크기를 조정하는 스타일
  const textStyle = {
    fontSize: '18px', // 글꼴 크기를 14px로 설정
  };

  //---------------------------------------------------------------------------

  return (
    <Modal
      isOpen={props.healthModalOpen}
      onRequestClose={props.changeHealthModal}
      style={modalStyles}
    >
      <div className='modal-header'>
        <h1 className='modal-title fs-5'>Health List 👏</h1>
        {/* 종료 버튼 */}
        <button
          type='button'
          className='btn-close'
          onClick={() => props.changeHealthModal()}
          aria-label='Close'
        ></button>
      </div>
      {/* 헬스리스트 목록 문구 */}
      <div className='modal-body'>
        <div className='form-check'>
          {todoState.healthList.map((data, index) => (
            <div key={index}>
              <input
                className='form-check-input'
                type='checkbox'
                value=''
                id={`flexCheckDefault-${index}`}
                checked={modalCheck.includes(index)}
                onChange={() => changeModalCheck(index)}
              />
              <label
                className='form-check-label'
                htmlFor={`flexCheckDefault-${index}`}
                style={textStyle}
              >
                {data.healthTitle}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* 저장 버튼 */}
      <div className='modal-footer'>
        <button type='button' className='btn btn-primary' onClick={changeTodayTasks}>
          Save
        </button>
      </div>
    </Modal>
  );
};

export default HealthModal;
