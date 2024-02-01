import React, { useState } from 'react'

const UserContext = React.createContext(null)

export const UserProvider = (props) => {
  //user 데이터가 있는지 판단..
  //있으면 -> 아무짓도 안하면 되고..
  //없으면 -> 혹시 sessionStorage 에 저장된게 있는지 판단..
  //없으면 -> 로그인 안한 경우이고..
  //있으면.. -> refresh 상황이고.. sessionStorage 에서 데이터 가져와서.. user 에 설정
  //로그 아웃되면 sessionStorage 데이터 지워주고..
  const [user, setUser] = useState({id:'', nickname: ''})

  const addUser = (userData) => {
    setUser(userData); // 컴포넌트의 로컬 상태 업데이트
    localStorage.setItem('user', JSON.stringify(userData)); // 로컬 스토리지에 사용자 정보 저장

  }

  const deleteUser = () => {
    setUser({id:'', nickname: ''})
  }

  const values = {
    state: {user},
    actions: {addUser, deleteUser}
  }
  return <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
}

export default UserContext