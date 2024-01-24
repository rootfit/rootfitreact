import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    id: '',
    password: '',
    nickname: '',
    phone: '',
    email: '',
    addr: '',
    agreeTerms: false, // 약관 동의 체크 상태를 추가
  });

  const changeData = useCallback((e) => {
    setData((data) => ({ ...data, [e.target.id]: e.target.value }));
  }, []);

  const toggleTermsAgreement = useCallback(() => {
    setData((data) => ({ ...data, agreeTerms: !data.agreeTerms }));
  }, []);

  // const validateEmail = (email) => {
  //   const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  //   return emailRegex.test(String(email).toLowerCase());
  // };

    const emailCheck = (username) => {
      return emailRegEx.test(username); 
    }


  const signup = useCallback(async (e) => {
    e.preventDefault();

    if (
      data.id.trim() === '' ||
      data.password.trim() === '' ||
      data.nickname.trim() === '' ||
      data.phone.trim() === '' ||
      data.email.trim() === '' ||
      data.addr.trim() === ''
    ) {
      window.alert('모든 입력 필드를 작성해주세요.');
      return
    }

    if (!data.agreeTerms) {
      window.alert('약관에 동의해주세요.')
      return;
    }

    const resp = await axios.post('http://localhost:8000/user/signup', data);

    if (resp.data.status === 500) {
      window.alert('사용자가 존재합니다.');
    } else {
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <main id="main">
      <section className="section-Signup">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-12 text-center mb-5">
              <h1 className="page-title">Sign up</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section-about">
        <div className="container">
          <div className="row">
            <div className="col-sm-10 mx-auto">
              <form className="mb-3" id="signupForm" data-bs-spy="scroll" data-bs-target="#navbar" data-bs-offset="0">
                <div className="mb-3">
                  <label htmlFor="id" className="form-label">ID</label>
                  <input type="text" className="form-control" id="id" name="id" placeholder="아이디를 입력하세요." required value={data.id} onChange={changeData}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationpassword" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="비밀번호를 입력하세요." required value={data.password} onChange={changeData} />
                  <div className='valid-feedback'></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="nickname" className="form-label">Nickname</label>
                  <input type="text" className="form-control" id="nickname" name="nickname" placeholder="닉네임을 입력하세요." required value={data.nickname} onChange={changeData} />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input type="text" className="form-control" id="phone" name="phone" placeholder="전화번호를 입력하세요." required value={data.phone} onChange={changeData} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="이메일을 입력하세요." required value={data.email} onChange={changeData} />
                </div>
                <div className="mb-3">
                  <label htmlFor="addr" className="form-label">Address</label>
                  <input type="text" className="form-control" id="addr" name="addr" placeholder="주소를 입력하세요." required value={data.addr} onChange={changeData} />
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreeTerms"
                      checked={data.agreeTerms}
                      onChange={toggleTermsAgreement}
                    />
                    <label className="form-check-label" htmlFor="agreeTerms">
                      (필수) 개인정보 제공 및 이용약관에 동의합니다.
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <button type="reset" className="btn btn-outline-dark m-1" onClick={() => navigate('/')}>취소</button>
                  <button type="submit" className="btn btn-dark m-1" onClick={signup}>가입</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignUp