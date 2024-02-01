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
    const resp = await axios.get('http://localhost:8000/user/logout',{ withCredentials: true })
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
        <h3>{user.id} ({user.nickname})님, 로그아웃 하시겠습니까?</h3>
        <button type="button" className="btn btn-danger btn-sm" onClick={logout}>send</button>
      </div>
    )
  } else {
    message = <h3>로그인되어 있지 않습니다.</h3>
  }

  return (
    <div>
      <h2>Logout</h2>
      {message}
    </div>
  )
}
export default LogoutPage