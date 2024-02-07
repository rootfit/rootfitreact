import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const HealthModal = (props) => {
  const [selectedTask, setSelectedTask] = useState('');
  const [checkboxStates, setCheckboxStates] = useState([]); // 체크박스 상태를 배열로 관리
  const [healthList, setHealthList] = useState({ status: '', message: '', data: [] });
  const [selected, setSelected] = useState({});

  // 헬스리스트 요청하는 함수
  const getHealthList = useCallback(async () => {
    const resp = await axios.get('http://localhost:8000/todo/healthlist');
    // 헬스리스트의 각 항목에 대한 초기 체크 상태를 false로 설정
    console.log(resp.data.data);
    setCheckboxStates(resp.data.data.map(() => false));
    setHealthList(resp.data);
  }, []);

  // 누적 데이터를 저장하는 함수
  const addSelect = useCallback(async (data) => {
    data['id'] = props.userID;
    console.log('addSaved', data);
    const resp = await axios.post('http://localhost:8000/todo/insertselect', data);
  }, []);

  // 누적 데이터를 업데이트하는 함수
  const updateSelect = useCallback(async (data) => {
    data['id'] = props.userID;
    console.log('update', data);
    const resp = await axios.post('http://localhost:8000/todo/updateselect/', data);
  }, []);

  // 새로운 태스크 추가
  const addTask = () => {
    console.log('addTask...', checkboxStates);

    const todayCheckIndex = [];
    checkboxStates.forEach((item, index) => {
      if (item === true) todayCheckIndex.push(index);
    });
    console.log('todayCheckIndex', todayCheckIndex);

    const todayCheckList = {};
    const selectedList = {};
    if (todayCheckIndex.length > 0) {
      todayCheckIndex.forEach((item) => {
        console.log(item, healthList.data[item]);
        todayCheckList[healthList.data[item].healthNo] = healthList.data[item].healthTitle;
        selectedList[healthList.data[item].healthNo] = false;
      });
      if (props.isSaved === false) {
        addSelect(selectedList); // 누적 데이터 저장
      } else {
        updateSelect(selectedList); // 누적 데이터 업데이트
      }
    }
    console.log('todayCheckList....', todayCheckList);

    if (selectedTask.trim() !== '') {
      // 새로운 태스크를 추가하면서 해당 태스크의 체크 상태를 추가
      setHealthList({ ...healthList, data: [...healthList.data, { healthTitle: selectedTask }] });
      setCheckboxStates([...checkboxStates, false]);
      setSelectedTask('');
      props.closeModal(); // 모달 닫기
    }

    alert('저장되었습니다.'); // 저장되었다는 알림
    props.closeModal(); // 모달 닫기
  };

  // 함수가 한번 실행되어 서버에서 목록을 불러옴
  useState(() => {
    getHealthList();
  }, [healthList]);

  const toggleCheckbox = (index) => {
    // 클릭된 체크박스의 상태를 토글
    setCheckboxStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
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
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={modalStyles} // 모달 스타일 적용
    >
      <div className='modal-header'>
        <h1 className='modal-title fs-5'>Health List 👏</h1>
        <button
          type='button'
          className='btn-close'
          onClick={props.closeModal}
          aria-label='Close'
        ></button>
      </div>
      <div className='modal-body'>
        {/* 체크박스 */}
        <div className='form-check'>
          {healthList.data.map((data, index) => (
            <div key={index}>
              <input
                className='form-check-input'
                type='checkbox'
                value=''
                id={`flexCheckDefault-${index}`}
                checked={checkboxStates[index]} // 체크박스 상태 반영
                onChange={() => toggleCheckbox(index)} // 체크박스 상태 변경 처리
              />
              <label className='form-check-label' htmlFor={`flexCheckDefault-${index}`}>
                {data.healthTitle}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className='modal-footer'>
        <button type='button' className='btn btn-primary' onClick={addTask}>
          Save
        </button>
      </div>
    </Modal>
  );
};

export default HealthModal;
