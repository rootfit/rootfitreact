import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useCallback, useState, useEffect } from 'react'

const BoardList = () => {
  const navigate = useNavigate()
  // statusHandler 만들기
  // 다룰 데이터 명시
  const [boardList, setBoardList] = useState({
    status: "", message: "", data: []
  })
  // 서버연결
  const getBoardList = useCallback(async () => {
    // 주소를 가져오면
    const resp = await axios.get('http://localhost:8000/board/list')

    // 아무것도 안들어온다...?왜 이럴까...
    // 반환한 데이터를 핸들링
    setBoardList(resp.data)


  }, [])

  // 생명주기 hook 설정
  // 보드 리스트 가져올 때마다 반영
  useEffect(() => {
    getBoardList()
    console.log('listeffect사용')
  }, [getBoardList])

  return (
    <main id="main">
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
              <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
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
              <h6>HOT ISSUE</h6>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>title</th>
                    <th>nickname</th>
                    <th>createdAt</th>
                    <th>cnt</th>
                  </tr>
                </thead>
                <tbody>
                  {boardList.data.map((board) => (
                    <tr key={board.id}>
                      <td>{board.id}</td>
                      <td>
                        <Link to={"/board/detail/" + board.id}>
                          {board.title}
                        </Link>
                      </td>
                      <td>{board.name}</td>
                      <td>{board.createdAt}</td>
                      <td>{board.cnt}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} className="text-end">

                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className="property-grid grid">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
            <h6>BOARD</h6>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>title</th>
                    <th>nickname</th>
                    <th>createdAt</th>
                    <th>cnt</th>
                  </tr>
                </thead>
                <tbody>
                  {boardList.data.map((board) => (
                    <tr key={board.id}>
                      <td>{board.id}</td>
                      <td>
                        <Link to={"/board/detail/" + board.id}>
                          {board.title}
                        </Link>
                      </td>
                      <td>{board.name}</td>
                      <td>{board.createdAt}</td>
                      <td>{board.cnt}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} className="text-end">
                      <button className="btn btn-primary btn-sm" onClick={() => navigate('/board/insert')}>글 쓰기</button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BoardList
