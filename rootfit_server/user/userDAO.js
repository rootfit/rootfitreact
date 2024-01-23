const bcrypt = require('bcrypt')
const getPool = require('../common/pool')

// 회원가입 시 받을 정보 
const sql = {
  checkId: 'SELECT * FROM userTBL WHERE id = ?',
  signup: 'INSERT INTO userTBL (id, password, nickname, phone, email, addr) VALUES (?,?,?,?,?,?)',
}

const userDAO = {
  signup: async (item, callback) => {
    let conn = null
    try {
      conn = await getPool().getConnection()

      const [respCheck] = await conn.query(sql.checkId, item.id)

      if (respCheck[0]) {
        callback({ status: 500, message: '사용자가 이미 존재합니다.' })
      } else {
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
      return { status: 500, message: '유저가 입력에 실패했습니다.', error:error }
    } finally {
      if (conn !== null) conn.release()
    }
  }
}
module.exports = userDAO