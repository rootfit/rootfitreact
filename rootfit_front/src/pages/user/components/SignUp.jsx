import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router';

const SignUp = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const {id, nickname} = location.state || {};
  const userInfo = location.state;

  let message;
  if (userInfo !== null && userInfo.id !== '') {
    message = (
      <>
      <h4>{userInfo.nickname} ({userInfo.id})님, 반가워요! </h4>
      <h4>회원가입을 위해 추가 회원 정보를 입력해주세요.</h4>
      </>
    );
  } else {
    message = <h4>Root Fit과 함께 건강을 체계적으로 관리해보세요!</h4>
  }

  const [data, setData] = useState({
    id: id || '',
    password: '',
    nickname: nickname || '',
    phone: '',
    email: '',
    addr: '',
    agreeTerms: false, 
  });

  const changeData = useCallback((e) => {
    setData((data) => ({ ...data, [e.target.id]: e.target.value }))
  }, []);

  const toggleTermsAgreement = useCallback(() => {
    setData((data) => ({ ...data, agreeTerms: !data.agreeTerms }))
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/
    return emailRegex.test(String(email).toLowerCase())
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    return passwordRegex.test(String(password).toLowerCase())
  }

  const signup = useCallback(async (e) => {
    e.preventDefault()

    if (
      (!data.id || String(data.id).trim() === '') || 
      ((!id && data.password.trim() === '')) || // 카카오 로그인 아닌 경우, 필수 아님
      data.nickname.trim() === '' ||
      data.phone.trim() === '' ||
      data.email.trim() === '' ||
      data.addr.trim() === ''
    ) {
      window.alert('모든 입력 필드를 작성해주세요.')
      return
    }
    if (!id && !validatePassword(data.password)) { // 카카오 로그인이 아닌 경우에만
      window.alert('비밀번호는 숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요.')
      return
    }
    if (!validateEmail(data.email)) {
      window.alert('이메일 형식에 맞게 입력해주세요.')
      return;
    }
    if (!data.agreeTerms) {
      window.alert('약관에 동의해주세요.')
      return;
    }

    const resp = await axios.post('http://localhost:8000/user/signup', data)

    if (resp.data.status === 500) {
      window.alert('사용자가 존재합니다.')
    } else {
      navigate('/'),
      window.alert('회원가입에 성공하였습니다.');
    }
  }, [data, navigate, validatePassword, validateEmail])

  return (
    <main id="main">
      <section className="section-Signup">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="page-title">Sign up</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section-about">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 mx-auto">
            <div className="text-right mb-5 text-center"  style={{ maxWidth: '100%' }}>
            {message}
              </div>
              
              <div className="row mb-5">
                <label htmlFor="id" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>ID</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="id" name="id" placeholder="아이디" required value={data.id} onChange={changeData} />
                </div>
              </div>
              {!id && ( // 카카오 로그인이 아닌 경우에만 비밀번호 입력 필드
              <div className="row mb-5">
                <label htmlFor="password" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>Password</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="password" name="password" placeholder="숫자+영문자+특수문자 조합 8자리 이상" required value={data.password} onChange={changeData} />
                </div>
              </div>
              )}
              <div className="row mb-5">
                <label htmlFor="nickname" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>Nickname</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="nickname" name="nickname" placeholder="닉네임" required value={data.nickname} onChange={changeData} />
              </div>
              </div>
            
              <div className="row mb-5">
                <label htmlFor="phone" className="col-sm-2 col-form-label"style={{ fontWeight: 'bold' }}>Phone</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="phone" name="phone" placeholder="000-0000-0000" required value={data.phone} onChange={changeData} />
              </div>
              </div>
              <div className="row mb-5">
                <label htmlFor="email" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>E-mail</label>
                <div className="col-sm-10">
                <input type="email" className="form-control" id="email" name="email" placeholder="example@email.com" required value={data.email} onChange={changeData} />
              </div>
              </div>
              <div className="row mb-5">
                <label htmlFor="addr" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>Address</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="addr" name="addr" placeholder="주소" required value={data.addr} onChange={changeData} />
              </div>
              </div>

              <div className="mb-5">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeTerms"
                    checked={data.agreeTerms}
                    onChange={toggleTermsAgreement} />
                  <label className="form-check-label" htmlFor="agreeTerms">
                    (필수) 개인정보 제공 및 이용약관에 동의합니다.
                  </label>
                </div>
              </div>

              <div className="mb-5 text-center">
                <button type="submit" className="btn btn-dark m-1 col-2" style={{ height: '50px', fontWeight: 'bold' }} onClick={signup}>가입</button>
                <button type="button" className="btn btn-dark m-1 col-2" style={{ height: '50px', fontWeight: 'bold' }} onClick={() => navigate('/')}>취소</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignUp