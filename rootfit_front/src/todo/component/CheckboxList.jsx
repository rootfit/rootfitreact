import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types'; // PropTypes 추가

import TodoContext from '../context/todoContext';

const CheckboxList = () => {
    // 헬스리스트 데이터 불러옴
    const todoValues = useContext(TodoContext);
    const todoState = todoValues.state;
    const todoActions = todoValues.actions;
    // console.log('CheckboxList', todoValues);
    return (
        <ul className=' list-group mt-2 list-inline mx-auto justify-content-center'>
            {todoState.loadTitle.map((task, index) => (
                <li
                    key={index}
                    className='list-group-item d-flex justify-content-between align-items-center'
                >
                    {task.healthTitle}
                    <input
                        type='checkbox'
                        checked={todoState.checkboxState[index]}
                        onChange={() => todoActions.changeCheckboxState(index)}
                        className='mx-2 checkbox'
                        style={{ height: '45px', width: '25px', fontWeight: 'bold' }}
                    />
                </li>
            ))}
        </ul>
    );
};

CheckboxList.propTypes = {
    items: PropTypes.array.isRequired,
    checkboxState: PropTypes.array.isRequired,
    onCheckboxChange: PropTypes.func.isRequired,
};

export default CheckboxList;
