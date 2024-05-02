import React, { useCallback, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MonthGraph from './MonthGraph';

import TodoContext from '../context/todoContext';

const MonthReport = (props) => {
  // 헬스리스트 데이터 불러옴
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;

  const monthChartData = {
    labels: ['1st week', '2nd week', '3rd week', '4th week', '5th week'],
    datasets: [
      {
        label: 'Success Percent',
        data: [30, 20, 50, 80, 90],
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return (
    <div style={{ height: '35rem' }}>
      <MonthGraph data={monthChartData} />
    </div>
  );
};

export default MonthReport;
