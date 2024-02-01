// 프레임워크, 라이브러리 등 import
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 각 업무의 첫화면 import
import TodoMain from './todo/TodoMain';
import Header from './home/component/Header';
import Footer from './home/component/Footer';
import HomeMain from './home/HomeMain';
// import ShoppingMain from './shopping/ShoppingMain';
import UserMain from './user/UserMain';
import BoardMain from './board/BoardMain';

import MemberPage from './user/pages/MemberPage';
import LogoutPage from './user/pages/LogoutPage';
import { UserProvider } from './user/context/UserContext';

const App = () => {
  return (
    <UserProvider>
    <div>

      <Header />
      <Routes>
        <Route path='/' element={<HomeMain />} />
        {/* ShoppingMain은 임시로 주석처리. */}
        {/* <Route path='/shopping/*' element={<ShoppingMain />} /> */}
        <Route path='/user/*' element={<UserMain />} />
        <Route path='/board/*' element={<BoardMain />} />
        <Route path='/todo/*' element={<TodoMain />} />
        <Route path='/member' element={<MemberPage />} />
        <Route path='/logout' element={<LogoutPage />} />

      </Routes>
      <Footer />
    </div>
    </UserProvider>
  );
};
export default App;
