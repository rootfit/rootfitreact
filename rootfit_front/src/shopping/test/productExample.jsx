import React, { useState } from 'react';

const ProductForm = ({ onProductSubmit }) => {
  const [product, setProduct] = useState({
    name: '',
    image: '',
    price: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProductSubmit(product); // 부모 컴포넌트로 상품 정보 전달
    setProduct({
      name: '',
      image: '',
      price: '',
      description: '',
    });
  };

  return (
    <div>
      <h2>상품 등록</h2>
      <form onSubmit={handleSubmit}>
        <label>
          상품명:
          <input type="text" name="name" value={product.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          제품 사진 URL:
          <input type="text" name="image" value={product.image} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          가격:
          <input type="text" name="price" value={product.price} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          상세 설명:
          <textarea name="description" value={product.description} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default ProductForm;