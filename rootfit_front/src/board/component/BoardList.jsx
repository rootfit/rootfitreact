import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useCallback, useState, useEffect } from 'react'

const BoardList = () => {
  const navigate = useNavigate()

  //생성일이 년, 월, 일만 나오도록하는 로직
  const CreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };
  // statusHandler 만들기
  // 다룰 데이터 명시
  const [boardList, setBoardList] = useState({
    status: "", message: "", data: []
  })
  // 서버연결
  const getBoardList = useCallback(async () => {
    // 주소를 가져오면
    const resp = await axios.get(`http://localhost:8000/board/list`)
    console.log(resp.data)

    // 반환한 데이터를 핸들링
    setBoardList(resp.data)
  }, [])
  const mostview = async () => {
    try {
      const resp = await axios.get('http://localhost:8000/board/mostview');
      setBoardList(resp.data);
    } catch (error) {
      console.error('Error fetching most viewed board list:', error);
    }
  }


  // 생명주기 hook 설정
  // 보드 리스트 가져올 때마다 반영
  useEffect(() => {
    getBoardList()
    console.log('listeffect사용')
  }, [])

  return (
    <main id="listmain">
      <section className="intro-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="title-single-box">
                <h1 className="title-single">Our Health</h1>
                <span className="color-text-a">정보 나눔 게시판</span>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              {/* <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                </ol>
              </nav> */}
            </div>
          </div>
        </div>
      </section>
      <section className="property-grid grid">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {/* <h6>BOARD</h6> */}
              <div className='text-end'>
                <button className="btn btn-sm" onClick={mostview}>조회순</button>
                |
                <button className="btn btn-sm" onClick={getBoardList}>최신순</button>

              </div>
              <table className="table table-line">
                {/* <thead>
                  <tr>
                    <th className="text-center">nickname</th>
                    <th className="text-center">title</th>
                    <th className="text-center">createdAt</th>
                    <th className="text-center">cnt</th>
                  </tr>
                </thead> */}
                <tbody>
                  {boardList.data.map((boardtbl) => (
                    <tr key={boardtbl.id}>
                      <td>{boardtbl.nickname}</td>
                      <td className="text-center">
                        <Link to={"/board/detail/" + boardtbl.id}>
                          {boardtbl.title}  
                        </Link> 
                      </td>
                      <td className="text-end">{CreatedAt(boardtbl.createdAt)}</td>
                      <td className="text-end">{boardtbl.cnt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn btn-primary" onClick={() => navigate('/board/insert')}>글 쓰기</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BoardList
