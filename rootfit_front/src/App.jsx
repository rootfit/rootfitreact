// 프레임워크, 라이브러리 등 import
import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

// 각 업무의 첫화면 import
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import TodoMain from './todo/sections/view/TodoMain';
import BoardMain from './pages/board/BoardMain';
import ShoppingMain from './pages/shopping/ShoppingMain';
import UserMain from './pages/user/UserMain';

import MemberPage from './pages/user/pages/MemberPage';
import LogoutPage from './pages/user/pages/LogoutPage';
import { UserProvider } from './pages/user/context/UserContext';
import { TodoProvider } from './todo/context/todoContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const MainLayout = () => {
  return (
    <div>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <TodoProvider>
            <Routes>
              <Route path='/' element={<MainLayout />}>
                <Route index element={<MainPage />} />
                <Route path='/shopping/*' element={<ShoppingMain />} />
                <Route path='/user/*' element={<UserMain />} />
                <Route path='/board/*' element={<BoardMain />} />
                <Route path='/todo/*' element={<TodoMain />} />
                <Route path='/member' element={<MemberPage />} />
                <Route path='/logout' element={<LogoutPage />} />
              </Route>
            </Routes>
          </TodoProvider>
        </UserProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
};
export default App;
