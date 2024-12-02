import axios from 'axios';
import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import UserContext from '../../user/context/UserContext'

const BoardUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfo = useContext(UserContext)
  const location = useLocation()
  const sendData = location.state
  const [board, setBoard] = useState({ id: sendData.id, name: sendData.user_id, title: sendData.title, content: sendData.content });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 여부

  //서버에서 데이터 가져오



  // 로그인 상태 확인 함수
  const checkLoginStatus = useCallback(() => {
    // 예시로 사용자가 로그인한 상태인지 여부를 체크하여 상태 업데이트
    const userLoggedIn = true; // 사용자가 로그인한 상태
    setIsLoggedIn(userLoggedIn);
  }, []);

  // 컴포넌트가 마운트될 때 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  // 입력 필드 값 변경 함수
  const changeData = useCallback((e) => {
    setBoard({ ...board, [e.target.name]: e.target.value });
  }, [board]);

  // 게시물 수정 함수
  const handleUpdate = useCallback(async () => {
    if (!isLoggedIn) {
      // 로그인되어 있지 않으면 알림을 표시하고 함수를 종료합니다.
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      await axios.post(`http://localhost:8000/board/update/${id}`, board);
      navigate('/board/list'); // 수정 완료 후 목록 페이지로 이동
    } catch (error) {
      console.error('게시물 수정에 실패했습니다:', error);
      // 실패 시 에러 처리
    }
  }, [board, id, navigate, isLoggedIn]);




  return (
    <main id="main">
      <section className="intro-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="title-single-box">
                <h1 className="title-single">게시물 수정</h1>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Properties Grid
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="property-grid grid">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <table className="table">
                <tbody>
                  <tr>
                    <td>제 목</td>
                    <td>
                      <input type='text' className='form-control' name='title' value={board.title} onChange={changeData} />
                    </td>
                  </tr>
                  <tr>
                    <td>내용</td>
                    <td>
                      <textarea cols="80" rows="10" name='content' className='form-control' value={board.content} onChange={changeData}></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className='text-end'>
                      <button type='button' className='btn btn-primary btn-sm' onClick={() => navigate('/board/list')}>취 소</button>
                      {" "}
                      <button type='button' className='btn btn-warning btn-sm' onClick={handleUpdate}>수 정</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BoardUpdate;

