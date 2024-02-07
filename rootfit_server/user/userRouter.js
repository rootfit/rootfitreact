const express = require('express')
const session = require('express-session')
const axios = require('axios')
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
    const id = req.session.userId;
    //req.session.userId; 의 데이터가 json 이고 그 json 의 키 값중 id 값을 얻고 싶을때..
    //const jsonData = {a: 10, b: 20}
    // const {a} = jsonData
    // const { id } = req.session.userId; // Use session userId instead of req.user

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

//카카오 로그인 서버에 로그인 요청
router.get('/kakaoLogin', async (req, res) => {
  const code = req.query.code; // 카카오 서버로부터 받아온 코드
  const REST_API_KEY = "d5c90c81d4cdc41b9887827fe3437743"; // REST API 키
  const REDIRECT_URI = "http://localhost:5173/user/kakaoLogin"; // Redirect URI

  try {
    // 액세스 토큰 요청
    const tokenResponse = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`
    });
    
    const { access_token } = tokenResponse.data;

    // 사용자 정보 요청
    const userResponse = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const { id, properties: { nickname }, kakao_account: { email } } = userResponse.data;

    // 이메일을 이용하여 사용자 조회
    userDAO.findUserByKakaoEmail(email, async (error, user) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: '내부 서버 오류' });
        return;
      }
      
      // 사용자가 없다면 새로운 사용자 생성
      if (!user) {
        userDAO.createUserWithKakao({ email, nickname }, (error, userId) => {
          if (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: '내부 서버 오류' });
            return;
          }

          req.session.userId = userId;
          res.json({ status: 200, message: '회원가입 및 로그인이 완료되었습니다.' });
        });
      } else {
        req.session.userId = user.id;
        res.json({ status: 200, message: '로그인이 완료되었습니다.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: '내부 서버 오류' });
  }
});
    
module.exports = router