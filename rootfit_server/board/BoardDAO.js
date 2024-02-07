const getPool = require('../common/pool')

const sql = {
  list: 'SELECT boardtbl.id, boardtbl.title, boardtbl.cnt, boardtbl.createdAt, usertbl.nickname FROM boardtbl LEFT JOIN usertbl ON boardtbl.user_id=usertbl.id ORDER BY boardtbl.createdAt DESC;',
  mostview: 'SELECT boardtbl.id, boardtbl.title, boardtbl.cnt, boardtbl.createdAt, usertbl.nickname FROM boardtbl LEFT JOIN usertbl ON boardtbl.user_id=usertbl.id ORDER BY boardtbl.cnt DESC;',
  // insert: ';',
  increaseCnt: 'UPDATE boardtbl SET cnt = cnt +1 WHERE id = ?',
  detail: 'SELECT boardtbl.*,usertbl.nickname FROM boardtbl LEFT JOIN usertbl ON boardtbl.user_id = usertbl.id WHERE boardtbl.id = ?',
  getComments: 'SELECT commenttbl.id, commenttbl.board_id, commenttbl.createdAt, usertbl.nickname, commenttbl.content FROM commenttbl LEFT JOIN usertbl ON commenttbl.user_id=usertbl.id WHERE commenttbl.board_id = ?;',
  addComment:'INSERT INTO commenttbl (board_id, user_id, content) VALUES (?, ?, ?)',
  prevPost:'SELECT MAX(id) AS prevPostId FROM boardtbl WHERE id < ?',
  nextPost:'SELECT MIN(id) AS nextPostId FROM boardtbl WHERE id > ?',
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

  getPrevNextPostIds: async (id,callback) => {
    let conn = null;
    try{
      // await boardDAO.getPrevNextPostIds(id);
      conn = await getPool().getConnection();
      const [prevPostIdResult] = await conn.query(sql.prevPost, [id]);
      const [nextPostIdResult] = await conn.query(sql.nextPost, [id]);
      
      const prevPostId = prevPostIdResult[0].prevPostId;
      const nextPostId = nextPostIdResult[0].nextPostId;
      callback({status: 200, message: 'OK', data: { prevPostId, nextPostId }})
    }catch(error){
      console.error('Error getting prevnextpost:', error);
      callback({status: 500, message: '이전글, 다음글 불러오기 실패'})
    } finally {
      if (conn !== null) conn.release();
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