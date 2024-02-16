import React, { useState, useEffect, useCallback, useContext } from 'react';
import Home from './component/Home';
import RecentBoardList from './component/board';
import RecentProductList from './component/shopping';
// import 쇼핑어쩌구
import Health from './component/todo';
import iconUrl from './component/icon/rootfit_logo.png'; // 경로를 프로젝트 구조에 맞게 수정

import UserContext from '../user/context/UserContext';

const HomeMain = () => {
  // 로그인 중인 회원 정보를 불러옴
  const values = useContext(UserContext);
  const userID = values.state.user.id;

  //메인 큰 로고 CSS적용
  const [shouldAnimate, setShouldAnimate] = useState(true);
  useEffect(() => {
    // 페이지 로드 후 1초 후에 애니메이션 종료
    const timer = setTimeout(() => {
      setShouldAnimate(false);
    }, 1000);
    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timer);
  }, []);

  // 비로그인시 헬스리스트 출력 비활성화
  const isHealthOpen = useCallback(() => {
    //로그인하지 않은 경우
    if (userID === '') {
      <div></div>;
    } else {
      return <Health />;
    }
  });

  return (
    <div className='container'>
      <div className='row'>
        <div className={`rootfit-container text-center ${shouldAnimate ? 'animate' : ''}`}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <img src={iconUrl} alt='Icon' className='image' />
          </span>
        </div>
        <hr className='hr-solid' />
        <div className='d-flex align-items-center author'>
          <div className='photo'>
            <img src='assets/img/person-2.jpg' alt='' className='img-fluid' />
          </div>
          <div className='name'>
            <h3 className='m-0 p-0'>안녕하세요 Wade Warren 님!</h3>
          </div>
        </div>

        {/* todo */}
        <div>
          {isHealthOpen()}
          {/* todo.jsx에 위아래 여백 더 주세요 */}
        </div>

        {/* shop */}

        <div>
          <RecentProductList />
        </div>

        {/* board */}

        <div>
          <RecentBoardList />
        </div>
      </div>
    </div>
  );
};
export default HomeMain;
