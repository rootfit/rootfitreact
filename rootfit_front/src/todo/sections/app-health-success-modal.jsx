import React, { useCallback, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
import Modal from 'react-modal';
import iconUrl from '../components/icon/rootfit_good.png';

// ----------------------------------------------------------------------

const HealthSuccessModal = (props) => {
  // context
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;
  const todoActions = todoValues.actions;

  // 모달 스타일
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경의 투명도와 색상 설정
      zIndex: 1000, // 모달이 상위에 나타나도록 zIndex 설정
    },
    content: {
      backgroundColor: '#F0F3BE', // 모달 내용의 배경색
      borderRadius: '8px', // 모달의 모서리를 둥글게 만듦
      padding: '20px', // 모달 내용의 여백 설정
      maxWidth: '400px', // 모달 내용의 최대 너비 설정
      maxHeight: '450px',
      margin: 'auto', // 모달을 수평 중앙에 위치
    },
  };

  // ----------------------------------------------------------------------

  return (
    <Modal
      isOpen={todoState.successModalOpen}
      onRequestClose={todoActions.changeSuccessModal}
      style={modalStyles} // 모달 스타일 적용
    >
      <div className='modal-header'>
        <h1 className='modal-title fs-5'>Health List 👏</h1>
        <button
          type='button'
          className='btn-close'
          onClick={todoActions.changeSuccessModal}
          aria-label='Close'
        ></button>
      </div>
      <img src={iconUrl} alt='Icon' style={{ width: '320px', height: '320px' }} />
      <div className='modal-body' style={{ textAlign: 'center' }}>
        저장되었습니다!
      </div>

      <div className='modal-footer'>
        <button type='button' className='btn btn-primary' onClick={todoActions.addTask}>
          확인
        </button>
      </div>
    </Modal>
  );
};

export default HealthSuccessModal;
