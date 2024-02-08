// home에 나올 shopping 파트
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const RecentProductList = () => {
  const navigate = useNavigate()
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getProductList = async () => {
      try {
        const resp = await axios.get('http://localhost:8000/shopping/product2');
        console.log('API 응답 데이터', resp.data.data);

        // 전체 제품 중에서 3개를 무작위로 선택
        const randomProducts = getRandomProducts(resp.data.data, 4);
        setProductList(randomProducts);

        // setProductList(resp.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProductList();
  }, []);

  // 배열에서 무작위로 일부 항목 선택하는 함수
  const getRandomProducts = (array, count) => {
    const shuffledArray = array.sort(() => 0.5 - Math.random()); // 배열 섞기
    return shuffledArray.slice(0, count); // 원하는 개수만큼 선택
  };

  return (
    <div className='container'>
      <br />
      <br />
      <h3 type="button" onClick={() => navigate('/shopping/product')}>Shopping</h3>
      <span>건강 상품</span>
      <div className="featured__item" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {productList.map((product) => (
         <div className='featured__item' key={product.prodNum} style={{ width: '45%', marginBottom: '40px', marginRight: '10px' }}>
            <div
              className='featured__item__pic set-bg'
              style={{
                backgroundImage: `url('http://localhost:8000/upload/${product.image}')`,
                backgroundSize: 'cover', // 이미지를 컨테이너에 맞게 자동으로 조절
                backgroundPosition: 'center', // 이미지를 가운데 정렬
                width: '100%', // 컨테이너의 가로폭에 맞게 설정
                height: '240px', // 원하는 높이로 설정
              }}>
            </div>
            <div className='featured__item__text'>
              <h6>
                <Link to={`/shopping/product/${product.prodNum}`}>{product.name}</Link>
              </h6>
              <h5>{product.price}원</h5>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default RecentProductList;
