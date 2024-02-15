// src/home/component/todo.jsx

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate import 추가
import axios from 'axios';

import CheckboxList from '../../todo/component/CheckboxList';
import UserContext from '../../user/context/UserContext';
import TodayReport from '../../todo/component/TodayReport';

import iconUrl from './icon/icons8-체크리스트.gif';

const Todo = () => {
  const navigate = useNavigate();
  const [healthList, setHealthList] = useState([]);
  const [checkboxState, setCheckboxState] = useState([]); // checkboxState 추가

  const userInfo = useContext(UserContext);

  useEffect(() => {
    const fetchHealthList = async () => {
      try {
        const resp = await axios.get(
          'http://localhost:8000/todo/loadselect/' + userInfo.state.user.id
        );
        setHealthList(resp.data.data);
      } catch (error) {
        console.error('Error fetching health list:', error);
      }
    };

    fetchHealthList();
  }, []);

  const handleCheckboxChange = (index) => {
    const newCheckboxState = [...checkboxState];
    newCheckboxState[index] = !newCheckboxState[index];
    setCheckboxState(newCheckboxState);
  };

  return (
    <div className='container'>
      <br />
      <br />
      {/* <a target="_blank" href="https://icons8.com/icon/RFI53ZLVF5Ga/%EC%B2%B4%ED%81%AC%EB%A6%AC%EC%8A%A4%ED%8A%B8">체크리스트</a> 작가: <a target="_blank" href="https://icons8.com">Icons8</a> */}
      <main id='main'>
        {/* <!-- ======= Culture Category Section ======= --> */}
        <section className='category-section'>
          <div className='container' data-aos='fade-up'>
            <div className='section-header d-flex justify-content-between align-items-center mb-5'>
              <h3 className='center' type='button' onClick={() => navigate('/todo')}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={iconUrl} alt='Icon' style={{ marginRight: '20px' }} />
                  헬스리스트{' '}
                </span>
              </h3>
              <div>
                <Link className='nav-link' to='/todo'>
                  헬스리스트 보러가기
                </Link>
              </div>
            </div>

            <div className='row-cols-1'>
              <div className='col-md-9' style={{ width: '100%' }}>
                <span className='center'>건강한 삶의 시작은 여기서부터!</span>
                <div className='d-lg-flex post-entry-2'>
                  <div className='me-4  mb-4 mb-lg-0 d-inline-block'>
                    {/* 그래프 */}
                    <TodayReport />
                  </div>
                  <div style={{ width: '100%' }}>
                    <div className='post-meta'>
                      <span className='date'>Culture</span> <span className='mx-1'>&bullet;</span>{' '}
                      <span>Jul 5th '22</span>
                    </div>
                    <h3>
                      <a href='single-post.html'>오늘의 목표!</a>
                    </h3>
                    {/* CheckboxList 컴포넌트. */}
                    <CheckboxList
                      items={healthList}
                      checkboxState={checkboxState}
                      onCheckboxChange={handleCheckboxChange}
                    />
                    <br />
                    <br />
                    <br />
                    <div className='d-flex align-items-center author'>
                      <div className='photo'>
                        <img src='assets/img/person-2.jpg' alt='' className='img-fluid' />
                      </div>
                      <div className='name'>
                        <h3 className='m-0 p-0'>안녕하세요 Wade Warren 님!</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Culture Category Section --> */}
      </main>
      <br />
      <br />
    </div>
  );
};

export default Todo;
