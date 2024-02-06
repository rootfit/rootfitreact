const getPool = require('../common/pool')

const sql = {
  list: 'SELECT boardtbl.id, boardtbl.title, boardtbl.cnt, boardtbl.createdAt, usertbl.nickname FROM boardtbl LEFT JOIN usertbl ON boardtbl.user_id=usertbl.id ORDER BY boardtbl.createdAt DESC;',
  mostview: 'SELECT boardtbl.id, boardtbl.title, boardtbl.cnt, boardtbl.createdAt, usertbl.nickname FROM boardtbl LEFT JOIN usertbl ON boardtbl.user_id=usertbl.id ORDER BY boardtbl.cnt DESC;',
  insert:'INSERT INTO board (name, title, content) VALUES (?,?,?)',
  increaseCnt: 'UPDATE boardtbl SET cnt = cnt +1 WHERE id = ?',
  detail: 'SELECT boardtbl.*,usertbl.nickname FROM boardtbl LEFT JOIN usertbl ON boardtbl.user_id = usertbl.id WHERE boardtbl.id = ?',
  getComments: 'SELECT commenttbl.id, commenttbl.board_id, commenttbl.createdAt, usertbl.nickname, commenttbl.content FROM commenttbl LEFT JOIN usertbl ON commenttbl.user_id=usertbl.id WHERE commenttbl.board_id = ?;',
  addComment:'INSERT INTO commenttbl (user_id, board_id, content) VALUES (?, ?, ?)',
  update: 'UPDATE board SET title = ?, content = ? WHERE id = ?'
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
      const [resp] = await conn.query(sql.detail, item)
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
    try {
      conn = await getPool().getConnection()
      await conn.query(sql.increaseCnt, item)
    } catch (error) {
      throw error
    } finally {
      if (conn !== null) conn.release()
    }
  },
  mostview: async (callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.mostview, []);
      console.log('Most viewed:', resp);
      callback({ status: 200, message: 'ok', data: resp });
    } catch (error) {
      console.log(error);
      return { status: 500, message: '페이지를 불러올 수 없습니다.', error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },
  addComment : async (data,callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.addComment, [data.board_id, data.user_id, data.content])
      console.log('댓추',resp)
      callback({status:201, message: '댓 추가 성공',data:resp });
    } catch (error) {
      console.error('Error adding comment:', error);
      return{ status: 500, error: '댓 추가 실패',error:error };
    }finally {
      if (conn !== null) conn.release();
    }
  },
  getComments : async (id, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      // const { board_id } = req.query;
      const [comments] = await getPool().query(sql.getComments, [id]);
      callback({status: 200, message: 'OK', data: comments})
    } catch (error) {
      console.error('Error getting comments:', error);
      callback({status: 500, message: '댓글목록 불러오기 실패'})
    }
  },


  insert: async (item, callback) => {
    let conn = null
    try{
      conn = await getPool().getConnection()

      const [resp] = await conn.query(sql.insert, [item.name, item.title, item.content])

      console.log('000', resp)
      callback({status: 200, message: 'OK', data: resp})
    }catch(error){
      console.log(error)
      return {status: 500, message: '입력 실패', error: error}
    }finally {
      if(conn !== null) conn.release()
    }
  },
  update: async (item, callback) => {
    let conn = null
    try{
      conn = await getPool().getConnection()

      const [resp] = await conn.query(sql.update, [item.title, item.content, item.id])

      console.log('000', resp)
      callback({status: 200, message: 'OK'})
    }catch(error){
      console.log(error)
      return {status: 500, message: '입력 실패', error: error}
    }finally {
      if(conn !== null) conn.release()
    }
  }

  // delete: async (callback) => {
  //   let conn = null
  //   try {

  //   } catch {

  //   } finally {

  //   }
  // },
}

module.exports = boardDAO