// HealthList.jsx

import React, { useState } from 'react';
import HealthModal from './HealthModal';

const HealthList = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [checkboxState, setCheckboxState] = useState(false);

    // 모달 열기
    const openModal = () => {
        setModalIsOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // 새로운 태스크 추가
    const addTask = () => {
        if (selectedTask.trim() !== '') {
            setTasks([...tasks, { task: selectedTask, checked: checkboxState }]);
            setSelectedTask('');
            setCheckboxState(false); // 추가 후 체크박스 상태 초기화
            closeModal(); // 모달 닫기
        }
    };

    // 태스크 삭제
    const deleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    // 현재 날짜 정보 가져오기
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;

    return (
        <div className="container mt-5">
            {/* 페이지 제목 */}
            <h1 className="text-center mb-4">건강한 일상을 가꾸는 소소한 루틴</h1>
            <h1 className="text-center mb-4">💪 Health List</h1>
            <h2 className="text-center mb-4">HealthList를 추가하고 매일 루틴을 체크해봐요💫</h2>

            {/* 현재 날짜 표시 */}
            <p className="text-center mb-4">{formattedDate}</p>

            <div className="d-flex justify-content-center mb-5">
                {/* 새로운 헬스리스트 추가 버튼 */}
                <button onClick={openModal} className="btn btn-secondary">
                    헬스리스트 추가
                </button>
                {/* 모달 */}
                <HealthModal
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                    addTask={addTask}
                    checkboxState={checkboxState}
                    setCheckboxState={setCheckboxState}
                />
                {/* 헬스리스트 목록 */}
                <ul className="list-group mt-3">
                    {tasks.map((task, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {/* 태스크 내용 */}
                            {task.task}
                            {/* 체크박스 */}
                            <input
                                type="checkbox"
                                checked={task.checked}
                                onChange={() => {
                                    // 체크박스 상태 변경 처리
                                    const updatedTasks = [...tasks];
                                    updatedTasks[index].checked = !task.checked;
                                    setTasks(updatedTasks);
                                }}
                                className="mx-2"
                            />
                            {/* 삭제 버튼 */}
                            <button onClick={() => deleteTask(index)} className="btn btn-danger">
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HealthList;
