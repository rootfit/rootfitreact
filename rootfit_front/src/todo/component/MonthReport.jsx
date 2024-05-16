import React, { useCallback, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MonthGraph from './MonthGraph';

import TodoContext from '../context/todoContext';

const MonthReport = (props) => {
  // 헬스리스트 데이터 불러옴
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;

  const thisMonth = () => {
    // 올해 이번달 데이터 구하기
    const monthSuccess = [];
    const monthDate = [];
    const yearData = todoState.yearData;
    let result = [];

    // 이번달 데이터 편집
    yearData.forEach((item, index) => {
      if (
        item['year'] === todoState.currentDate.getFullYear() &&
        item['month'] === todoState.currentDate.getMonth() + 1
      ) {
        monthSuccess.push(`${item['value']}`);
        monthDate.push(`${item['month']}/${item['date']}`);
      }
    });
    result = [monthDate, monthSuccess];

    return result;
  };

  const thisMonthSuccess = thisMonth();

  const monthChartData = {
    labels: thisMonthSuccess[0],
    datasets: [
      {
        label: 'Success Percent',
        data: thisMonthSuccess[1],
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
