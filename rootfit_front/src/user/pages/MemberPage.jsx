import UserContext from '../context/UserContext'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const MemberPage = () => {
  const value = useContext(UserContext); //현재 로그인 정보

  const [serverData, setServerData] = useState('');

  let user = value.state.user
  let message
  if(user !== null && user.id !== '') {
    message = <h3>{user.id} ({user.nickname})님 환영합니다.</h3>
  }else {
    message = <h3>회원 전용 페이지입니다. 로그인 하세요.</h3>
  }

  const getServerData = async () => {
    const resp = await axios.get('http://localhost:8000/user/member',{ withCredentials: true })
    if (resp.data.status === 500) window.alert(resp.data.message)
    else {
      setServerData(resp.data.message)
    }
  }

  useEffect(() => {
    getServerData()
  }, [])


  return (
    <div>
      {message}
      <p>Server data : {serverData}</p>      
    </div>
  )
}
export default MemberPage