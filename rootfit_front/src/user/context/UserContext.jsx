import React, { useState } from 'react'

const UserContext = React.createContext(null)

export const UserProvider = (props) => {
  const [user, setUser] = useState({id:'', nickname: ''})

  const addUser = (userData) => {
    setUser(userData); // 컴포넌트의 로컬 상태 업데이트
    localStorage.setItem('user', JSON.stringify(userData)); // 로컬 스토리지에 사용자 정보 저장

  }

  const deleteUser = () => {
    setUser({id:'', nickname: ''})
  }

  const dispatch = (action) => {
    switch (action.type) {
      case 'UPDATE_USER':
        setUser(action.payload);
        localStorage.setItem('user', JSON.stringify(action.payload));
        break;
        case 'LOGOUT':
      // 로그아웃 액션 처리 로직 추가
      setUser({ id: '', nickname: '' });
      localStorage.removeItem('user');
      default:
        break;
    }
  };

  const values = {
    state: {user},
    actions: {addUser, deleteUser}
  }
  return <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
}

export default UserContext