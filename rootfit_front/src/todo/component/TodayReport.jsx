import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import ReportGraph from './Graph';

const TodayReport = () => {
  const data = [
    {
      id: 'erlang',
      label: 'erlang',
      value: 10,
      color: 'hsl(262, 70%, 50%)',
    },
    {
      id: '달성률',
      label: '달성률',
      value: 90,
      color: 'hsl(244, 70%, 50%)',
    },
  ];

  return (
    <div style={{ height: '500px', width: '600px' }}>
      <ReportGraph data={data} />
    </div>
  );
};

export default TodayReport;
