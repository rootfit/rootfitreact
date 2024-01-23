import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useCallback, useState, useEffect } from 'react'

const BoardList = () => {
  const navigate = useNavigate()
  // statusHandler 만들기
  // 다룰 데이터 명시
  const [boardList, setBoardlist] = useState({
    status: '', message: '', data: []
  })
  // 서버연결
  // boardlist데이터 불러오기
  const getBoardList = useCallback(async () => {
    // 주소를 가져오면
    const resp = await axios.get('http:localhost:5173/board/list')
    // 반환한 데이터를 핸들링
    setBoardlist(resp.data)
  })

  // 생명주기 hook 설정
  // 보드 리스트 가져올 때마다 반영
  useEffect(() => {
    getBoardList()
  }, [getBoardList])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>title</td>
            {/* <td>nickname</td> */}
            <td>createdAt</td>
            <td>cnt</td>
          </tr>
        </thead>
        <tbody>
          <tr key = {boardTBL.id}>
            <td>{boardTBL.title}</td>
            {/* <td>{userTBL.nickname}</td> */}
            <td>{boardTBL.createdAt}</td>
            <td>{boardTBL.cnt}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default BoardList
