// home에 나올 health 파트

import { Link } from 'react-router-dom'; 
import axios from 'axios'; 
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './todo.css'; 

const Health = () => {
    const navigate = useNavigate(); // 페이지 이동 함수
    const [healthList, setHealthList] = useState([]);

    useEffect(() => {
        const fetchHealthList = async () => {
            try {
                const resp = await axios.get('http://localhost:8000/todo'); // Axios를 사용하여 서버에서 데이터를 가져오기
                setHealthList(resp.data.data); // 가져온 데이터를 상태에 업데이트
            } catch (error) {
                console.error('Error health list:', error); // 에러가 발생한 경우 
            }
        };

        fetchHealthList(); 
    }, []); // 빈 배열을 전달하여 이펙트를 한 번만 실행하도록

    return (
        <div className='container'>
            <br />
            <br />
            <h3 className='center' type="button" onClick={() => navigate('/todo')}>💪 나만의 헬스리스트 🏋️‍♂️</h3>
            <span className='center'>건강한 삶의 시작은 여기서부터!</span>
            <br />
            <br />
        </div>
    );
}

export default Health;