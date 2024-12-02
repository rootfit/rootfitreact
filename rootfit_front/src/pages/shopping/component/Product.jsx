import React from 'react';
// import ShoppingTemplate from '../ShoppingTemplate'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ScrollToTop from '../../ScrollToTop'; // ScrollToTop 컴포넌트 추가

const Product = () => {
  const [product, setProduct] = useState([]);
  const [filter, setFilter] = useState('*');

  useEffect(() => {
    console.log('Filter changed', filter);
    const getProduct = async () => {
      try {
        let query = 'SELECT * FROM productTBL'; // 기본 쿼리

        // 만약 필터가 '*'이 아닌 경우, WHERE 절을 추가하여 해당 종류의 제품만 가져오도록 함
        if (filter !== '*') {
          query += ` WHERE kind = '${filter}'`;
        }
        const resp = await axios.get(
          `http://localhost:8000/shopping/product?filter=${encodeURIComponent(filter)}`
        );
        console.log('API 응답 데이터', resp.data);
        setProduct(resp.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProduct();
    console.log('product effect 사용');
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    console.log('필터 변경:', newFilter);
    setFilter((prevFilter) => (prevFilter === newFilter ? '*' : newFilter));
  };

  return (
    <section className='featured spad'>
      <ScrollToTop />
      <div className='container'>


        <div className='row'>
          <div className='col-lg-12'>
            <div className='section-title'>
              <h1 className='title-sigle' >Root Fit 쇼핑몰</h1>
              <span className="color-text-a">건강한 식탁의 시작</span>
            </div>
            <hr className="hr-solid" />
            <br />
            <br />
            <div className='featured__controls'>
              <ul>
                <li
                  className={filter === '*' ? 'active' : ''}
                  onClick={() => handleFilterChange('*')}
                  style={{ marginRight: '40px' }}
                >
                  <h4 onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    style={{ transition: 'transform 0.3s ease-in-out' }}>전체</h4>
                </li>
                <li
                  className={filter === 'A' ? 'active' : ''}
                  onClick={() => handleFilterChange('A')}
                  style={{ marginRight: '40px' }}
                >
                  <h4 onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    style={{ transition: 'transform 0.3s ease-in-out' }}>헬스보조식품</h4>
                </li>
                <li
                  className={filter === 'B' ? 'active' : ''}
                  onClick={() => handleFilterChange('B')}
                  style={{ marginRight: '40px' }}
                >
                  <h4 onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    style={{ transition: 'transform 0.3s ease-in-out' }}>건강보조식품</h4>
                </li>
                <li
                  className={filter === 'C' ? 'active' : ''}
                  onClick={() => handleFilterChange('C')}
                  style={{ marginRight: '40px' }}
                >
                  <h4 onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    style={{ transition: 'transform 0.3s ease-in-out' }}>기타식품</h4>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div className='row featured__filter'>
          {product.map((productItem, index) => (
            <div key={index} className={`col-lg-3 col-md-4 col-sm-6 mix ${productItem.kind}`}>
              <div className='featured__item'>
                <div className='featured__item__pic set-bg'>
                  <Link to={`/shopping/product/${productItem.prodNum}`} style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden', // 부모 요소에서 넘치는 부분을 가려줍니다.
                    position: 'relative', // 자식 요소의 위치를 설정하기 위해 추가합니다.
                  }}>
                    <img
                      src={`http://localhost:8000/upload/${productItem.image}`}
                      alt={productItem.prodNum}
                      style={{
                        width: '100%',
                        height: '100%',
                        transition: 'transform 0.3s ease-in-out', // 확대/축소 트랜지션 설정
                      }}
                      // 마우스 호버 시 확대 효과 적용
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
                      // 마우스가 벗어날 때 원래 크기로 복원
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    />
                  </Link>
                </div>
                <div className='featured__item__text'>
                  {/* 원래 html a 태그는 링크 클릭 이벤트가 발생하게 되면 href 에 주어진 url 대로 전체 페이지를 갱신하려고 한다. 
                  그렇게 되면 앱이 다시 로딩되는 것과 동일한 효과잉어서.. 로그인 했던 정보가 사라지는 것이다..
                  방법은 2개가 있는데..
                  a 태그를 Link 로 바꾸던가.. 
                  아니면.. a href=# 으로 처리하고 onclick 에서 e.eventPrevent() 처리하하던가.. */}
                  <h6>
                    <Link to={`/shopping/product/${productItem.prodNum}`}>{productItem.name}</Link>
                  </h6>
                  <h5>{productItem.price}원</h5>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Product;
