const getPool = require('../common/pool');

const sql = {
  list: 'SELECT boardtbl.id, boardtbl.title, boardtbl.cnt, boardtbl.createdAt, usertbl.nickname FROM boardtbl LEFT JOIN usertbl ON boardtbl.user_id=usertbl.id ORDER BY boardtbl.createdAt DESC;',
  mostview: 'SELECT boardtbl.id, boardtbl.title, boardtbl.cnt, boardtbl.createdAt, usertbl.nickname FROM boardtbl LEFT JOIN usertbl ON boardtbl.user_id=usertbl.id ORDER BY boardtbl.cnt DESC;',
  insert: 'INSERT INTO boardtbl (user_id, title, content) VALUES (?,?,?)',
  increaseCnt: 'UPDATE boardtbl SET cnt = cnt +1 WHERE id = ?',
  detail: 'SELECT boardtbl.*,usertbl.nickname FROM boardtbl LEFT JOIN usertbl ON boardtbl.user_id = usertbl.id WHERE boardtbl.id = ?',
  prevPost: 'SELECT MAX(id) AS prevPostId FROM boardtbl WHERE id < ?',
  nextPost: 'SELECT MIN(id) AS nextPostId FROM boardtbl WHERE id > ?',
  update: 'UPDATE boardtbl SET title = ?, content = ? WHERE id = ?',
  delete: 'DELETE FROM boardtbl WHERE id = ?'
};

const boardDAO = {
  list: async (callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.list, []);
      console.log('000', resp);
      callback({ status: 200, message: 'ok', data: resp });
    } catch (error) {
      console.log(error);
      return { status: 500, message: '페이지를 불러올 수 없습니다.', error: error };
    } finally {
      if (conn !== null) conn.release();

      conn.destroy();
      console.log('list close')
    }
  },
  detail: async (item, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.detail, item);
      callback({ status: 200, message: 'ok', data: resp[0] });
    } catch (error) {
      console.log(error);
      return { status: 500, massage: '게시글을 불러오지 못했습니다.', error: error };
    } finally {
      if (conn !== null) conn.release();

      conn.destroy();
      console.log('detail close')
    }
  },
  increaseCnt: async (item) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      await conn.query(sql.increaseCnt, item);
    } catch (error) {
      throw error;
    } finally {
      if (conn !== null) conn.release();

      conn.destroy();
      console.log('cnt close')
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

      conn.destroy();
      console.log('mostview close')
    }
  },

  getPrevNextPostIds: async (id, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [prevPostIdResult] = await conn.query(sql.prevPost, [id]);
      const [nextPostIdResult] = await conn.query(sql.nextPost, [id]);

      const prevPostId = prevPostIdResult[0].prevPostId;
      const nextPostId = nextPostIdResult[0].nextPostId;
      callback({ status: 200, message: 'OK', data: { prevPostId, nextPostId } });
    } catch (error) {
      console.error('Error getting prevnextpost:', error);
      callback({ status: 500, message: '이전글, 다음글 불러오기 실패' });
    } finally {
      if (conn !== null) conn.release();

      conn.destroy();
      console.log('다음글, 이전글 close')
    }
  },

  insert: async (item, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();

      console.log(item);

      const [resp] = await conn.query(sql.insert, [item.name, item.title, item.content]);

      console.log('000', resp);
      callback({ status: 200, message: 'OK', data: resp });
    } catch (error) {
      console.log(error);
      return { status: 500, message: '입력 실패', error: error };
    } finally {
      if (conn !== null) conn.release();

      conn.destroy();
      console.log('insert close')
    }
  },
  update: async (item, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();

      const [resp] = await conn.query(sql.update, [item.title, item.content, item.id]);

      console.log('000', resp);
      callback({ status: 200, message: 'OK' });
    } catch (error) {
      console.log(error);
      return { status: 500, message: '입력 실패', error: error };
    } finally {
      if (conn !== null) conn.release();

      conn.destroy();
      console.log('update close')
    }
  },

  delete: async (id, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      await conn.query('DELETE FROM boardtbl WHERE id = ?', [id]);
      callback({ status: 200, message: '게시글 삭제 성공' });
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      callback({ status: 500, message: '게시글 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
      console.log('delete close');
    }
  },
};

module.exports = boardDAO;