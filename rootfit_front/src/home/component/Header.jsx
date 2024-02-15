import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiUserAddLine, RiUserFill, RiUserSettingsLine } from 'react-icons/ri';
import { TbLogout } from 'react-icons/tb';
import UserContext from '../../user/context/UserContext';

const Header = () => {
  const userContextValue = useContext(UserContext);

  const {
    state: { user } = { state: { user: null } },
    actions: { deleteUser } = { actions: { deleteUser: () => {} } },
  } = userContextValue || {};

  const navigate = useNavigate();

  // 회원인지 체크
  const checkMember = (e) => {
    e.preventDefault();
    //로그인하지 않은 경우
    const currentUrl = '/todo';
    //로그인 페이지에서 로그인후 다시 보고있던 페이지로 원복 -> SignIn.jsx에 redirect 연계해야함.
    navigate(`/user/signin?redirect=${encodeURIComponent(currentUrl)}`);
  };

  console.log('header...', user);
  return (
    <div className='header d-flex align-items-center '>
      <div className='container-fluid container-xl d-flex align-items-center justify-content-between'>
        <Link className='logo d-flex align-items-center' to='/'>
          {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
          {/* <!-- <img src="assets/img/logo.png" alt=""> --> */}
          <h1>Root Fit</h1>
        </Link>

        <nav id='navbar' className='navbar'>
          <ul>
            <li>
              {user && user.id ? (
                <>
                  <Link className='nav-link' to='/todo'>
                    헬스리스트
                  </Link>
                </>
              ) : (
                <>
                  <Link className='mx-2' to='/todo' onClick={checkMember}>
                    헬스리스트
                  </Link>
                </>
              )}
            </li>
            <li>
              <Link className='nav-link' to='/board/list'>
                게시판
              </Link>
            </li>
            <li>
              <Link className='nav-link ' to='/shopping/product'>
                쇼핑몰
              </Link>
            </li>
          </ul>
        </nav>
        {/* <!-- .navbar --> */}

        <div className='position-relative'>
          {user && user.id ? (
            <>
              <TbLogout className='icon' size='20' color='black' />
              <Link className='mx-2' to='/logout'>
                LOGOUT
              </Link>
              <RiUserSettingsLine className='icon' size='20' color='black' />
              <Link className='mx-2' to='/member'>
                MODIFY
              </Link>
            </>
          ) : (
            <>
              <RiUserAddLine className='icon' size='20' color='black' />
              <Link className='mx-2' to='/user/signup'>
                SIGN UP
              </Link>
              <RiUserFill className='icon' size='20' color='black' />
              <Link className='mx-2' to='/user/signin'>
                SIGN IN
              </Link>
            </>
          )}
          {/* <RiUserSettingsLine className='icon' size='20' color='black' />
          <Link className="mx-2" to="/">MODIFY</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
