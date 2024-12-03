// 카카오 로그인 버튼 클릭 시 리다이렉팅으로 카카오로부터 인가코드 요청, 그 코드를 리다이렉팅과 함께 백엔드에 넘겨줘야 함.
import React from 'react';
// import kakaoLoginButton from '/src/assets/img/kakao_login_large_wide.png';
import kakaoLoginButton from '../../../assets/images/sample_images/kakao_login_large_wide.png';

const KakaoLoginButton = () => {
  const REST_API_KEY = import.meta.env.VITE_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = (e) => {
    e.preventDefault();
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
      <button onClick={kakaoLogin} style={{ border: 'none', backgroundColor: 'transparent' }}>
        <img src={kakaoLoginButton} alt='Kakao Login' style={{ width: '325px', height: '50px' }} />
      </button>
    </div>
  );
};

export default KakaoLoginButton;
