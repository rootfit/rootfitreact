import React, { useState } from 'react';
// import Modal from 'react-modal'; // react-modal import

const HealthList = () => {
    // state 정의
    const [tasks, setTasks] = useState([]); // 현재의 태스크 목록을 저장하는 state
    const [selectedTask, setSelectedTask] = useState(''); // 모달에서 선택한 태스크를 저장하는 state
    const [modalIsOpen, setModalIsOpen] = useState(false); // 모달의 열림/닫힘 상태를 저장하는 state

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

    // 컴포넌트 렌더링
    return (
        <div>
            <h1>Health List</h1>
            <h1>HealthList여기여기여기!!!!!</h1>
            <div style={{ marginTop: '200px' }}>

                {/* 새로운 헬스리스트 추가 버튼 */}
                <button onClick={openModal}>새로운 헬스리스트 추가</button>
                {/* <Modal */}
                    {/* isOpen={modalIsOpen} */}
                    {/* onRequestClose={closeModal} */}
                {/* > */}
                    {/* 모달 내용 추가 */}
                    {/* <h2>모달 내용</h2> */}
                    {/* <button onClick={addTask}>추가</button> */}
                {/* </Modal> */}
                
            </div>
        </div>
    );
};

export default HealthList;
