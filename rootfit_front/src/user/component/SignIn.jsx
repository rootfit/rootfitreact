import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {

  const navigate = useNavigate()

  const [data, setData] = useState({ id: '', password: '' })

  const changeData = useCallback((e) => {
    setData((data) => ({ ...data, [e.target.id]: e.target.value }))
  }, [])

  const signin = useCallback(async (e) => {
    e.preventDefault()
    const resp = await axios.post('http://localhost:8000/user/signin', data)
    if (resp.data.status === 500) window.alert(resp.data.message)
    else navigate('/')
  }, [data, navigate])
  return (
    <main id="main">
      <section className="section-signin1">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-12 text-center mb-3">
              <h1 className="page-title">Sign in</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section-login">
        <div className="container">
          <div className="row">
            <form className="col-sm-5 mx-auto">
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
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                </div>
              </div>
              <div className="mb-5">
                <div className="d-grid gap-2 mx-auto">
                  <button type="submit" className="btn btn-dark" onClick={signin}
                    style={{ height: '60px', fontWeight: 'bold' }}>
                    로그인
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignIn