import React, { useState } from 'react';
import axios from 'axios';

const TodayReport = () => {
  const [todayReport, setTodayReport] = useState({ data: [1, 2, 3] });

  return (
    <div>
      <h2>TodayReport</h2>
      {/* 이미지 */}
      <img
        src='../assets/img/post-sq-1.jpg'
        style={{ weight: '200px', height: '200px' }}
        alt='...'
      ></img>
      {/* 차트1 */}
      {todayReport.data.map((data) => (
        <div key={data}>
          <div className='col-3 p-3 mb-2' style={{ backgroundColor: 'var(--color-orange)' }}>
            {data}
          </div>
        </div>
      ))}
      {/* 차트2 */}
      <div className='col-3 p-3 mb-2' style={{ backgroundColor: 'var(--color-orange)' }}>
        .col-3: width of 25%
      </div>
      <div className='col-sm-9 p-3' style={{ backgroundColor: 'var(--color-green)' }}>
        .col-sm-9: width of 75% above sm breakpoint
      </div>
    </div>
  );
};

export default TodayReport;
