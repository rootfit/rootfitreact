import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';

// context api
import TodoContext from '../../context/todoContext';

// modal 모음
import HealthModal from '../HealthModal';
import HealthSuccessModal from '../HealthSuccessModal';

// (구) section 모음
import CheckboxList from '../CheckboxList';
import TodayReport from '../TodayReport';
import WeekReport from '../WeekReport';
import MonthReport from '../MonthReport';
import YearReport from '../YearReport';

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

// -----------------------------------------------------------------------

const HealthList = (props) => {
  // 1. state 초기값 설정
  const [tasks, setTasks] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsopen] = useState(false);

  // 공용 데이터 불러옴
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;
  const todoActions = todoValues.actions;

  // 헬스리스트 추가 모달 열기
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 헬스리스트 추가 모달 닫기
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 달성률 저장 모달 열기
  const openSuccess = () => {
    const todaySuccessIndex = [];
    todoState.successState.forEach((item, index) => {
      if (item === true) todaySuccessIndex.push(index);
    });
    // console.log('.....', todaySuccessIndex.length)
    if (todaySuccessIndex.length > 0) {
      setSuccessIsopen(true);
    } else {
      alert('달성하신 목표를 1개 이상 체크하셔야 저장할 수 있어요!');
    }
  };

  // 달성률 저장 모달 닫기
  const closeSuccess = () => {
    setSuccessIsopen(false);
  };

  // 자정에 초기화하는 함수
  const resetTasksAtMidnight = () => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeUntilMidnight = midnight - now;
    setTimeout(() => {
      setTasks([]);
    }, timeUntilMidnight);
  };

  // 달성도 서버에 업데이트하는 함수
  const updateLoadCheck = useCallback(async (data) => {
    const resp = await axios.post('http://localhost:8000/todo/updatesuccess/', data);
  }, []);

  // 달성도 상태 업데이트하는 함수
  const changeLoadCheck = () => {
    const todaySuccessIndex = [];
    todoState.successState.forEach((item, index) => {
      if (item === true) todaySuccessIndex.push(index);
    });
    let todaySuccessList = {};
    if (todaySuccessIndex.length > 0) {
      todoState.loadNo.forEach((item, index) => {
        todaySuccessList[todoState.loadNo[index]] = todoState.successState[index];
      });
      todaySuccessList['id'] = props.userID;
      todaySuccessList['successPercent'] = todoState.successPercent;
      updateLoadCheck(todaySuccessList); // 누적 데이터 업데이트
    } else {
      alert('달성하신 목표를 1개 이상 체크하셔야 저장할 수 있어요!');
    }
  };

  // useEffect를 이용한 자정 초기화 및 데이터 로딩
  useEffect(() => {
    resetTasksAtMidnight();
    const intervalId = setInterval(() => {
      resetTasksAtMidnight();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // 유저 누적 데이터 업데이트
  useEffect(() => {
    todoActions.getLoadSelect(props.userID);
  }, [modalIsOpen]);

  // 유저 달성률 업데이트
  useEffect(() => {
    if (successIsOpen === true) {
      todoActions.changeGraphReport();
      todoActions.changeThisWeek();
      todoActions.changeThisMonth();
    }
  }, [successIsOpen]);

  return (
    <Container maxWidth='xl'>
      <Typography variant='h4' sx={{ mb: 5 }}>
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
        {/* 체크박스 */}
        <Grid xs={12} md={6} lg={8}>
          <AppCheckbox
            title='오늘의 헬스리스트'
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
            openModal={openModal}
            closeModal={closeModal}
            openSuccess={openSuccess}
            closeSuccess={closeSuccess}
            modalIsOpen={modalIsOpen}
            successIsOpen={successIsOpen}
            userID={props.userID}
            changeLoadCheck={changeLoadCheck}
          />
        </Grid>

        {/* 도넛 그래프 */}
        <Grid xs={12} md={6} lg={4}>
          <AppTodaySuccess
            title='오늘의 달성률'
            successIsOpen={successIsOpen}
            closeSuccess={closeSuccess}
            chart={{
              series: [
                { label: '남은 목표', value: todoState.letsgoPercent },
                { label: '달성률', value: todoState.successPercent },
              ],
            }}
          />
        </Grid>

        {/* 가로세로선 그래프 */}
        <Grid xs={12} md={6} lg={12}>
          <AppWeekSuccess
            title='이번주 달성률'
            subheader='(+43%) than last year'
            chart={{
              series: [
                { label: 'Mon', value: todoState.weekDate[0] },
                { label: 'Tue', value: todoState.weekDate[1] },
                { label: 'Wen', value: todoState.weekDate[2] },
                { label: 'Thu', value: todoState.weekDate[3] },
                { label: 'Fri', value: todoState.weekDate[4] },
                { label: 'Sat', value: todoState.weekDate[5] },
                { label: 'Sun', value: todoState.weekDate[6] },
              ],
            }}
            successIsOpen={successIsOpen}
            closeSuccess={closeSuccess}
          />
        </Grid>

        {/* 곡선 그래프 */}
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
            successIsOpen={successIsOpen}
            closeSuccess={closeSuccess}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HealthList;
