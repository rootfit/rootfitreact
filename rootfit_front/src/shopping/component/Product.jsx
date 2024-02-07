import React from 'react';
// import ShoppingTemplate from '../ShoppingTemplate'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='section-title'>
              <h2>Product List</h2>
            </div>
            <div className='featured__controls'>
              <ul>
                <li
                  className={filter === '*' ? 'active' : ''}
                  onClick={() => handleFilterChange('*')}
                >
                  All
                </li>
                <li
                  className={filter === 'A' ? 'active' : ''}
                  onClick={() => handleFilterChange('A')}
                >
                  헬스보조식품
                </li>
                <li
                  className={filter === 'B' ? 'active' : ''}
                  onClick={() => handleFilterChange('B')}
                >
                  건강보조식품
                </li>
                <li
                  className={filter === 'C' ? 'active' : ''}
                  onClick={() => handleFilterChange('C')}
                >
                  E.T.C
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='row featured__filter'>
          {product.map((productItem, index) => (
            <div key={index} className={`col-lg-3 col-md-4 col-sm-6 mix ${productItem.kind}`}>
              <div className='featured__item'>
                <div
                  className='featured__item__pic set-bg'
                  style={{
                    backgroundImage: `url('http://localhost:8000/upload/${productItem.image}')`,
                  }}
                >
                  <ul className='featured__item__pic__hover'>
                    <li>
                      <a href='#'>
                        <i className='fa fa-shopping-cart'></i>
                      </a>
                    </li>
                  </ul>
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
