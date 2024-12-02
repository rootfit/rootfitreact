import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../context/UserContext';
import { useContext } from 'react';

import KakaoLoginButton from './KakaoLoginButton';

const SignIn = () => {
  const navigate = useNavigate();
  const value = useContext(UserContext)
  const [data, setData] = useState({ id: '', password: '' });

  const changeData = useCallback((e) => {
    setData((data) => ({ ...data, [e.target.id]: e.target.value }))
  }, []);

  const signin = async (e) => {
    e.preventDefault()

    try {
      const resp = await axios.post('http://localhost:8000/user/signin', data, { withCredentials: true })

      if (resp.data.status === 500) {
        window.alert('00' + resp.data.message)
      } else {
        value.actions.addUser(resp.data.data)

        // redirect 선언 및 기능추가
        const params = new URLSearchParams(window.location.search);
        const redirectUrl = params.get('redirect');

        // 로그인 후 유저가 보고있던 페이지로 이동
        navigate(redirectUrl || '/');
      }
    } catch (error) {
      console.error('로그인 요청 중 에러 발생:', error);
      window.alert('로그인 요청 중 에러가 발생했습니다.');
    }
  }

  return (
    <main id="main">
      <section className="section-signin1">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="page-title">Sign in</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section-login">
        <div className="container">
          <div className="row justify-content-center">
            <form className="col-sm-5" onSubmit={signin} style={{ maxWidth: '350px' }}>
              <div className="mb-2">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    value={data.id}
                    onChange={changeData}
                    style={{ height: '60px' }}
                  />
                  <label htmlFor="id">ID</label>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={changeData}
                    style={{ height: '60px' }}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="mb-2 d-grid gap-1">
                <button
                  type="submit"
                  className="btn btn-dark"
                  style={{ height: '60px', fontWeight: 'bold' }}>
                  로그인
                </button>
              </div>
            </form>
            <div>
              <KakaoLoginButton />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignIn;
