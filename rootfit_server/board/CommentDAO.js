const getPool = require('../common/pool');

const sql = {
  getComments: 'SELECT commenttbl.id, commenttbl.board_id, commenttbl.createdAt, usertbl.nickname, commenttbl.content FROM commenttbl LEFT JOIN usertbl ON commenttbl.user_id=usertbl.id WHERE commenttbl.board_id = ?;',
  addComment: 'INSERT INTO commenttbl (board_id, user_id, content) VALUES (?, ?, ?);',
  // deleteComment: '',
  // updateComment:'',
};

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
    }
  },

  // deleteComment: 
  

  // updateComment:

};

module.exports = commentDAO;
