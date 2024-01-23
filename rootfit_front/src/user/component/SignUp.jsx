import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

  const navigate = useNavigate()

  const [data, setData] = useState({ id: '', password: '', nickname: '', phone: '', email: '', addr: '' })

  const changeData = useCallback((e) => {
    setData((data) => ({ ...data, [e.target.id]: e.target.value }))
  }, [])

  const signup = useCallback(async (e) => {
    e.preventDefault()

    const resp = await axios.post('http://localhost:8000/user/signup', data)
    if (resp.data.status === 500) window.alert('사용자가 존재합니다.')
    else navigate('/')
  }, [data, navigate])
  return (
<main id="main">
<section className="section-Singup">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <h1 className="page-title">Signup</h1>
          </div>
        </div>
        </div>
        </section>

    <section className="section-about">
      <div className="container">
        <form className="row">
          <div className="col-sm12 position-relative form-group mb-3">
            <label htmlFor="id" className="form-label" >ID</label>
            <input type="text" className="form-control" id="id" name="id" placeholder="아이디를 입력하세요." required value={data.id} onChange={changeData} />
          </div>
          <div className="col-sm12 position-relative form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="비밀번호를 입력하세요." required value={data.password} onChange={changeData} />
          </div>
          <div className="col-sm12 position-relative form-group mb-3">
            <label htmlFor="nickname" className="form-label">Nickname</label>
            <input type="text" className="form-control" id="nickname" name="nickname" placeholder="닉네임을 입력하세요." required value={data.nickname} onChange={changeData} />
          </div>
          <div className="col-sm12 position-relative form-group mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="text" className="form-control" id="phone" name="phone" placeholder="전화번호를 입력하세요." required value={data.phone} onChange={changeData} />
          </div>
          <div className="col-sm12 position-relative form-group mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="이메일을 입력하세요." required value={data.email} onChange={changeData} />
          </div>
          <div className="col-sm12 position-relative form-group mb-3">
            <label htmlFor="addr" className="form-label">Address</label>
            <input type="text" className="form-control" id="addr" name="addr" placeholder="주소를 입력하세요." required value={data.addr} onChange={changeData} />
          </div>

          <div className="col-sm12 position-relative form-group">
            <button type="submit" className="btn btn-dark" onClick={signup}>Send</button>
            <button type="button" className="btn btn-outline-dark" onClick={()=>navigate('/')}>Cancel</button>
          </div>

        </form>
      </div>
    </section>
  </main>
  )
}

export default SignUp