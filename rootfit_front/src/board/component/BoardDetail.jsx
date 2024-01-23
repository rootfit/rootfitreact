// import {Link,useNavigate,useParams } from 'react-router-dom'
// import axios from 'axios'
// import React,{useCallback, useState, useEffect} from 'react'

// const BoardDetail = () => {
//   const navigate = useNavigate()
//   // 글아이디 얻어내기
//   const {id} = useParams()
//   // status handler, 사용될 데이터 명시
//   const [detail, setDetail] = useState({nickname:'',title:'',content:'',createdAt:'',reccnt:'', cnt:'' })
//   // 주소 연결 시 해당 데이터 가져오기
//   const getDetail = async()=>{
//     const resp = await axios.get('')
//     setDetail(resp.data.data)
//   }

//   // 생명주기 hook
//   // 처음 한번만 불러오기
//   useEffect(()=>{
//     getDetail()
//   },[])

//   return(

//   )
// }
// export default BoardDetail