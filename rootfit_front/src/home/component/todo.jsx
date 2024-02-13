// src/home/component/todo.jsx

import React, { useState, useEffect , useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate import 추가
import axios from 'axios';
import CheckboxList from '../../todo/component/CheckboxList';

import UserContext from '../../user/context/UserContext'

const Todo = () => {
    const navigate = useNavigate();
    const [healthList, setHealthList] = useState([]);
    const [checkboxState, setCheckboxState] = useState([]); // checkboxState 추가

    const userInfo = useContext(UserContext)

    useEffect(() => {
        const fetchHealthList = async () => {
            try {
                const resp = await axios.get('http://localhost:8000/todo/loadselect/'+userInfo.state.user.id);
                setHealthList(resp.data.data);
            } catch (error) {
                console.error('Error fetching health list:', error);
            }
        };

        fetchHealthList();
    }, []);

    const handleCheckboxChange = (index) => {
        const newCheckboxState = [...checkboxState];
        newCheckboxState[index] = !newCheckboxState[index];
        setCheckboxState(newCheckboxState);
    };

    return (
        <div className='container'>
            <br />
            <br />
            <h3 className='center' type="button" onClick={() => navigate('/todo')}>💪 나만의 헬스리스트 🏋️‍♂️</h3>
            <span className='center'>건강한 삶의 시작은 여기서부터!</span>
            <br />
            <br />

            {/* CheckboxList 컴포넌트. */}
            <CheckboxList
                items={healthList}
                checkboxState={checkboxState}
                onCheckboxChange={handleCheckboxChange}
            />
        </div>
    );
};

export default Todo;
