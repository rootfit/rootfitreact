import React from 'react';
import PropTypes from 'prop-types'; // PropTypes 추가

const CheckboxList = ({ items, checkboxState, onCheckboxChange }) => {
    return (
        <ul className='list-group mt-3 list-inline mx-auto justify-content-center'>
            {items.map((item, index) => (
                <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
                    {item.name}
                    <input
                        type='checkbox'
                        checked={checkboxState[index]}
                        onChange={() => onCheckboxChange(index)}
                        className='checkbox-input' // CSS 클래스 이름 변경
                    />
                </li>
            ))}
        </ul>
    );
};

CheckboxList.propTypes = {
    items: PropTypes.array.isRequired,
    checkboxState: PropTypes.array.isRequired,
    onCheckboxChange: PropTypes.func.isRequired
};

export default CheckboxList;

