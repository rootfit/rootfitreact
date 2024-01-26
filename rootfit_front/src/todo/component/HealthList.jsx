import React, { useState } from 'react';
import Modal from 'react-modal'; //주석푸세요

const HealthList = () => {
    // 상태(state) 정의
    const [tasks, setTasks] = useState([]); // 현재의 태스크 목록을 저장하는 state
    const [selectedTask, setSelectedTask] = useState(''); // 모달에서 선택한 태스크를 저장하는 state
    const [modalIsOpen, setModalIsOpen] = useState(false); // 모달의 열림/닫힘 상태를 저장하는 state
    const [checkboxState, setCheckboxState] = useState(false); // 체크박스 상태를 저장하는 state

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
            // 선택한 태스크와 체크박스 상태를 tasks에 추가
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

    // 컴포넌트 렌더링
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
                <button onClick={openModal} className="btn btn-secondary">헬스리스트 추가</button>

                {/* 모달 */}
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                    <h2>모달 내용</h2>

                    {/* 체크박스 */}
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            checked={checkboxState} // 체크박스 상태 반영
                            onChange={() => setCheckboxState(!checkboxState)} // 체크박스 상태 변경 처리
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Default checkbox
                        </label>
                    </div>

                    {/* 추가 버튼 */}
                    <button onClick={addTask} className="btn btn-success mt-3">추가</button>
                </Modal>

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
                            <button onClick={() => deleteTask(index)} className="btn btn-danger">삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HealthList;
