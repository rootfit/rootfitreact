// home에 나올 board 파트
// 게시글 12개만 보여주기


import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import iconUrl from './icon/rootfit_head.png';

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
      <br />
      <div className='section-header d-flex justify-content-between align-items-center mb-5'>

      <h3 type="button" onClick={() => navigate('/board/list')}><span style={{ display: 'flex', alignItems: 'center' }}>
            <img src={iconUrl} alt="Icon" style={{ width: '100px', height: '100px' }} />
            커뮤니티
          </span></h3>
      </div>
      <br />
      <br />
      <table className='table' >
        <tbody>
          {boardList.slice(0, 12).map((boardtbl) => (
            <tr key={boardtbl.id} className='postheigt'>
              <td className='postline'>
                <Link to={`/board/detail/${boardtbl.id}`}>
                  {boardtbl.title}
                </Link>
              </td>
              <td className='postline'>{boardtbl.nickname}</td>
              <td className="text-end postline" >{CreatedAt(boardtbl.createdAt)}</td>
              <td className="text-end postline" >{boardtbl.cnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </div>

    // <main id="main">

    //   {/* <!-- ======= Search Results ======= --> */}
    //   <section id="search-result" class="search-result">
    //     <div class="container">
    //       <div class="row">
    //         <div class="col-md-9">
    //           <h3 class="category-title">커뮤니티</h3>
    //           {boardList.slice(0, 12).map((boardtbl) => (
    //             <div class="d-md-flex post-entry-2 small-img">
    //               <a href="single-post.html" class="me-4 thumbnail">
    //                 {/* <img src="assets/img/post-landscape-6.jpg" alt="" class="img-fluid"> */}
    //               </a>
    //               <div>
    //                 <div class="post-meta"><span class="date">{CreatedAt(boardtbl.createdAt)}</span> <span class="mx-1">&bullet;</span> <span>{boardtbl.cnt}</span></div>
    //                 <h3><a href="single-post.html">{boardtbl.title}</a></h3>
    //                 <p>{boardtbl.content}</p>
    //                 <div class="d-flex align-items-center author">
    //                   <div class="photo">
    //                     {/* <img src="assets/img/person-2.jpg" alt="" class="img-fluid"> */}
    //                   </div>
    //                   <div class="name">
    //                     <h3 class="m-0 p-0">{boardtbl.nickname}</h3>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>

    //         <div class="col-md-3">
    //           {/* <!-- ======= Sidebar ======= --> */}
    //           <div class="aside-block">

    //             <ul class="nav nav-pills custom-tab-nav mb-4" id="pills-tab" role="tablist">
    //               <li class="nav-item" role="presentation">
    //                 <button class="nav-link active" id="pills-popular-tab" data-bs-toggle="pill" data-bs-target="#pills-popular" type="button" role="tab" aria-controls="pills-popular" aria-selected="true">조회수 TOP3</button>
    //               </li>
    //             </ul>
    //             {boardList.slice(0, 3).map((boardtbl) => (
    //               <div class="tab-content" id="pills-tabContent">
    //                 {/* <!-- Popular --> */}
    //                 <div class="tab-pane fade show active" id="pills-popular" role="tabpanel" aria-labelledby="pills-popular-tab">

    //                   <div class="post-entry-1 border-bottom">
    //                     <div class="post-meta"><span class="date">Sport</span> <span class="mx-1">&bullet;</span> <span>Jul 5th '22</span></div>
    //                     <h2 class="mb-2"><a href="#">How to Avoid Distraction and Stay Focused During Video Calls?</a></h2>
    //                     <span class="author mb-3 d-block">Jenny Wilson</span>
    //                   </div>
    //                   {/* <!-- End Popular --> */}

    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   {/* <!-- End Search Result --> */}
    // </main>
  );
}


export default RecentBoardList