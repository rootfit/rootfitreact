import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import ReportGraph from './Graph';

const TodayReport = (props) => {
  const [updateNo, setUpdateNo] = useState([]);
  const [updateReport, setUpdateReport] = useState([]);
  const [reachPercent, setReachPercent] = useState(0);
  const [goPercent, setGoPercent] = useState(100);

  const initGraphReport = () => {
    console.log('언디파인!');
  };

  const changeGraphReport = useCallback(() => {
    const newSuccess = props.successState.slice(0, props.update.length);
    setUpdateNo(props.update);
    setUpdateReport(props.newSuccess);

    let cnt = 0;
    newSuccess.forEach((item) => {
      if (item === true) cnt += 1;
    });
    const reach = Math.floor((cnt / props.update.length) * 100);
    const go = 100 - reach;
    setReachPercent(reach);
    setGoPercent(go);
  });

  const data = [
    {
      id: '화이팅!',
      label: '화이팅!',
      value: goPercent,
      color: 'hsl(262, 70%, 50%)',
    },
    {
      id: '달성률',
      label: '달성률',
      value: reachPercent,
      color: 'hsl(244, 70%, 50%)',
    },
  ];

  useEffect(() => {
    initGraphReport();
  }, []);

  useEffect(() => {
    if (props.successIsOpen === true) {
      changeGraphReport();
    }
  }, [props.successIsOpen]);

  return (
    <div style={{ height: '35rem', width: '35rem' }}>
      <ReportGraph data={data} />
    </div>
  );
};

export default TodayReport;
