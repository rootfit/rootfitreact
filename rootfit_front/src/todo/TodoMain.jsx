import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';

import HealthList from './component/HealthList';

import UserContext from '../user/context/UserContext';
import TodoContext from './context/todoContext';

const TodoContainer = () => {
  // 로그인 중인 회원 정보를 불러옴
  const values = useContext(UserContext);
  const userID = values.state.user.id;

  // 헬스리스트 데이터 불러옴
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;
  const todoActions = todoValues.actions;

  const navigate = useNavigate();

  // 회원인지 체크
  const checkMember = useCallback(() => {
    //로그인하지 않은 경우
    const currentUrl = '/todo';
    if (userID === '') {
      //로그인 페이지에서 로그인후 다시 보고있던 페이지로 원복 -> SignIn.jsx에 redirect 연계해야함.
      navigate(`/user/signin?redirect=${encodeURIComponent(currentUrl)}`);
      return;
    } else {
      todoActions.getLoadSelect(userID);
    }
  });

  useEffect(() => {
    checkMember();
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<HealthList userID={userID} />} />
      </Routes>
    </div>
  );
};

export default TodoContainer;
