const getPool = require('../common/pool')

const sql = {
  list: 'SELECT boardtbl.title, boardtbl.cnt, boardtbl.createdAt, usertbl.nickname FROM boardtbl INNER JOIN user ON boardtbl.id=usertbl.id;',
  // insert: ';',
  // detail: 'SELECT board.*,user.nickname FROM board LEFT JOIN user ON board.id=? ORDER BY board.log_num;',
  // update: ';',
  // delete: ';'
}

const boardDAO = {
  list: async (callback) => {
    let conn = null
    try {
      conn = await getPool().getConnection()
      const [resp] = await conn.query(sql.list, [])
      console.log('000', resp)
      callback({ status: 200, message: 'ok', data: resp })
    } catch (error) {
      return { status: 500, message: '페이지를 불러올 수 없습니다.', error: error }
    } finally {
      if (conn !== null) conn.release()
    }
  },
  detail: async (item, callback) => {
    let conn = null
    try {
      conn = await getPool().getConnection()
      const[resp]=await conn.query(sql.detail, item)
      callback({ status: 200, message: 'ok', data: resp[0] })
    } catch (error) {
      return { status: 500, massage: '게시글을 불러오지 못했습니다.', error: error }
    } finally {
      if (conn !== null) conn.release()
    }
  },
  // insert: async (callback) => {
  //   let conn = null
  //   try {

  //   } catch {

  //   } finally {

  //   }
  // },
  // update: async (callback) => {
  //   let conn = null
  //   try {

  //   } catch {

  //   } finally {

  //   }
  // },
  // delete: async (callback) => {
  //   let conn = null
  //   try {

  //   } catch {

  //   } finally {

  //   }
  // },
}

module.exports = boardDAO