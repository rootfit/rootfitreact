// home에 나올 shopping 파트
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import iconUrl from '../../components/icon/rootfit_head.png'; // 경로를 프로젝트 구조에 맞게 수정

const RecentProductList = () => {
  const navigate = useNavigate();
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
      <div className='section-header d-flex justify-content-between align-items-center mb-5'>
        <h3 type='button' onClick={() => navigate('/shopping/product')}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <img src={iconUrl} alt='Icon' style={{ width: '100px', height: '100px' }} />
            쇼핑몰
          </span>
        </h3>
      </div>
      <br />
      <br />
      <div className='row featured__filter'>
        {productList.map((product) => (
          <div key={product.prodNum} className='col-lg-3 col-md-4 col-sm-6 col-12'>
            <div className='featured__item'>
              <Link to={`/shopping/product/${product.prodNum}`}>
                <div
                  className='featured__item__pic set-bg'
                  style={{
                    backgroundImage: `url('http://localhost:8000/upload/${product.image}')`,
                    backgroundSize: 'cover',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
                  onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                />
              </Link>
              <div className='featured__item__text'>
                <h6>
                  <Link to={`/shopping/product/${product.prodNum}`}>{product.name}</Link>
                </h6>
                <h5>{product.price}원</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProductList;
