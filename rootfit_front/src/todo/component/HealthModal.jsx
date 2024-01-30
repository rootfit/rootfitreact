import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const HealthModal = ({ modalIsOpen, closeModal, checkboxState, setCheckboxState }) => {
  const [selectedTask, setSelectedTask] = useState('');
  const [healthList, setHealthList] = useState({ status: '', message: '', data: [] });

  // 헬스리스트 요청하는 함수
  const getHealthList = useCallback(async () => {
    const resp = await axios.get('http://localhost:8000/todo/healthlist');
    setHealthList(resp.data);
  }, []);

  // 새로운 태스크 추가
  const addTask = () => {
    if (selectedTask.trim() !== '') {
      setTasks([...tasks, { task: selectedTask, checked: checkboxState }]);
      setSelectedTask('');
      setCheckboxState(false); // 추가 후 체크박스 상태 초기화
      closeModal(); // 모달 닫기
    }
  };

  // 헬스리스트를 받아올 때 사용할 스타일
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
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyles} // 모달 스타일 적용
    >
      <div className="modal-header">
        <h1 className="modal-title fs-5">Health List 👏</h1>
        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {/* 체크박스 */}
        <div className='form-check'>
          {healthList.data.map((data) => (
            <div key={data.healthNo}>
              <input
                className='form-check-input'
                type='checkbox'
                value=''
                id='flexCheckDefault'
                checked={checkboxState} // 체크박스 상태 반영
                onChange={() => setCheckboxState(!checkboxState)} // 체크박스 상태 변경 처리
              />
              <label className='form-check-label' htmlFor='flexCheckDefault'>
                {data.healthTitle}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="modal-footer">
        {/* <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button> */}
        <button type="button" className="btn btn-primary" onClick={addTask}>Save</button>
      </div>
    </Modal>
  );
};

export default HealthModal;
