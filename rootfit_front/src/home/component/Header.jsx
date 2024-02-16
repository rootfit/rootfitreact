import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiUserAddLine, RiUserFill, RiUserSettingsLine } from 'react-icons/ri';
import { TbLogout } from 'react-icons/tb';
import UserContext from '../../user/context/UserContext';

const Header = () => {
  const userContextValue = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    state: { user } = { state: { user: null } },
    actions: { deleteUser } = { actions: { deleteUser: () => { } } },
  } = userContextValue || {};

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 회원인지 체크
  const checkMember = (e) => {
    e.preventDefault();
    //로그인하지 않은 경우
    const currentUrl = '/todo';
    //로그인 페이지에서 로그인후 다시 보고있던 페이지로 원복 -> SignIn.jsx에 redirect 연계해야함.
    navigate(`/user/signin?redirect=${encodeURIComponent(currentUrl)}`);
  };

  return (
    <div className='header d-flex align-items-center '>
      <div className='container-fluid container-xl d-flex align-items-center justify-content-between'>
        <Link className='logo d-flex align-items-center' to='/'>

        <Link href='/' className='logo d-flex align-items-center'>
          <h1>Root Fit</h1>
          </Link>
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
        </nav> {/* <!-- .navbar --> */}

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
          <i className='bi bi-list mobile-nav-toggle' onClick={toggleDropdown}></i>
          <div className="container-fluid">
            <ul className={`dropdown-menu dropdown-menu-dark ${isDropdownOpen ? "show" : ""}`} aria-labelledby="navbarDarkDropdownMenuLink">
              <li><Link className="dropdown-item" to="/todo" onClick={toggleDropdown}>헬스리스트</Link></li>
              <li><Link className="dropdown-item" to="/board/list" onClick={toggleDropdown}>게시판</Link></li>
              <li><Link className="dropdown-item" to="/shopping/product" onClick={toggleDropdown}>쇼핑몰</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;