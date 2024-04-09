import React, { useCallback, useState, useEffect, useContext } from 'react';

import YearGraph from './YearGraph';
import TodoContext from '../context/todoContext';

const YearReport = (props) => {
  // 헬스리스트 데이터 불러옴
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;
  const todoActions = todoValues.actions;
  const todoDate = todoState.currentDate;

  const data = todoState.yearData;

  useEffect(() => {
    if (props.successIsOpen === true) {
      todoActions.changeGraphReport();
    }
  }, [props.successIsOpen]);

  return (
    <div style={{ height: '20rem', width: '70rem' }}>
      <YearGraph data={data} todoDate={todoDate} />
    </div>
  );
};

export default YearReport;
