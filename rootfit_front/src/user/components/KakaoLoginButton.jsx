// 카카오 로그인 버튼 클릭 시 리다이렉팅으로 카카오로부터 인가코드 요청, 그 코드를 리다이렉팅과 함께 백엔드에 넘겨줘야 함. 

import React from "react";
import axios from "axios"

const KakaoLoginButton = () => {
  const REST_API_KEY = "d5c90c81d4cdc41b9887827fe3437743"
  const REDIRECT_URI = "http://localhost:5173/user/kakaoLogin";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh" }}>
      <button onClick={kakaoLogin} style={{ backgroundImage: "url('/src/assets/img/kakao_login_large_wide.png')", backgroundSize: "cover", margin: "5px auto", width: "500px", height: "70px", border: "none" }}>
      </button>
      {/* <button onClick={kakaoLogin}>카카오 로그인</button> */}
    </div>
  );
};

export default KakaoLoginButton;

