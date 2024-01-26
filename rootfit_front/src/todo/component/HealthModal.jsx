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

  useState(() => {
    getHealthList();
  }, [getHealthList]);

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <h2>모달 내용</h2>

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

      {/* 추가 버튼 */}
      <button onClick={addTask} className='btn btn-success mt-3'>
        추가
      </button>
    </Modal>
  );
};

export default HealthModal;
