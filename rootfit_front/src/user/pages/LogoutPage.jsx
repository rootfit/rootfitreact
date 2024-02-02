import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import UserContext from '../context/UserContext'
import { useContext } from 'react'

const LogoutPage = () => {

  const navigate = useNavigate()
  const value = useContext(UserContext)

  const logout = async (e) => {
    e.preventDefault()
    const resp = await axios.get('http://localhost:8000/user/logout', { withCredentials: true })
    if (resp.data.status === 500) window.alert(resp.data.message)
    else {
      value.actions.addUser({ id: '', nickname: '' })
      navigate('/')
    }
  }

  let user = value.state.user
  let message
  if (user !== null && user.id !== '') {
    message = (
      <div>
        <div className="col-lg-12 text-center">
          <h3>{user.id} ({user.nickname})님, 로그아웃 하시겠습니까?</h3>
          <button type="button" className="btn btn-dark m-1 col-2" style={{ height: '50px', fontWeight: 'bold' }} onClick={logout}>로그아웃</button>
          <button type="button" className="btn btn-dark m-1 col-2" style={{ height: '50px', fontWeight: 'bold' }} onClick={() => navigate('/')}>취소</button>
        </div>
      </div>
    )
  } else {
    message = <h3>로그인되어 있지 않습니다.</h3>
  }

  return (
    <div>
            <section className="section-signin1">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="page-title">Log out</h1>
            </div>
          </div>
        </div>
      </section>
      <div className="col-lg-12 text-center">
      {message}
      </div>
    </div>
  )
}
export default LogoutPage