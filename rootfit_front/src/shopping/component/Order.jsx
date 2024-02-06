import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import '../../assets/css/combinedStyles.css'
import { useLocation, useParams } from 'react-router-dom';

const Order = () => {
  const { prodNum } = useParams()

  const [order, setOrder] = useState({
    prodNum: prodNum ? parseInt(prodNum, 10) : null,
    name: "",
    email: "",
    nickname: "",
    addr: "",
    phone: "",
    price: 0,
    quantity: 0,

  });

  const [userInfo, setUserInfo] = useState({
    // id: id ? parseInt(id, 10) : null,
    nickname: "",
    email: "",
    addr: "",
    phone: "",
  })

  const getOrder = async () => {
    try {
      //상품 정보
      const orderResp = await axios.get(`http://localhost:8000/shopping/product/${prodNum}`);
      console.log('API 응답 데이터', orderResp.data.data);
      setOrder(orderResp.data.data);
      
      // user 정보
    // 상품 정보에서 유저 ID 가져오기
    // const userId = orderResp.data.data.userId;

  //   // 유저 정보 가져오기
  //   const userResp = await axios.get('http://localhost:8000/user/member');
  //   console.log('User API 응답 데이터', userResp.data.data);
  //   setUserInfo(userResp.data.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };
  useEffect(() => {

    if (prodNum) {
      getOrder();
      console.log('Order effect 사용');
    }
  }, [prodNum]);


      // OrderDAO.getUsers({
      //   // id: order.id, 
      //   nickname: order.nickname,
      //   email: order.email,
      //   addr: order.addr,
      //   phone: order.phone,
      // }, (result) => {
      //   if (result.error) {
      //     console.error('Error fetching user information:', result.error);
      //   } else {
      //     setUserInfo(result.data);
      //   }
      // });



  return (
    <div style={{margin: '0 auto', maxWidth: '1000px'}}>
      <h3>구매자 정보</h3>
      <table className="table">
        <tbody>
          <tr>
            <td className='table-active'>이름</td>
            <td >{userInfo.nickname}</td>
          </tr>
          <tr>
            <td className='table-active'>이메일</td>
            <td>{userInfo.email}</td>
          </tr>
          <tr>
            <td className='table-active'>휴대폰 번호</td>
            <td>{userInfo.phone}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <h3>받는사람정보</h3>
      <table className="table">
        <tbody>
          <tr>
            <td className='table-active'>이름</td>
            <td >{userInfo.nickname}</td>
          </tr>
          <tr>
            <td className='table-active'>배송주소</td>
            <td>{userInfo.addr}</td>
          </tr>
          <tr>
            <td className='table-active'>연락처</td>
            <td>{userInfo.phone}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <h3>상품정보</h3>
      <table className="table">
        <tbody>
          <tr>
            <td className='table-active'>선택한 상품</td>
          </tr>
          <tr>
            <td>{order.name}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <h3>결제정보</h3>
      <table className="table">
        <tbody>
          {/* <tr>
            <td className='table-active'>총상품가격</td>
            <td >{order.price * order.quantity}</td>
          </tr> */}
          <tr>
            <td className='table-active'>배송비</td>
            <td>3000원</td>
          </tr>
          <tr>
            <td className='table-active'>총결제금액</td>
            <td>{parseInt(order.price, 10) + 3000}원</td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />
      <button type="button" className="btn btn-primary btn-lg">결제하기</button>
    </div>
  )
}

export default Order;