import React, { useCallback, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import WeekGraph from './WeekGraph';

import TodoContext from '../context/todoContext';

const WeekReport = (props) => {
  // 헬스리스트 데이터 불러옴
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;

  const thisWeek = () => {
    // 올해 이번달 데이터 구하기
    const thisMonthData = [];
    const yearData = todoState.yearData;
    yearData.forEach((item, index) => {
      if (
        item['year'] === todoState.currentDate.getFullYear() &&
        item['month'] === todoState.currentDate.getMonth() + 1
      ) {
        thisMonthData.push(item);
      }
    });

    // 이번주 데이터만 구하기
    const todayDay = todoState.currentDate.getDay();
    const todayDate = todoState.currentDate.getDate();
    const start = todayDate - todayDay;
    const end = todayDate + 6 - todayDay;
    let result = [0, 0, 0, 0, 0, 0, 0];
    thisMonthData.forEach((item, index) => {
      if (end >= item['date'] && item['date'] >= start) {
        result[item['day']] = item['value'];
      }
    });
    return result;
  };

  const thisWeekSuccess = thisWeek();

  const weekChartData = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Success Percent',
        data: thisWeekSuccess,
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
