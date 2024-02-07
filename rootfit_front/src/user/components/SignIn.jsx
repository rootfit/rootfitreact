import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../context/UserContext';
import { useContext } from 'react';

import KakaoLogin from './KakaoLogin';

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
        window.alert(resp.data.message)
      } else {
        value.actions.addUser(resp.data.data)
        navigate('/');
        window.alert('로그인 성공하였습니다.');
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
          <div className="row">
            <form className="col-sm-5 mx-auto" onSubmit={signin}>
              <div className="mb-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    value={data.id}
                    onChange={changeData}
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
                  />
                  <label htmlFor="password">
                    Password
                  </label>
                </div>
              </div>
              {/* <div className="mb-3"> */}
                <div className="d-grid gap-2 mx-auto">
                  <button
                    type="submit"
                    className="btn btn-dark"
                    style={{ height: '60px', fontWeight: 'bold' }}>
                    로그인
                  </button>
                {/* </div> */}
                <KakaoLogin />
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
