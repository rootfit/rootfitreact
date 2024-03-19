import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import React, { useCallback, useState, useEffect } from 'react'

const CommentsList = () => {
  const navigate = useNavigate()
  // 글아이디 추출
  const { id } = useParams()
  //아이디 핸들러
  const [loggedInUserId, setLoggedInUserId] = useState('');

  //서버에서 획득한 댓글 목록 
  const [comment, setComment] = useState([]);

  //댓글 유저 입력을 위한 상태.. 
  const [inputComment, setInputComment] = useState("")
  // 수정된 댓글 내용 상태
  const [updateContent, setUpdateContent] = useState('')

  // 수정 중인 댓글의 ID 상태
  const [editCommentId, setEditCommentId] = useState(null);

  // 수정 중인 댓글의 내용 상태
  const [editContent, setEditContent] = useState('');

  // 날짜표시 yy.mm.dd
  const CreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
  const addComment = useCallback(async () => {
    // 비동기
    // e.preventDefault()
    const userId = fetchLoggedInUserId() || ''
    // console.log(id, userId, inputComment)
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

  // 삭제버튼 클릭시에
  const deleteComment = async (id) => {
    //버튼 클릭시에 호출되어 서버에 매개변수 데이터 삭제되게 요청.
    try {
      // 서버에 DELETE 요청을 보냄
      await axios.get(`http://localhost:8000/board/deletecomment/${id}`);
      // 댓글 목록 다시 불러오기
      getComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };


  // 댓글 수정 버튼 클릭 시 호출되는 함수
  const startEditing = (id, content) => {
    setEditCommentId(id);
    setEditContent(content);
  };
  // 수정 완료 버튼 클릭 시 호출되는 함수
  const finishEditing = async (id) => {
    try {
      // 수정된 내용이 비어있지 않은 경우에만 업데이트 수행
      if (editContent.trim()) {
        await axios.post(`http://localhost:8000/board/updatecomment/${id}`, { id, content: editContent });
        // 댓글 목록 다시 불러오기
        getComments();
        // 수정 완료 후 수정 관련 상태 초기화
        setEditCommentId(null);
        setEditContent('');
      } else {
        console.log('수정 내용을 입력하세요');
      }
    } catch (error) {
      console.error('댓글 수정에 실패했습니다:', error);
      // 실패 시 에러 처리
    }
  };

  // 취소 버튼 클릭 시 호출되는 함수
  const cancelEditing = () => {
    setEditCommentId(null);
    setEditContent('');
  };


  // id에 따른 버튼 보기
  const commentButton = (id, user_id, content) => {
    // 로그인 아이디와 댓글의 유저아이디 비교
    if (loggedInUserId === user_id) {
      return (
        <div>
          {editCommentId === id ? (
            <>
              <input
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={() => finishEditing(id)}>완료</button>
              <button onClick={cancelEditing}>취소</button>
            </>
          ) : (
            <>
              <button type="button" className="btn  btn-smbtn-end" onClick={() => startEditing(id, content)}>
                수정</button>
              <button type="button" className="btn  btn-smbtn-end" onClick={() => deleteComment(id)}>
                삭제
              </button>
            </>
          )}
        </div>
      );
    } else {
      return null
    }
  }

  // 생명주기 hook
  useEffect(() => {
    fetchLoggedInUserId();
    getComments();
  }, [id, getComments])


  return (
    <main id="commentsmain">
      <div className='container'>

        {/* 댓글 입력 form */}
        <section>
          <div className='container'>
            <h4>comment</h4>
            <hr className="hr-solid" />
            <br />
            <div className="row">
              <div className="col-lg-11 col-md-10 col-sm-10 mb-3">
                <textarea className="form-control" id="comment-message" placeholder="댓글을 입력하세요." rows="1" value={inputComment} onChange={(e) => setInputComment(e.target.value)}>
                </textarea>
              </div>
              <div className="col-lg-1 col-md-2 col-sm-2 text-end">
                <input type="submit" className="btn btn-primary " value="입력" onClick={addComment} />
              </div>
              {/* </div> */}
            </div>
          </div>
          {/* <!-- End Comments Form --> */}

          {/* <!-- ======= 댓글창 ======= --> */}
          <div className='container'>
            <table className='table'>
              <tbody>

                {comment.map((contents) => (
                  <tr key={contents.id} className='postenter'>
                    <td>{contents.nickname}</td>
                    <td>
                      {editCommentId === contents.id ? (
                        <input
                          type="text"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                        />
                      ) : (
                        contents.content
                      )}
                    </td>
                    <td className='text-end'>{CreatedAt(contents.createdAt)}</td>
                    <td className='text-end'>
                      {loggedInUserId === contents.user_id && (
                        editCommentId === contents.id ? (
                          <>
                            <button onClick={() => finishEditing(contents.id)}>완료</button>
                            <button onClick={cancelEditing}>취소</button>
                          </>
                        ) : (
                          <>
                            <button type="button" className="btn  btn-smbtn-end" onClick={() => startEditing(contents.id, contents.content)}>
                              수정
                            </button>
                            <button type="button" className="btn  btn-smbtn-end" onClick={() => deleteComment(contents.id)}>
                              삭제
                            </button>
                          </>
                        )
                      )}
                    </td>
                    <td>
                      {commentButton()}
                      </td>
                  </tr>
                ))}

              </tbody>
            </table>

          </div>
          {/* <!-- End Comments --> */}
        </section>
      </div>
    </main >
  )
}

export default CommentsList