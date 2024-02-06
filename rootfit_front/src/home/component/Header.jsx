import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RiUserAddLine, RiUserFill, RiUserSettingsLine } from 'react-icons/ri';
import { TbLogout } from "react-icons/tb";
import UserContext from '../../user/context/UserContext';

const Header = () => {
  const userContextValue = useContext(UserContext);

  const { state: { user } = { state: { user: null } }, actions: { deleteUser } = { actions: { deleteUser: () => { } } } } = userContextValue || {};
  
  console.log('header...', user)
  return (

    <div className='header d-flex align-items-center '>
      <div className='container-fluid container-xl d-flex align-items-center justify-content-between'>
        <a href='/' className='logo d-flex align-items-center'>
          {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
          {/* <!-- <img src="assets/img/logo.png" alt=""> --> */}
          <h1>Root Fit</h1>
        </a>

        <nav id='navbar' className='navbar'>
          <ul>
            <li>
              <Link className='nav-link ' to='/shopping/product'>
                쇼핑몰
              </Link>
            </li>
            <li>
              <Link className='nav-link' to='/todo'>
                헬스리스트
              </Link>
            </li>
            <li>
              <Link className='nav-link' to='/board/list'>
                게시판
              </Link>
            </li>
            <li>
              <a href='/shopping'>쇼핑몰</a>
            </li>
            <li>
              <a href='about.html'>About</a>
            </li>
            <li>
              <a href='contact.html'>Contact</a>
            </li>
          </ul>
        </nav>
        {/* <!-- .navbar --> */}

        <div className='position-relative'>
          {user && user.id ? (
            <>
              <TbLogout className='icon' size='20' color='black' />
              <Link className='mx-2' to='/logout' >
                LOGOUT
              </Link >
              <RiUserSettingsLine className='icon' size='20' color='black' />
              <Link className='mx-2' to='/member' >
                MODIFY
              </Link >
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

          <a href='#' className='mx-2 js-search-open'>
            <span className='bi-search'></span>
          </a>
          <i className='bi bi-list mobile-nav-toggle'></i>

          {/* <!-- ======= Search Form ======= --> */}
          <div className='search-form-wrap js-search-form-wrap'>
            <form action='search-result.html' className='search-form'>
              <span className='icon bi-search'></span>
              <input type='text' placeholder='Search' className='form-control' />
              <button className='btn js-search-close'>
                <span className='bi-x'></span>
              </button>
            </form>
          </div>
          {/* <!-- End Search Form --> */}
        </div>
      </div>
    </div>

  );
};

export default Header;
