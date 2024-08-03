import { useState, useContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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

// import HealthModal from './HealthModal';
// import HealthSuccessModal from './HealthSuccessModal';
import TodoContext from '../context/todoContext';
import HealthModal from './app-health-modal';
import HealthSuccessModal from './app-health-success-modal';

// ----------------------------------------------------------------------

export default function AppCheckbox(props) {
  // 체크박스 state - context로 올려야함
  const [todayCheck, setTodayCheck] = useState([
    { id: '1', healthNo: '', healthTitle: '' },
    { id: '2', healthNo: '', healthTitle: '' },
    { id: '3', healthNo: '', healthTitle: '' },
    { id: '4', healthNo: '', healthTitle: '' },
    { id: '5', healthNo: '', healthTitle: '' },
  ]);

  // 체크박스 체크 state - context로 올려야함
  const [selectedCheck, setSelectedCheck] = useState(['2']);

  // 공용 데이터
  const todoValues = useContext(TodoContext);
  const todoState = todoValues.state;
  const todoActions = todoValues.actions;

  // 체크박스 체크 시 상태 변경
  const handleClickComplete = (taskId) => {
    const tasksCompleted = selectedCheck.includes(taskId)
      ? selectedCheck.filter((value) => value !== taskId)
      : [...selectedCheck, taskId];
    setSelectedCheck(tasksCompleted);
    todoActions.handleSuccessboxChange(taskId);
  };

  return (
    <Card props={props}>
      {/* 상단 */}
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
        <CardHeader title={props.title} />
        <Button
          variant='contained'
          color='inherit'
          startIcon={<Iconify icon='eva:plus-fill' />}
          onClick={() => props.openModal()}
        >
          헬스리스트 추가
        </Button>
        <HealthModal
          healthModalOpen={props.healthModalOpen}
          closeModal={props.closeModal}
          userID={props.userID}
          setTodayCheck={setTodayCheck}
        />
      </Stack>

      {/* 중간 */}
      {todoState.loadTitle.map(
        (
          task,
          index // todayCheck 방식으로 바꿔야함
        ) => (
          <TaskItem
            key={index}
            task={task}
            checked={selectedCheck.includes(index)} // 이것도 context에서 받는 식으로 바꿔야 함
            onChange={() => {
              handleClickComplete(index);
            }}
          />
        )
      )}

      {/* 하단 */}
      <Button
        variant='contained'
        color='inherit'
        startIcon={<Iconify icon='eva:plus-fill' />}
        onClick={() => {
          props.openSuccess();
        }}
      >
        달성도 저장
      </Button>
      <HealthSuccessModal
        successModalOpen={props.successModalOpen}
        closeSuccess={props.closeSuccess}
        changeLoadCheck={props.changeLoadCheck}
      />
    </Card>
  );
}

AppCheckbox.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------
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

  // ----------------------------------------------------------------------
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
          label={task.healthTitle}
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
