import HealthList from './component/HealthList';
import TodayReport from './component/TodayReport';
// import MonthReport from './component/MonthReport';

// npm install react-modal 필요! 깃 한다음에 해야지~

import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal'; //해야하나
import { Route, Routes } from 'react-router-dom';

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