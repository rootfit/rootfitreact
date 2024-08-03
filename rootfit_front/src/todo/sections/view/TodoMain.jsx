import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';

import HealthList from './health-app-view';

// 템플릿 모듈
import '../../global.css';
import { useScrollToTop } from '../../hooks/use-scroll-to-top';
import ThemeProvider from '../../theme';

// context api
import UserContext from '../../../user/context/UserContext';
import TodoContext from '../../context/todoContext';

//-------------------------------------------------------------------

const TodoContainer = () => {
  // 유저 Context
  const values = useContext(UserContext);
  const userID = values.state.user.id;

  // 헬스리스트 Context
  const todoValues = useContext(TodoContext);
  const todoActions = todoValues.actions;

  const navigate = useNavigate();

  // 회원 여부 체크
  const checkMember = useCallback(() => {
    const currentUrl = '/todo';
    //로그인하지 않은 경우
    if (userID === '') {
      //로그인 페이지에서 로그인후 다시 보고있던 페이지로 원복 -> SignIn.jsx에 redirect 연계해야함.
      navigate(`/user/signin?redirect=${encodeURIComponent(currentUrl)}`);
      return;
    } else {
      //로그인한 경우
      todoActions.getLoadSelect(userID);
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

export default TodoContainer;
