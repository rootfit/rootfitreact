import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import React, { useCallback, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const BoardDetail = () => {
  const navigate = useNavigate()
  // 글아이디 얻어내기
  const { id } = useParams()
  // status handler, 사용될 데이터 명시
  const [detail, setDetail] = useState({ title: '', content: '', createdAt: '', reccnt: '', cnt: '', nickname: '' })

  const [loggedInUserId, setLoggedInUserId] = useState('');

  const fetchLoggedInUserId = () => {
    const userId = Cookies.get('userId');
    setLoggedInUserId(userId);
  };

  // 주소 연결 & 해당 데이터 가져오기
  const getDetail = async () => {
    const resp = await axios.get(`http://localhost:8000/board/detail/${id}`)
    setDetail(resp.data.data)
  }


  const renderButtons = () => {
    if (loggedInUserId === detail.user_id) {
      return (
        <div>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/board/list')}>
            목록
          </button>{" "}
          <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate(`/board/update/${id}`)}>
            수정
          </button>{" "}
          <button type="button" className="btn btn-primary btn-sm" onClick={() => deleteBoard(id)}>
            삭제
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/board/list')}>
            목록
          </button>
        </div>
      );
    }
  };

  // 생명주기 hook
  // 처음 한번만 불러오기
  useEffect(() => {
    fetchLoggedInUserId();

    getDetail()
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
            <div className="col-md-12 col-lg-4">
              <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
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
                    <td>nickname</td>
                    <td>
                      {detail.nickname}
                    </td>
                  </tr>
                  <tr>
                    <td>title</td>
                    <td>
                      {detail.title}
                    </td>
                  </tr>
                  <tr>
                    <td>content</td>
                    <td>
                      {detail.content}
                    </td>
                  </tr>
                  <tr>
                    <td>createdAt</td>
                    <td>
                      {detail.createdAt}
                    </td>
                  </tr>
                  <tr>
                    <td>cnt</td>
                    <td>
                      {detail.cnt}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                {renderButtons()}
                {/* <button type='button' className='btn btn-primary btn-sm' onClick={()=>navigate('/board/list')}>목록</button>
                    {" "}
                    <button type='button' className='btn btn-primary btn-sm' onClick={() => navigate('/board/update/'+boardtbl.id)}>수정</button>
                    {" "}
                    <button type='button' className='btn btn-primary btn-sm' onClick={() => deleteBoard(boardtbl.id)}>삭제</button> */}
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
export default BoardDetail