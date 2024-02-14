import UserContext from '../context/UserContext'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Button, Form, Modal } from 'react-bootstrap'

const MemberPage = () => {
  const value = useContext(UserContext); //현재 로그인 정보
  const navigate = useNavigate();
  const { state, actions } = useContext(UserContext)

  let user = value.state.user

  const [serverData, setServerData] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false); // 비밀번호 변경 모을 위한 상태
  const [modifiedUser, setModifiedUser] = useState({ // 회원 정보 수정을 위한 상태
    id: user.id,
    nickname: user.nickname,
    phone: user.phone,
    email: user.email,
    addr: user.addr,
    password:'',
  });
  // 비밀번호 입력을 위한 상태
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const handleShowPasswordModal = () => setShowPasswordModal(true);
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
    });
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setModifiedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdateUserInfo = async () => {
    try {
      const resp = await axios.put('http://localhost:8000/user/update', modifiedUser, { withCredentials: true });

      if (resp.data.status === 200) {
        window.alert('회원 정보가 성공적으로 수정되었습니다.');
        navigate('/')
        actions.dispatch({ type: 'UPDATE_USER', payload: modifiedUser });  // 수정된 사용자 정보로 로컬 상태 업데이트
      } else {
        window.alert(resp.data.message);
      }
    } catch (error) {
      console.error('회원 정보 수정 오류:', error);
    }
  };

  const handleUpdatePassword = async () => {
    try {

  const resp = await axios.put('http://localhost:8000/user/update-password', passwordForm, { withCredentials: true });

  // 서버 응답 처리
  if (resp.data.status === 200) {
    // 성공적으로 수정되었을 때
    window.alert('비밀번호가 성공적으로 수정되었습니다.');

    // 수정된 비밀번호로 로컬 상태 업데이트
    setModifiedUser((prevUser) => ({
      ...prevUser,
      password: passwordForm.newPassword,
    }));

    handleClosePasswordModal(); // 모달 닫기
  } else {
    // 실패 시 오류 메시지 표시
    window.alert(resp.data.message);
  }
} catch (error) {
  console.error('비밀번호 수정 오류:', error);
}
}


  let message
  if (user !== null && user.id !== '') {
    message = <h5>{user.id} ({user.nickname})님, 환영합니다.</h5>
  } else {
    message = <h3>회원 전용 페이지입니다. 로그인 하세요.</h3>
  }

  const getServerData = async () => {
    const resp = await axios.get('http://localhost:8000/user/member', { withCredentials: true })
    if (resp.data.status === 500) window.alert(resp.data.message)
    else {
      setServerData(resp.data.message)
    }
  };

  useEffect(() => {
if (user === null || user.id === '') {
navigate('/user/signin')
}
  }, [user, navigate])

  if (user !== null && user.id !== '') {
  return (
    <main>
      <section className="section-myInfo">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="page-title">My page</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section-modifyInfo">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <div className="text-right mb-5">
              <h3>{user.id} ({user.nickname})님, 환영합니다.</h3>
              </div>

              <div className="row mb-5">
                <label htmlFor="id" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>ID</label>
                <div className="col-sm-10 text-center">
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={user.id}
                    readOnly
                  />
                </div>
              </div>

              <div className="row mb-5">
                <label htmlFor="id" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>Password</label>
                <div className="col-sm-10 text-center">
                  <button type="button" class="btn btn-outline-dark col-sm-5" onClick={handleShowPasswordModal}>비밀번호 변경</button>
                </div>
              </div>

              <div className="row mb-5">
                <label htmlFor="nickname" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>Nickname</label>
                <div className="col-sm-10 text-center">
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={modifiedUser.nickname}
                    onChange={handleUserInfoChange}
                  />
                </div>
              </div>

              <div className="row mb-5">
                <label htmlFor="phone" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>Phone</label>
                <div className="col-sm-10 text-center">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={modifiedUser.phone}
                    onChange={handleUserInfoChange}
                  />
                </div>
              </div>

              <div className="row mb-5">
                <label htmlFor="email" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>E-mail</label>
                <div className="col-sm-10 text-center">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={modifiedUser.email}
                    onChange={handleUserInfoChange}
                  />
                </div>
              </div>

              <div className="row mb-5">
                <label htmlFor="addr" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>Address</label>
                <div className="col-sm-10 text-center">
                  <input
                    type="text"
                    id="addr"
                    name="addr"
                    value={modifiedUser.addr}
                    onChange={handleUserInfoChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-5 text-center">
        <button
          type="button"
          className="btn btn-dark m-1 col-2"
          style={{ height: '50px', fontWeight: 'bold' }}
          onClick={handleUpdateUserInfo}>
          수정 완료
        </button>
      </div>

      <div>
        <Modal show={showPasswordModal} onHide={handleClosePasswordModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>비밀번호 변경</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>현재 비밀번호</Form.Label>
            <Form.Control
              type="password"
              size="sm"
              value={passwordForm.currentPassword || ''}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            />
            <Form.Label>변경 비밀번호</Form.Label>
            <Form.Control
              type="password"
              size="sm"
              value={passwordForm.newPassword || ''}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleUpdatePassword}>
              변경
            </Button>
            <Button variant="secondary" onClick={handleClosePasswordModal}>
              취소
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  )
} else {
  return null; // 렌더링 없음
}
}

export default MemberPage