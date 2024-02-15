import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import React, { useCallback, useState, useEffect, useContext } from 'react'
// import Cookies from 'js-cookie'
import CommentsList from './CommentsList'

import UserContext from '../../user/context/UserContext'

const BoardDetail = () => {
  const navigate = useNavigate()
  // 글아이디 추출
  const { id } = useParams()

  const userInfo = useContext(UserContext)

  // detail status handler, 사용될 데이터 명시
  const [detail, setDetail] = useState({ title: '', content: '', createdAt: '', reccnt: '', cnt: '', nickname: '' })

  //아이디 핸들러
  const [loggedInUserId, setLoggedInUserId] = useState('');

  //이전글, 다음글을 위한 상태
  const [prevPostId, setPrevPostId] = useState("");
  const [nextPostId, setNextPostId] = useState("");

  // 데이터 삭제 함수!
  const deleteBoard = useCallback(async () => {
    try {
      await axios.get(`http://localhost:8000/board/delete/${id}`);
      navigate('/board/list');
    } catch (error) {
      console.error('게시글 삭제에 실패했습니다:', error);
      // 실패 시 에러 처리
    }
  }, [id, navigate]);


  // 날짜표시 yy.mm.dd
  const CreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const getPrevNextPostId = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/board/prevnext/${id}`);
      setPrevPostId(resp.data.data.prevPostId || null);
      setNextPostId(resp.data.data.nextPostId || null);
    } catch (error) {
      console.error('이전 및 다음 글 ID를 가져오는 중 오류 발생:', error);
    }
  };

  // 스토리지에서 userid 추출..
  const fetchLoggedInUserId = () => {
    const userString = localStorage.getItem('user');
    let userId = null;

    try {
      const userObject = JSON.parse(userString);
      userId = userObject.id;
    } catch (error) {
      console.error('Error parsing user information:', error);
    }

    setLoggedInUserId(userId);
    return userId;
  };


  // 주소 연결 & 해당 데이터 가져오기
  const getDetail = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/board/detail/${id}`);
      setDetail(resp.data.data);
    } catch (error) {
      console.error('Error fetching board detail:', error);
    }
  };

  // id에 따른 버튼 보기
  const renderButtons = () => {
    // 로그인 아이디와 글의 유저아이디 비교
    // if (loggedInUserId === detail.user_id) {
    if (userInfo.state.user.id && userInfo.state.user.id === detail.user_id) {
      return (
        <div className="col-lg-12">
          <div className="row">
            <div className='col-4'>
              <button type="button" className="btn btn-primary " onClick={() => navigate('/board/list')}>
                목록
              </button>
            </div>
            <div className='col-8 text-end'>
              {/* 상세보기에서 가지고 있던 데이터를 수정에 전달해서 찍히게.. */}
              <button type="button" className=" btn btn-primary btn-end" onClick={() => navigate(`/board/update/${id}`, { state: detail })}>
                수정
              </button>
              {" "}
              <button type="button" className="btn btn-primary btn-end" onClick={() => deleteBoard(id)}>
                삭제
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/board/list')}>
            목록
          </button>
        </div>
      );
    }
  }

  // 생명주기 hook
  useEffect(() => {
    fetchLoggedInUserId();
    getDetail();
    getPrevNextPostId();
  }, [id])


  return (
    <main id="detailmain">
      <section className="intro-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="title-single-box">
                <h1 className="title-single">Our Health</h1>
                <span className="color-text-a">상세보기</span>
              </div>
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
                    <td colSpan={12} className='text-end'>
                      조회 {detail.cnt}
                    </td>
                  </tr>
                  <tr>
                    <td className='col-3'>
                      {detail.nickname}
                    </td>
                    <td className='col-6 text-center'>
                      {detail.title}
                    </td>
                    <td className='col-3 text-end'>
                      {CreatedAt(detail.createdAt)}
                    </td>
                  </tr>
                  <tr>

                    <td colSpan={12}>
                      {detail.content}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <div>
                        {prevPostId && (
                          <button className='btn' onClick={() => navigate(`/board/detail/${prevPostId}`)}>◀</button>
                        )}
                      </div>
                    </td>
                    <td></td>
                    <td>
                      <div className='text-end' >
                        {nextPostId && (
                          <button className='btn' onClick={() => navigate(`/board/detail/${nextPostId}`)}>▶</button>

                        )}
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <section>
                <div>
                  {renderButtons()}
                </div>
              </section>

            </div>
          </div>
        </div>
      </section>
      <div>
        <CommentsList />
      </div>
    </main >
  )
}

export default BoardDetail  
