import React, { useState } from 'react';
import ProductForm from './ProductForm';

const Admin = () => {
  const [products, setProducts] = useState([]);

  const handleProductSubmit = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    // 여기서 서버로 상품 정보 전송 또는 다른 로직 수행 가능
  };

  return (
    <div>
      <h1>관리자 페이지</h1>
      <ProductForm onProductSubmit={handleProductSubmit} />
      {/* 다른 관리 기능 추가 가능 */}
      <h2>등록된 상품 목록</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong>
            <br />
            <img src={product.image} alt={product.name} style={{ maxWidth: '200px' }} />
            <br />
            가격: {product.price}원
            <br />
            상세 설명: {product.description}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;