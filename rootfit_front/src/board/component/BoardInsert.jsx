import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BoardInsert = () => {
  const navigate = useNavigate();

  const [board, setBoard] = useState({ name: '', title: '', content: '' });

  const changeData = useCallback((e) => {
    setBoard({ ...board, [e.target.name]: e.target.value });
  }, [board]);

  // 등록 버튼 클릭 시
  const handleInsert = useCallback(async () => {
    try {
      await axios.post('http://localhost:8000/boards/insert', board);
      // 화면을 자동으로 목록으로 이동
      navigate('/board/list');
    } catch (error) {
      console.error('게시물 작성에 실패했습니다:', error);
      // 실패 시 에러 처리
      // 예를 들어 사용자에게 알림을 표시하거나 다른 작업을 수행할 수 있습니다.
    }
  }, [board, navigate]);

  return (
    <main id="main">
      <section className="intro-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="title-single-box">
                <h1 className="title-single">게시물 작성</h1>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Properties Grid
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="property-grid grid">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <table className="table">
                <tbody>
                  <tr>
                    <td>제 목</td>
                    <td>
                      <input type='text' className='form-control' name='title' value={board.title} onChange={changeData} />
                    </td>
                  </tr>
                  <tr>
                    <td>내용</td>
                    <td>
                      <textarea cols="80" rows="10" name='content' className='form-control' value={board.content} onChange={changeData}></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className='text-end'>
                      <button type='button' className='btn btn-primary btn-sm' onClick={() => navigate('/board/list')}>취 소</button>
                      {" "}
                      <button type='button' className='btn btn-warning btn-sm' onClick={handleInsert}>작 성</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BoardInsert
