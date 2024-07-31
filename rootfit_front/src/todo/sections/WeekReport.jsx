import React, { useCallback, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import WeekGraph from './WeekGraph';

import TodoContext from '../context/todoContext';

const WeekReport = (props) => {
  // 헬스리스트 데이터 불러옴
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;

  const weekChartData = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Success Percent',
        data: todoState.weekDate,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return (
    <div style={{ height: '35rem' }}>
      <WeekGraph data={weekChartData} />
    </div>
  );
};

export default WeekReport;
