import React, { useState, useEffect } from 'react'


const UserContext = React.createContext(null)

export const UserProvider = (props) => {
  const [user, setUser] = useState({id:'', nickname: ''})

  // 컴포넌트 마운트 시 로컬 스토리지 확인
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
}, []);

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
      break;
      default:
        break;
    }
  };

  const values = {
    state: {user},
    actions: {addUser, deleteUser, dispatch}
  }
  return <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
}

export default UserContext