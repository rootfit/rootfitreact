import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';

// context api
import TodoContext from '../../context/todoContext';

// (구) section 모음
// import CheckboxList from '../CheckboxList';
// import TodayReport from '../TodayReport';
// import WeekReport from '../WeekReport';
// import MonthReport from '../MonthReport';
// import YearReport from '../YearReport';

// (신) section 모음
import AppCheckbox from '../app-checkbox';
import AppTodaySuccess from '../app-today-success-chart';
import AppWeekSuccess from '../app-week-success-chart';
import AppYearSuccess from '../app-year-success-chart';

// (신) 필요 모듈 모음
import { faker } from '@faker-js/faker';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const HealthList = (props) => {
  const [tasks, setTasks] = useState('');

  // Context 데이터
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;
  const todoActions = todoValues.actions;

  // ----------------------------------------------------------------------

  // checkbox 컴포넌트로 옮길 예정인 함수들
  // 자정에 초기화하는 함수
  const resetTasksAtMidnight = () => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeUntilMidnight = midnight - now;
    setTimeout(() => {
      setTasks([]);
    }, timeUntilMidnight);
  };

  // useEffect를 이용한 자정 초기화 및 데이터 로딩
  useEffect(() => {
    resetTasksAtMidnight();
    const intervalId = setInterval(() => {
      resetTasksAtMidnight();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // ----------------------------------------------------------------------

  return (
    <Container maxWidth='xl'>
      {/* 타이틀 */}
      <Typography variant='h3' sx={{ mb: 5 }}>
        💪헬스리스트🏋️‍♂️
      </Typography>
      <Typography variant='h6' sx={{ mb: 5 }}>
        헬스리스트에 어서오세요👋
        <br />
        건강한 일상을 가꾸는 소소한 루틴💪
        <br />
        헬스리스트와 함께 매일 루틴을 체크해봐요!💫
      </Typography>

      {/* 오늘 날짜 */}
      <p className='text-center mb-4'>{todoState.formattedDate}</p>

      <Grid container spacing={3}>
        {/* 헬스리스트 체크박스 */}
        <Grid xs={12} md={6} lg={8}>
          <AppCheckbox userID={props.userID} />
        </Grid>

        {/* 오늘 달성률 그래프 */}
        <Grid xs={12} md={6} lg={4}>
          <AppTodaySuccess
            title='오늘의 달성률'
            chart={{
              series: [
                { label: '남은 목표', value: 100 - todoState.successPercent },
                { label: '달성률', value: todoState.successPercent },
              ],
            }}
          />
        </Grid>

        {/* 이번주 달성률 그래프 */}
        <Grid xs={12} md={6} lg={12}>
          <AppWeekSuccess
            title='이번주 달성률'
            subheader='(+43%) than last year'
            chart={{
              series: [
                { label: 'Mon', value: 0 },
                { label: 'Tue', value: 1 },
                { label: 'Wen', value: 2 },
                { label: 'Thu', value: 3 },
                { label: 'Fri', value: 4 },
                { label: 'Sat', value: 5 },
                { label: 'Sun', value: 6 },
              ],
            }}
          />
        </Grid>

        {/* 올해 달성률 그래프 */}
        <Grid xs={12} md={6} lg={12}>
          <AppYearSuccess
            title='올해 달성률'
            subheader='(+43%) than last year'
            chart={{
              labels: [
                '01/01/2024',
                '02/01/2024',
                '03/01/2024',
                '04/01/2024',
                '05/01/2024',
                '06/01/2024',
                '07/01/2024',
                '08/01/2024',
                '09/01/2024',
                '10/01/2024',
                '11/01/2024',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HealthList;
