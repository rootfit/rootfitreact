import React, { useCallback, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TodayGraph from './TodayGraph';

import TodoContext from '../context/todoContext';

const TodayReport = (props) => {
  // 헬스리스트 데이터 불러옴
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;

  const data = [
    {
      id: '화이팅!',
      label: '화이팅!',
      value: todoState.letsgoPercent,
      color: 'hsl(262, 70%, 50%)',
    },
    {
      id: '달성률',
      label: '달성률',
      value: todoState.successPercent,
      color: 'hsl(244, 70%, 50%)',
    },
  ];

  return (
    <div style={{ height: '35rem', width: '35rem' }}>
      <TodayGraph data={data} />
    </div>
  );
};

export default TodayReport;
