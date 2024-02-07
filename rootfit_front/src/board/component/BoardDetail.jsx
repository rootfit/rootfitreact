import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import React, { useCallback, useState, useEffect } from 'react'
// import Cookies from 'js-cookie'

const BoardDetail = () => {
  const navigate = useNavigate()
  // 글아이디 추출
  const { id } = useParams()

  // detail status handler, 사용될 데이터 명시
  const [detail, setDetail] = useState({ title: '', content: '', createdAt: '', reccnt: '', cnt: '', nickname: '' })

  //아이디 핸들러
  const [loggedInUserId, setLoggedInUserId] = useState('');

  //서버에서 획득한 댓글 목록 
  const [comment, setComment] = useState([]);

  //댓글 유저 입력을 위한 상태.. 
  const [inputComment, setInputComment] = useState("")

  //이전글, 다음글을 위한 상태
  const [prevPostId, setPrevPostId] = useState("");
  const [nextPostId, setNextPostId] = useState("");

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

  // 댓글 불러오는 함수
  const getComments = useCallback(async () => {
    try {
      // 서버로부터 댓글 목록 가져오기
      const resp = await axios.get(`http://localhost:8000/board/comments/${id}`);
      setComment(resp.data.data);
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }, [id])


  //등록 버튼 클릭시에..
  const addComment = useCallback(async (e) => {
    // 비동기
    e.preventDefault()
    const userId = fetchLoggedInUserId()
    console.log(id, userId, inputComment)
    // db에 저장될 데이터
    await axios.post(`http://localhost:8000/board/addcomment/${id}`, {
      board_id: id,
      user_id: userId,
      content: inputComment
    })
    // 댓글 목록 다시 부르기
    getComments()
    // 저장된 댓글입력 지우기
    setInputComment('')
  }, [inputComment, getComments, id])


  // id에 따른 버튼 보기
  const renderButtons = () => {
    // 로그인 아이디와 글의 유저아이디 비교
    if (loggedInUserId === detail.user_id) {
      return (
        <div className="col-lg-12">
          <div className="row">
            <div className='col-4'>
              <button type="button" className="btn btn-primary " onClick={() => navigate('/board/list')}>
                목록
              </button>
            </div>
            <div className='col-8 text-end'>
              <button type="button" className=" btn btn-primary btn-end" onClick={() => navigate(`/board/update/${id}`)}>
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
    getComments();
    getPrevNextPostId();
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
                    <div>
                      <td colSpan={12}>
                        {detail.content}
                      </td>
                    </div>
                  </tr>
                  <tr >
                    <td colSpan={12} className='text-end'>
                      {CreatedAt(detail.createdAt)}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <div>
                        {prevPostId && (
                          <button className='btn' onClick={() => navigate(`/board/detail/${prevPostId}`)}>◀ 이전 글</button>
                        )}
                      </div>
                    </td>
                    <td></td>
                    <td>
                      <div className='text-end' >
                        {nextPostId && (
                          <button className='btn' onClick={() => navigate(`/board/detail/${nextPostId}`)}>다음 글 ▶</button>

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


      {/* 댓글 입력 form */}
      <section>
        <div className='container'>
          <h3>comment</h3><br />
          <div className="col-lg-12">
            <div className="row">
              <div className="col-11 mb-3">
                <textarea className="form-control col-11 " id="comment-message" placeholder="댓글을 입력하세요." rows="1" value={inputComment} onChange={(e) => setInputComment(e.target.value)}>
                </textarea>
              </div>
              <div className="col-1 text-end">
                <input type="submit" className="btn btn-primary " value="입력" onClick={addComment} />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Comments Form --> */}

        {/* <!-- ======= 댓글창 ======= --> */}
        <div className='container'>
          <table className='table'>
            <tbody>
              {comment.map((contents) => (
                <tr key={contents.id}>
                  <td>{contents.nickname}</td>
                  <td>{contents.content}</td>
                  <td className='text-end'>{CreatedAt(contents.createdAt)}</td>
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