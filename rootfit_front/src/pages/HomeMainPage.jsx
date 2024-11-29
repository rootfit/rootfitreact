import React, { useState, useEffect, useCallback, useContext } from 'react';
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

  //로그인 회원 환영 문구 자동 nickname 생성
  const {
    state: { user },
  } = useContext(UserContext);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    // 페이지 로드 후 1초 후에 애니메이션 종료
    const timer = setTimeout(() => {
      setShouldAnimate(false);
    }, 1000);
    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timer);
  }, []);

  // 로그인 회원 환영 문구 자동 nickname 생성
  useEffect(() => {
    if (user && user.nickname) {
      setWelcomeMessage(
        <span>
          <span style={{ color: 'blue' }}>{user.nickname}</span> 님! Root Fit과 함께 건강을
          체계적으로 관리해보세요!
        </span>
      );
    }
  }, [user]);

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
        <div className='d-flex align-items-center justify-content-end'>
          <div className='name text-end'>
            <h4 className='m-0 p-0'>{welcomeMessage}</h4>
          </div>
        </div>

        {/* todo */}
        <div>
          {/* {isHealthOpen()} */}
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
