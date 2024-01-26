const getPool = require('../common/pool')

const sql = {
  list: 'SELECT boardtbl.id, boardtbl.title, boardtbl.cnt, boardtbl.createdAt, usertbl.nickname FROM boardtbl LEFT JOIN usertbl ON boardtbl.user_id=usertbl.id;',
  // insert: ';',
  increaseCnt:'UPDATE boardtbl SET cnt = cnt +1 WHERE id = ?',
  detail: 'SELECT boardtbl.*,usertbl.nickname FROM boardtbl LEFT JOIN usertbl ON boardtbl.user_id = usertbl.id WHERE boardtbl.id = ?',
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
      console.log(error)
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
      console.log(error)
      return { status: 500, massage: '게시글을 불러오지 못했습니다.', error: error }
    } finally {
      if (conn !== null) conn.release()
    }
  },
  increaseCnt: async (item) => {
    let conn = null
    try{
      conn = await getPool().getConnection()
      await conn.query(sql.increaseCnt,item)
    }catch(error){
      throw error
    }finally{
      if (conn!==null) conn.release()
    }
  }
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