const getPool = require('../common/pool');

const sql = {
  getComments: 'SELECT commenttbl.user_id, commenttbl.id, commenttbl.board_id, commenttbl.createdAt, usertbl.nickname, commenttbl.content FROM commenttbl LEFT JOIN usertbl ON commenttbl.user_id=usertbl.id WHERE commenttbl.board_id = ?;',
  addComment: 'INSERT INTO commenttbl (board_id, user_id, content) VALUES (?, ?, ?);',
  deleteComment: 'DELETE FROM commenttbl WHERE id = ?;',
  // updateComment:'',
};


// 아이디 형식 확인 함수
const isValidIdFormat = (id) => {
  const regex = /^(?=.*[0-9a-zA-Z가-힣!@#$%^&*])[0-9a-zA-Z가-힣!@#$%^&*]+$/;
  return regex.test(id);
}

const commentDAO = {

  addComment: async (data, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.addComment, [data.board_id, data.user_id, data.content]);
      console.log('댓추', resp);
      callback({ status: 201, message: '댓 추가 성공', data: resp });
    } catch (error) {
      console.error('Error adding comment:', error);
      return { status: 500, error: '댓 추가 실패', error: error };
    } finally {
      if (conn !== null) conn.release();
      conn.destroy();
      console.log('addcomment close')
    }
  },
  getComments: async (id, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      // const { board_id } = req.query;
      const [comments] = await getPool().query(sql.getComments, [id]);
      callback({ status: 200, message: 'OK', data: comments });
    } catch (error) {
      console.error('Error getting comments:', error);
      callback({ status: 500, message: '댓글목록 불러오기 실패' });
    } finally {
      if (conn !== null) conn.release();
      conn.destroy();
      console.log('getcomments close')
    }
  },

  deleteComment: async (id, callback) => {
    let conn = null;
    try {
       // id가 정의되어 있고 영문,숫자인 경우에만 처리
      if (id !== undefined && typeof id === 'number' || isValidIdFormat(String(id))) {
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.deleteComment, [id]);
      callback({ status: 200, message: 'OK' });
    }else{
          // id가 정의되지 않았거나 숫자가 아닌 경우 처리
          callback({ status: 400, message: '잘못된 요청입니다.' });
        }
    } catch (error) {
      console.error('Error getting comments:', error);
      return({ status: 500, message: '댓글 삭제 실패' });
    } finally {
      if (conn !== null) {
        conn.release();
        if (conn.destroy) {
          conn.destroy();
        }
      }
    }
  }
  };



module.exports = commentDAO;
