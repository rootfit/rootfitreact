import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import UserContext from '../../user/context/UserContext';
import { useNavigate } from 'react-router-dom';

const upload = async (e) => {
  e.preventDefault()
  console.log(name, kind, price, content, file)
  if (file) {
    //사진이 포함되면 서버에 FormData 로 넘기는 것은 맞습니다.
    //나머지 입력한 데이터는 아래처럼 하나하나 별개로 append 시켜도 되고.. 
    //json 으로 한꺼번에 넘겨도 되고..
    const formData = new FormData();
    formData.append('name', name)
    formData.append('kind', kind)
    formData.append('price', price)
    formData.append('content', content)
    formData.append('image', file)

    console.log(content, file)

    const resp = await axios.post('http://localhost:8000/shopping/product', formData)

    if (resp.data.status === 200) {
      alert('upload ok')
      window.location.reload(); // 페이지 새로고침
    }
  } else {
    alert('데이터를 입력하지 않았습니다.')
  }
}


const ProductDetail = () => {
  const { prodNum } = useParams(); // React Router를 통해 전달된 동적 매개변수 값
  const navigate = useNavigate();

  const [productDetail, setProductDetail] = useState({
    prodNum: null, // auto_increment로 데이터베이스에서 생성되므로 초기값은 null
    name: "",
    kind: "",
    price: 0, // 실제로는 0이 아닌 유효한 초기값으로 설정
    content: "",
    image: "",
  });

  // 주문 수량 상태 추가
  const [quantity, setQuantity] = useState(1); 

  //로그인후 유지되는 유저 정보를 획득하기 위해서.. 
  const value = useContext(UserContext)

  const checkLogin = (e) => {
    e.preventDefault()
    console.log('isLogin', value.state)
    if (value.state && value.state.user.id && value.state.user.id !== "") {
      //로그인하고 들어온 친구.. 
      navigate(`/shopping/order/${prodNum}`)
    } else {
      //로그인하지 않고 들어온 친구.. 
      alert('로그인후 이용해주세요.')
      navigate('/user/signin')
    }
  }

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const resp = await axios.get(`http://localhost:8000/shopping/product/${prodNum}`);
        console.log('API 응답 데이터', resp.data.data);
        setProductDetail(resp.data.data);
        if (resp.data.data.image) {
          console.log('Image URL:', `http://localhost:8000/upload/${resp.data.data.image}`);
        }

      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    getProductDetail();
    console.log('productDetail effect 사용');
  }, [prodNum]);

  return (
    <section className="product-details spad">
      <div className="container">
        <div className="row">
          <div className="home">
            <button type="button" className="btn btn-primary btn-lg" onClick={() => window.location.href = 'http://localhost:5173/shopping/product'}>Shopping Home</button>
          </div>
          <br />
          <br />
          <br />
          <div className="col-lg-6 col-md-6">
            <div className="product__details__pic">
              <div className="product__details__pic__item">
                <img className="product__details__pic__item--large" src={`http://localhost:8000/upload/${productDetail.image}`} alt={productDetail.name} />
                {/* <img className={`product__details__pic__item--large ${productDetail.image ? 'show-image' : ''}`} src={`http://localhost:8000/upload/${productDetail.image}`} alt={productDetail.name} /> */}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="product__details__text">
              <br />
              <br />
              <br />
              <h3>{productDetail.name}</h3>
              <div className="product__details__price">{productDetail.price}원</div>
              <br />
              <br />
              <br />
              <div className="product__details__quantity">
                <div className="quantity">
                  <div className="pro-qty">
                    {/* 주문 수량 입력 필드에 value와 onChange 추가 */}
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                    />
                  </div>
                </div>
              </div>
              <Link to={{ pathname: `/shopping/order/${prodNum}`}} className="primary-btn" onClick={checkLogin}>주문하기</Link>
              <a href="#" className="primary-btn">장바구니</a>

            </div>
          </div>
          <div className="col-lg-12">
            <div className="product__details__tab">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab" aria-selected="true"><h3>상품 정보</h3></a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                  <div className="product__details__tab__desc" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img className={`${productDetail.content ? 'show-image' : ''}`} src={`http://localhost:8000/upload/${productDetail.content}`} alt={productDetail.name} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default ProductDetail;