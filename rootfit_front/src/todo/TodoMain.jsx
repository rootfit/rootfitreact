import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';

import HealthList from './component/HealthList';
import TodayReport from './component/TodayReport';
// import MonthReport from './component/MonthReport'; 

// npm install react-modal 필요! 깃 한다음에 해야지~!


// import Modal from 'react-modal'; 

const TodoMain = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<HealthList />} />
                <Route path='/1' element={<TodayReport />} />
            </Routes>
        </div>
    );
};

export default TodoMain;