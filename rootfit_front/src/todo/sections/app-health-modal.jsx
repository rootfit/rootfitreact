import React, { useCallback, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import TodoContext from '../context/todoContext';

// --------------------------------------------------------------------------

const HealthModal = (props) => {
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;
  const todoActions = todoValues.actions;

  // 선택한 목록 최초 저장
  const addSelect = useCallback(async (data) => {
    data['id'] = props.userID;
    data['successPercent'] = todoState.successPercent;
    data['date'] = todoState.currentDate;
    const resp = await axios.post('http://localhost:8000/todo/insertselect', data);
  }, []);

  // 선택한 목록 업데이트
  const updateSelect = useCallback(async (data) => {
    data['id'] = props.userID;
    data['successPercent'] = todoState.successPercent;
    data['date'] = todoState.currentDate;
    const resp = await axios.post('http://localhost:8000/todo/updateselect/', data);
  }, []);

  // 선택한 헬스리스트 목록으로 context에 저장
  const addTask = () => {
    const todayCheckIndex = [];
    todoState.checkboxState.forEach((item, index) => {
      if (item === true) todayCheckIndex.push(index);
    });

    const todayCheckList = {};
    const selectedList = {};
    if (todayCheckIndex.length > 0) {
      todayCheckIndex.forEach((item) => {
        todayCheckList[todoState.healthList.data[item].healthNo] =
          todoState.healthList.data[item].healthTitle;
        selectedList[todoState.healthList.data[item].healthNo] = false;
      });
      if (todoState.isSaved === false) {
        addSelect(selectedList);
      } else {
        updateSelect(selectedList);
      }
    }

    alert('저장되었습니다.');
    todoActions.getHealthList();
    props.closeModal();
  };

  // ------------------------------------------------------------------------

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
    <Modal isOpen={props.healthModalOpen} onRequestClose={props.closeModal} style={modalStyles}>
      <div className='modal-header'>
        <h1 className='modal-title fs-5'>Health List 👏</h1>
        {/* 종료 버튼 */}
        <button
          type='button'
          className='btn-close'
          onClick={() => props.closeModal}
          aria-label='Close'
        ></button>
      </div>
      {/* 헬스리스트 목록 문구 */}
      <div className='modal-body'>
        <div className='form-check'>
          {todoState.healthList.data.map((data, index) => (
            <div key={index}>
              <input
                className='form-check-input'
                type='checkbox'
                value=''
                id={`flexCheckDefault-${index}`}
                checked={todoState.checkboxState[index]}
                onChange={() => todoActions.handleCheckboxChange(index)}
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
        <button type='button' className='btn btn-primary' onClick={addTask}>
          Save
        </button>
      </div>
    </Modal>
  );
};

export default HealthModal;
