// home에 나올 board 파트
// 게시글 12개만 보여주기

import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import iconUrl from '../../assets/icons/icon/rootfit_head.png';

const RecentBoardList = () => {
  const navigate = useNavigate();
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
      <br />
      <br />
      <br />
      <div className='section-header d-flex justify-content-between align-items-center mb-5'>
        <h3 type='button' onClick={() => navigate('/board/list')}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <img src={iconUrl} alt='Icon' style={{ width: '100px', height: '100px' }} />
            커뮤니티
          </span>
        </h3>
      </div>

      <table className='table'>
        <tbody>
          {boardList.slice(0, 12).map((boardtbl) => (
            <tr key={boardtbl.id} className='postheigt'>
              <td className='postline'>
                <Link to={`/board/detail/${boardtbl.id}`}>{boardtbl.title}</Link>
              </td>
              <td className='postline'>{boardtbl.nickname}</td>
              <td className='text-end postline'>{CreatedAt(boardtbl.createdAt)}</td>
              <td className='text-end postline'>{boardtbl.cnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default RecentBoardList;
