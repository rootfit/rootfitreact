import React, { useState, useEffect } from 'react';
import Home from "./component/Home";
import RecentBoardList from "./component/board"
import RecentProductList from "./component/shopping"
// import 쇼핑어쩌구
import Health from "./component/todo";
import iconUrl from './component/icon/rootfit_logo.png'; // 경로를 프로젝트 구조에 맞게 수정

const HomeMain = () => {
  // const 투두랜덤함수 = () => {
  //   // 아이디 비교 로직( 보드디테일 참고 가능~! )

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

  return (
    <div className="container">
      <div className="row">
        <div className={`rootfit-container text-center ${shouldAnimate ? 'animate' : ''}`}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <img src={iconUrl} alt="Icon" className="image" />
          </span>
        </div>
        <hr className="hr-solid" />
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
          <Health />
          {/* todo.jsx에 위아래 여백 더 주세요 */}
        </div>
        <hr className="hr-solid" />


        {/* shop */}
        <div>
          <RecentProductList />
        </div>
        <hr className="hr-solid" />


        {/* board */}
        <div>
          <RecentBoardList />
        </div>
      </div>
    </div>
  )
}
export default HomeMain