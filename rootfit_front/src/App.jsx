// 프레임워크, 라이브러리 등 import
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 각 업무의 첫화면 import
import TodoMain from './todo/sections/view/TodoMain';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeMain from './pages/HomeMain';
import ShoppingMain from './pages/ShoppingMain';
import UserMain from './user/UserMain';
import BoardMain from './pages/BoardMain';

import MemberPage from './user/pages/MemberPage';
import LogoutPage from './user/pages/LogoutPage';
import { UserProvider } from './user/context/UserContext';
import { TodoProvider } from './todo/context/todoContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TodoProvider>
          <div>
            <Header />
            <Routes>
              <Route path='/' element={<HomeMain />} />
              <Route path='/shopping/*' element={<ShoppingMain />} />
              <Route path='/user/*' element={<UserMain />} />
              <Route path='/board/*' element={<BoardMain />} />
              <Route path='/todo/*' element={<TodoMain />} />
              <Route path='/member' element={<MemberPage />} />
              <Route path='/logout' element={<LogoutPage />} />
            </Routes>
            <Footer />
          </div>
        </TodoProvider>
      </UserProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
export default App;
