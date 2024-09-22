import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';

import HealthList from './health-app-view';

// 템플릿 모듈
import '../../global.css';
import { useScrollToTop } from '../../hooks/use-scroll-to-top';
import ThemeProvider from '../../theme';

// context api
import UserContext from '../../../user/context/UserContext';

//-------------------------------------------------------------------

const TodoMain = () => {
  // Context 데이터
  const values = useContext(UserContext);
  const userID = values.state.user.id;

  const navigate = useNavigate();

  // 회원 여부 체크
  const checkMember = useCallback(() => {
    const currentUrl = '/todo';
    if (userID === '') {
      navigate(`/user/signin?redirect=${encodeURIComponent(currentUrl)}`);
    } else {
      navigate(currentUrl);
    }
  });

  useEffect(() => {
    checkMember();
  }, []);

  useScrollToTop();

  return (
    <div>
      <ThemeProvider>
        <Routes>
          <Route path='/' element={<HealthList userID={userID} />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default TodoMain;
