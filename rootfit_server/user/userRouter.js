const express = require('express')
const session = require('express-session')
const router = express.Router()
const userDAO = require('./userDAO')

router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

router.post('/signup', async (req, res, next) => {
  const data = req.body
  userDAO.signup(data, (resp) => {
    res.send(resp)
  })
})

router.post('/signin', (req, res, next) => {
  const data = req.body
  userDAO.signin(data, (resp) => {
    if(resp.status === 200) {
      req.session.userId = resp.data.id
    }
    res.json(resp)
  })
})

router.get('/logout', (req, res, next) => {
  console.dir(req)
  res.clearCookie('connect.sid')
  res.json({ status:200, message: 'OK' })
  
})

router.get('/member', (req, res, next) => {
  if (req.session.userId) {
    res.json({ status:200, message: '서버측 데이터 : ${req.session.userId} 님 환영합니다.'})
  } else {
    res.json({ status:200, message: '서버측 데이터 : 로그인하지 않은 유저의 요청입니다.' })
  }
})


router.put('/update', (req, res) => {
  const data = req.body;
  console.log('수정된 회원정보', data);
  const { id } = req.session; // req.user 대신 req.session 사용

  const updateUser = {
    id: data.id,
    nickname: data.nickname,
    phone: data.phone,
    email: data.email,
    addr: data.addr,
  };

  userDAO.update(updateUser, (result) => {
    res.status(result.status).json(result);
  });
});

router.put('/update-password', async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }

    const { newPassword } = req.body;
    const { id } = req.session.userId; // Use session userId instead of req.user

    const updatePasswordUser = {
      id,
      newPassword,
    };

    userDAO.updatePassword(updatePasswordUser, (result) => {
      res.status(result.status).json(result);
    });
  } catch (error) {
    console.error('비밀번호 업데이트 오류:', error);
    res.status(500).json({ status: 500, message: '내부 서버 오류' });
  }
});

module.exports = router