import React, { useCallback, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import WeekGraph from './WeekGraph';

import TodoContext from '../context/todoContext';

const WeekReport = (props) => {
  // 헬스리스트 데이터 불러옴
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;

  const weekChartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Success Percent',
        data: [30, 20, 50, 80, 90, 100, 20],
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
