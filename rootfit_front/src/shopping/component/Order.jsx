import React, { useCallback } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import '../../assets/css/combinedStyles.css'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

//userContext 사용
import UserContext from '../../user/context/UserContext'
import { useContext } from 'react';
import { Link } from 'react-router-dom';




const Order = () => {
  const navigate = useNavigate()

  const { prodNum, quantity } = useParams()
  // 로그인 중인 회원 정보를 불러옴
  const { state: { user } } = useContext(UserContext);
 

  const [order, setOrder] = useState({
    prodNum: prodNum ? parseInt(prodNum, 10) : null,
    id: user.id,
    name: "",
    email: "",
    nickname: "",
    addr: "",
    phone: "",
    price: 0,
    quantity: quantity || 1,

  });

  const getOrder = async () => {
    try {
      //상품 정보
      const orderResp = await axios.get(`http://localhost:8000/shopping/product/${prodNum}`);
      console.log('API 응답 데이터', orderResp.data.data);

      setOrder({
        prodNum: prodNum ? parseInt(prodNum, 10) : null,
        id: user.id,
        name: orderResp.data.data.name,
        email: user.email,
        nickname: user.nickname,
        addr: user.addr,
        phone: user.phone,
        price: orderResp.data.data.price,
        quantity: quantity ? parseInt(quantity, 10) : 1,
      }); 
      } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    if (prodNum) {
      getOrder();
      console.log('Order effect 사용');
    }
  }, [prodNum, quantity]);


  const payment = useCallback(async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:8000/shopping/order', order)
    alert('결제가 완료되었습니다.')
    window.location.href = 'http://localhost:5173/shopping/product' // 쇼핑메인으로 이동
  }, [navigate, order])


  return (
    <div style={{ margin: '0 auto', maxWidth: '1000px' }}>

      <h3>구매자 정보</h3>
      <table className="table">
        <tbody>
          <tr>
            <td className='table-active'>이름</td>
            <td >{order.nickname}</td>
          </tr>
          <tr>
            <td className='table-active'>이메일</td>
            <td>{order.email}</td>
          </tr>
          <tr>
            <td className='table-active'>휴대폰 번호</td>
            <td>{order.phone}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <h3>받는사람정보</h3>
      <table className="table">
        <tbody>
          <tr>
            <td className='table-active'>이름</td>
            <td >{order.nickname}</td>
          </tr>
          <tr>
            <td className='table-active'>배송주소</td>
            <td>{order.addr}</td>
          </tr>
          <tr>
            <td className='table-active'>연락처</td>
            <td>{order.phone}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <h3>상품정보</h3>
      <table className="table">
        <tbody>
          <tr>
            <td className='table-active'>선택한 상품</td>
            <td>{order.name} / {order.price}원</td>
          </tr>
          <tr>
            <td className='table-active'>상품 개수</td>
            <td>{order.quantity}개</td>
          </tr>
        </tbody>
      </table>
      <br />

      <h3>결제정보</h3>
      <table className="table">
        <tbody>
          <tr>
            <td className='table-active'>총상품가격</td>
            <td >{order.price * order.quantity}원</td>
          </tr>
          <tr>
            <td className='table-active'>배송비</td>
            <td>3000원</td>
          </tr>
          <tr>
            <td className='table-active'>총결제금액</td>
            <td>{(parseInt(order.price, 10) * order.quantity) + 3000}원</td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />

      <button type='submit' value="주문추가" className="btn btn-primary btn-lg" onClick={payment}>결제하기</button>
    </div>
  )
}

export default Order;