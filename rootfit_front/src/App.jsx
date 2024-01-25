import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoMain from './todo/TodoMain';
import Header from './home/component/Header'
import Footer from './home/component/Footer'
import HomeMain from './home/HomeMain'
<<<<<<< HEAD
import ShoppingMain from './shopping/ShoppingMain'
import UserMain from './user/UserMain';
=======
// import ShoppingMain from './shopping/ShoppingMain'
>>>>>>> d984f94 (App.jsx commit)

// import BoardMain from './board/BoardMain'

const App = () => {
  return (
    <div>
      {/* Header, Footer 가 전체 화면에서 항상 고정으로 나온다면.. 아래처럼
      각 화면별로 Header, Footer 가 상이하게 적용된다면 Route 되는 Component 내에. */}
      <Header />
      {/* 각 화면이 라우팅 되게 등록...
      각 업무의 첫 화면만 등록하고 그 안에서의 화면전환은 중첩 라우팅으로 처리..
      즉 XXXMain 만 이곳에서 등록하고.. XXX 업무에 의한 화면 라우팅은 XXXMain 에 명시 */}
      <Routes>
        <Route path='/' element={<HomeMain />} />
<<<<<<< HEAD
        <Route path='/shopping/*' element={<ShoppingMain />} />
        <Route path='/user/*' element={<UserMain />} />
        <Route path='/board/*' element={<BoardMain/>} />
=======
        <Route path='/todo/*' element={<TodoMain/>} />
        {/* <Route path='/shopping/*' element={<ShoppingMain />} /> */}
        {/* <Route path='/user/*' element={<UserMain />} />
        <Route path='/board/*' element={<BoardMain/>} /> */}
>>>>>>> d984f94 (App.jsx commit)
      </Routes>
      <Footer/>
    </div>
  )
}
export default App