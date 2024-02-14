const bcrypt = require('bcrypt')
const getPool = require('../common/pool')

// 회원가입 시 받을 정보 
const sql = {
  checkId: 'SELECT * FROM userTBL WHERE id = ?', //id 중복체크 및 사용자 조회
  signup: 'INSERT INTO userTBL (id, password, nickname, phone, email, addr) VALUES (?,?,?,?,?,?)', //회원가입
  signin: 'SELECT * FROM userTBL WHERE id = ?', //로그인
  update: 'UPDATE userTBL SET nickname=?, phone=?, email=?, addr=? WHERE id=?', //회원정보 변경
  updatePassword: 'UPDATE userTBL SET password=? WHERE id=?',  // 비밀번호 변경
}

const userDAO = {
  // 회원가입
  signup: async (item, callback) => {
    let conn = null
    try {
      conn = await getPool().getConnection()
      const [respCheck] = await conn.query(sql.checkId, item.id)

      if (respCheck[0]) {
        callback({ status: 500, message: '사용자가 이미 존재합니다.' })
      } else {
        console.log('kakao 인증후 유저 정보가 없어서 회원가입하려과 하고 있다..')
        const salt = await bcrypt.genSalt()
        bcrypt.hash(item.password, salt, async (error, hash) => {
          if (error) callback({ status: 500, message: '암호화 실패', error: error })
          else {
            const [resp] = await conn.query(sql.signup, [item.id, hash, item.nickname, item.phone, item.email, item.addr])
            callback({ status: 200, message: 'OK', data: resp })
          }
        })
      }
    } catch (error) {
      console.log('dao siginup, error', error)
      return { status: 500, message: '유저가 입력에 실패했습니다.', error: error }
    } finally {
      if (conn !== null) conn.release()
    }
  },
  // 로그인
  signin: async (item, callback) => {
    const { id, password } = item
    let conn = null

    try {
      conn = await getPool().getConnection()
      const [user] = await conn.query(sql.signin, [id]) //checkId 변경

      if (!user[0]) {
        callback({ status: 500, message: '아이디 또는 패스워드를 확인해주세요.' })
      } else {
        bcrypt.compare(password, user[0].password, async (error, result) => {
          if (error) {
            callback({ status: 500, message: '아이디, 패스워드를 확인해주세요.' })
          } else if (result) {
            callback({
              status: 200,
              message: 'OK',
              data: {
                id: user[0].id,
                nickname: user[0].nickname,
                phone: user[0].phone,
                email: user[0].email,
                addr: user[0].addr,
                isAdmin: user[0].isAdmin,
              },
            })
          } else {
            callback({ status: 500, message: '아이디 또는 패스워드를 확인해주세요.' })
          }
        })
      }
    } catch (error) {
      callback({ status: 500, message: '로그인 실패', error: error })
    } finally {
      if (conn !== null) conn.release()
    }
  },
  // 회원정보 수정
  update: async (item, callback) => { 
    const { id, nickname, phone, email, addr } = item;

    let conn = null;

    try {
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.update, [nickname, phone, email, addr, id]);
      callback({ status: 200, message: 'OK', data: resp });
    } catch (error) {
      callback({ status: 500, message: '회원 정보 수정 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },
  // 비밀번호 변경
  updatePassword: async (item, callback) => {
    const { id, newPassword } = item;
    let conn = null;

    try {
      conn = await getPool().getConnection();
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(newPassword, salt);
      const [resp] = await conn.query(sql.updatePassword, [hash, id]);
      callback({ status: 200, message: 'OK', data: resp });
    } catch (error) {
      callback({ status: 500, message: '비밀번호 변경 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = userDAO