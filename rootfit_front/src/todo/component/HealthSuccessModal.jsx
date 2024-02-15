
import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import iconUrl from './icon/rootfit_good.png'; 

const HealthSuccessModal = (props) => {
  const addTask = () => {
    props.changeUpdate();
    props.closeSuccess();
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경의 투명도와 색상 설정
      zIndex: 1000, // 모달이 상위에 나타나도록 zIndex 설정
    },
    content: {
      backgroundColor: 'white', // 모달 내용의 배경색
      borderRadius: '8px', // 모달의 모서리를 둥글게 만듦
      padding: '20px', // 모달 내용의 여백 설정
      maxWidth: '400px', // 모달 내용의 최대 너비 설정
      margin: 'auto', // 모달을 수평 중앙에 위치
    },
  };

  return (
    <Modal
      isOpen={props.successIsOpen}
      onRequestClose={props.closeSuccess}
      style={modalStyles} // 모달 스타일 적용
    >
      <div className='modal-header'>
        <h1 className='modal-title fs-5'>Health List 👏</h1>
        <button
          type='button'
          className='btn-close'
          onClick={props.closeSuccess}
          aria-label='Close'
        ></button>
      </div>
      <img src={iconUrl} alt="Icon" style={{ width: '320px', height: '320px' }} />
      <div className='modal-body' style={{ textAlign: 'center' }}>저장되었습니다!</div>


      <div className='modal-footer'>
        <button type='button' className='btn btn-primary' onClick={addTask}>
          확인
        </button>
      </div>
    </Modal>
  );
};

export default HealthSuccessModal;

