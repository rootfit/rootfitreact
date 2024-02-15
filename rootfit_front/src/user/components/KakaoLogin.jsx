import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';

const KakaoLogin = () => {
  const navigate = useNavigate()
  const { actions } = useContext(UserContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const code = searchParams.get('code'); // 인가 코드 추출
    const grantType = "authorization_code";
    const REST_API_KEY = import.meta.env.VITE_API_KEY; 
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

    // 카카오 API 호출
    axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
      {},
      { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
    )
      .then((res) => {
        const { access_token } = res.data;

        axios.post(
          `https://kapi.kakao.com/v2/user/me`,
          {},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            }
          }
        )
          .then((res) => {
            const id = res.data.id.toString(); // 카카오 사용자 id
            const nickname = res.data.properties.nickname; // 카카오 사용자 닉네임

            // 서버에 사용자 정보를 전송하여 사용자가 존재 여부
            axios.post('http://localhost:8000/user/checkUser', { id: id })
            .then(res => {
              const userInfo = {
                ...res.data.user,
                id: id,
                nickname: nickname
              };
                
                if(res.data.status === 201){
                  //이미  존재하는 유저, 로그인 성공
                  actions.addUser(userInfo);
                  navigate('/');

                }else if(res.data.status === 202){
                  //존재하지 않는 유저, 회원가입 추가 입력 폼
                  navigate('/user/signup',{ state: userInfo }); 
                }else {
                  console.error('알 수 없는 상태 코드:', res.data.status);
                }
              })
              .catch((error) => {
                console.error('사용자 확인 중 에러', error);
              });
          })
          .catch((error) => {
            console.error('카카오 사용자 정보 요청 중 에러', error);
          });
      })
      .catch((error) => {
        console.error('토큰 요청 중 에러', error);
      });
  }, []);

  return (
    <>
    </>
  );
};

export default KakaoLogin;