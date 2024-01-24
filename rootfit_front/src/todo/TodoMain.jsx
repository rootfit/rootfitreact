// url 지정: localhost:5173/todo 하자!

import HealthList from './component/HealthList'
import MonthReport from './component/MonthReport'
import TodayReport from './component/TodayReport'




// npm install react-modal 필요! 깃 한다음에 해야지~

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
// import { Route, Routes } from 'react-router-dom' 이건 필요?


const TodoMain = () => {
    //state 정의

    const [tasks, setTasks] = useState([]);  // 현재의 태스크 목록을 저장하는 state
    const [selectedTask, setSelectedTask] = useState('');  // 모달에서 선택한 태스크를 저장하는 state
    const [modalIsOpen, setModalIsOpen] = useState(false);  // 모달의 열림/닫힘 상태를 저장하는 state

    // useEffect를 사용하여 컴포넌트가 마운트되었을 때 한 번만 실행되도록 함
    useEffect(() => {
        // JSON 파일로부터 데이터를 가져와 초기화
        fetch('./tasks.json')  //현재 같은 디렉토리라 상대경로
            .then((response) => response.json())
            .then((data) => setTasks(data.taskOptions))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []); // 빈 배열은 이 effect가 한 번만 실행되도록 함

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
            setTasks([...tasks, selectedTask]);
            setSelectedTask('');
            closeModal();
        }
    };

    // 태스크 삭제
    const deleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    // 이거 어떻게 해야하지
    // <Routes>
    //     <Route path='/list' element={<HealthList />} />
    //     <Route path='/list' element={<MonthReport />} />
    //     <Route path='/list' element={<TodayReport />} />
    //     {/* <Route path='/detail/:id' element={<TodayReport/>} /> */}
    // </Routes>

    // 컴포넌트 렌더링
    return (
        <div>
            <h1>Health List</h1>
            <div>
                {/* 새로운 헬스리스트추가 버튼 */}
                <button onClick={openModal}>새로운 헬스리스트 추가</button>
            </div>
            <ul>
                {/* 헬스리스트 목록 출력 */}
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                        {/* 헬스리스트 삭제 버튼 */}
                        <button onClick={() => deleteTask(index)}>삭제</button>
                    </li>
                ))}
            </ul>

            {/* 새로운 헬스리스트를 입력하기 위한 모달 */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="새로운 헬스리스트 추가"
            >
                <h2>새로운 헬스리스트 추가</h2>
                {/* 새로운 태스크를 선택하는 드롭다운 */}
                <select
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                >
                    <option value="" disabled>
                        선택하세요
                    </option>
                    {/* JSON 파일에서 불러온 헬스리스트 목록을 출력 */}
                    {tasks.map((task, index) => (
                        <option key={index} value={task}>
                            {task}
                        </option>
                    ))}
                </select>
                {/* 새로운 헬스리스트 추가 버튼 */}
                <button onClick={addTask}>추가</button>
                {/* 모달 닫기 버튼 */}
                <button onClick={closeModal}>닫기</button>
            </Modal>
        </div>
    );
};

export default Todomain;