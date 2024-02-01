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
  const [comment, setComment] = useState([]);
  
  const CreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const fetchLoggedInUserId = () => {
    const userId = Cookies.get('userId');
    setLoggedInUserId(userId);
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

  // 댓글 입력 버튼 클릭 시 실행되는 함수
  const getComments = useCallback(async () => {
    try {
      // 서버로부터 댓글 목록 가져오기
      const resp = await axios.get(`http://localhost:8000/board/comments/${id}`);
      setComment(resp.data.data);
    } catch (error) {
      console.error('Error fetching comments:', error)
    }}, [id])
    

  const changeData = useCallback((e) => {
    setComment({...comment, [e.target.board_id] : e.target.value})
  }, [comment])
  
  //등록 버튼 클릭시에..
  const addComment = useCallback(async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:8000/boards/addcomment?board_id=${id}', comment)
    getComments()
    setComment({nicknam:'',content:''})
  },[comment, getComments, id])


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
  }

  // 생명주기 hook
  // 처음 한번만 불러오기
  useEffect(() => {
    fetchLoggedInUserId();
    getDetail();
    getComments();
  }, [id, getComments])


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
            {/* <div className="col-md-12 col-lg-4">
              <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                </ol>
              </nav>
            </div> */}
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
                    {/* <td>nickname</td> */}
                    <td>
                      {detail.nickname}
                    </td>
                    <td className='text-center'>
                      {detail.title}
                    </td>
                    <td className='text-end'>
                      조회 {detail.cnt}


                    </td>
                  </tr>
                  <tr>
                    <td colSpan={12}>
                      {detail.content}
                    </td>
                  </tr>
                </tbody>
                <tfoot className='text-end' >
                  <tr >
                    <td colSpan={12}>
                      {CreatedAt(detail.createdAt)}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div>
                {renderButtons()}
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* 댓글 입력 form */}
      <section>
        <div className='container'>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-11 mb-3">
                <textarea className="form-control" id="comment-message" placeholder="댓글을 입력하세요." rows="1">
                </textarea>
              </div>
              <div className="col-1">
                <input type="submit" className="btn btn-primary btn-sm" value="입력" onClick={addComment} />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Comments Form --> */}

        {/* <!-- ======= 댓글창 ======= --> */}
        <div className='container'>
          <table className='table'>
            <tbody>
              {/* <tr>
                    <td></td>
                    <td></td>
                    <td></td> */}
              {comment.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.nickname}</td>
                  <td>{comment.content}</td>
                  <td>{CreatedAt(comment.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        {/* <!-- End Comments --> */}
      </section>
    </main >
  )
}

export default BoardDetail