// HealthModal.jsx

import React from 'react';
import Modal from 'react-modal';

const HealthModal = ({ modalIsOpen, closeModal, addTask, checkboxState, setCheckboxState }) => {
    return (
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
            <button onClick={addTask} className="btn btn-success mt-3">
                추가
            </button>
        </Modal>
    );
};

export default HealthModal;
