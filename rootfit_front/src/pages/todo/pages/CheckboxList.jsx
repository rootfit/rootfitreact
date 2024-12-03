import React, { useState, useContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

import Iconify from '../components/iconify';

import TodoContext from '../context/todoContext';
// import HealthModal from './HealthModal';
// import HealthSuccessModal from './HealthSuccessModal';
import HealthModal from './HealthModal';
import HealthSuccessModal from './HealthSuccessModal';

// ----------------------------------------------------------------------

export default function AppCheckbox(props) {
  // context
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;
  const todoActions = todoValues.actions;

  // 유저 체크박스 상태
  const [listLength, setListLength] = useState(0);
  const [checkSuccess, setCheckSuccess] = useState([]);

  // 모달창 상태
  const [healthModalOpen, setHealthModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // 체크박스 체크 시 상태 변경
  const changeCheckSuccess = (taskId) => {
    let newCheckSuccess = checkSuccess.includes(taskId)
      ? checkSuccess.filter((value) => value !== taskId)
      : [...checkSuccess, taskId];
    setCheckSuccess(newCheckSuccess);
  };

  // 헬스리스트 모달 상태 변경
  const changeHealthModal = () => {
    let newHealthMoal = !healthModalOpen;
    setHealthModalOpen(newHealthMoal);
  };

  // 달성률 모달 상태 변경
  const changeSuccessModal = () => {
    let newSuccessModal = !successModalOpen;
    setSuccessModalOpen(newSuccessModal);
  };

  // 달성도 모달창 출력 시
  const addTask = () => {
    let data = [checkSuccess, listLength];
    todoActions.changeTodaySuccess(data);
    changeSuccessModal();
  };

  useEffect(() => {
    todoActions.getHealthList();
  }, []);

  return (
    <Card props={props}>
      {/* 상단 */}
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
        <CardHeader title='오늘의 헬스리스트' />

        <Button
          variant='contained'
          color='inherit'
          startIcon={<Iconify icon='eva:plus-fill' />}
          onClick={() => changeHealthModal()}
        >
          헬스리스트 추가
        </Button>

        <HealthModal
          userID={props.userID}
          healthModalOpen={healthModalOpen}
          changeHealthModal={changeHealthModal}
          setListLength={setListLength}
        />
      </Stack>

      {/* 중간 */}
      {todoState.todayTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          checked={checkSuccess.includes(task.id)}
          onChange={() => changeCheckSuccess(task.id)}
        />
      ))}

      {/* 하단 */}
      <Button
        variant='contained'
        color='inherit'
        startIcon={<Iconify icon='eva:plus-fill' />}
        onClick={addTask}
      >
        달성도 저장
      </Button>

      <HealthSuccessModal
        userID={props.userID}
        successModalOpen={successModalOpen}
        changeSuccessModal={changeSuccessModal}
      />
    </Card>
  );
}

//
function TaskItem({ task, checked, onChange }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    console.info('MARK COMPLETE', task.id);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.info('SHARE', task.id);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.info('EDIT', task.id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.info('DELETE', task.id);
  };

  //
  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          pl: 2,
          pr: 1,
          py: 1,
          '&:not(:last-of-type)': {
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          },
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={task.name}
          sx={{ flexGrow: 1, m: 0 }}
        />

        <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
          <Iconify icon='eva:more-vertical-fill' />
        </IconButton>
      </Stack>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon='eva:checkmark-circle-2-fill' sx={{ mr: 2 }} />
          Mark Complete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon='solar:pen-bold' sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon='solar:share-bold' sx={{ mr: 2 }} />
          Share
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon='solar:trash-bin-trash-bold' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.object,
};
