// home에 나올 board 파트
// 게시글 5개만 보여주기
// boardlist를 재활용하려면 어떻게 해야할까..? 

import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RecentBoardList = () => {
  const navigate = useNavigate()
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    // BoardList 컴포넌트에서 데이터를 가져오는 로직을 useEffect 내에 넣어 호출
    const fetchBoardList = async () => {
      try {
        const resp = await axios.get('http://localhost:8000/board/list');
        setBoardList(resp.data.data); // 여기서 resp.data.data는 실제 데이터 배열.
      } catch (error) {
        console.error('Error fetching board list:', error);
      }
    };

    fetchBoardList();
  }, []);

  const CreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <div className='container'>
      <br />
      <br/>
      
      <h3 type="button" onClick={() => navigate('/board/list')}>OurHealth</h3>
      
      <span>건강 정보 게시판</span>
      <br />
      <br/>
      <table className="table table-line">
        <tbody>
          {boardList.slice(0, 5).map((boardtbl) => (
            <tr key={boardtbl.id}>
              <td>{boardtbl.nickname}</td>
              <td className="text-center">
                <Link to={`/board/detail/${boardtbl.id}`}>
                  {boardtbl.title}
                </Link>
              </td>
              <td className="text-end">{CreatedAt(boardtbl.createdAt)}</td>
              <td className="text-end">{boardtbl.cnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default RecentBoardList