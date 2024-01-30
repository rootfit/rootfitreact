import React from 'react'
import ShoppingTemplete from '../ShoppingTemplate'
import { useState, useEffect } from 'react';
import axios from 'axios'



const Product = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const resp = await axios.get('http://localhost:8000/shopping/product');
        console.log('API 응답 데이터', resp.data);
        setProduct(resp.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProduct();
    console.log('product effect 사용');
  }, []);

  // const handleProductClick = (productId) => {
  //   // 예시: 상품을 클릭했을 때 해당 상품의 페이지로 이동
  //   navigate(`/products/${productId}`);
  // };

  return (
    <section className="product spad">
      <div>
        <br />
        <h3>상품 목록</h3>
      </div>
      <div className="row">
        {product.map((product, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-sm-6">
            <div className="product__item">
              <div className="product__item__pic set-bg" data-setbg={product.image}>
                <ul className="product__item__pic__hover">
                  <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                </ul>
              </div>
              <div className="product__item__text">
                <h6><a href="#">{product.name}</a></h6>
                <h5>{product.price}원</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Product

// <!-- Product Section Begin -->
//     <section className="product spad">
//       <div>
//         <div className="col-lg-9 col-md-7">
//           <div className="product__discount">
//             <div className="section-title product__discount__title">
//               <h2>상 품</h2>
//             </div>
//             <div className="filter__item">
//               <div className="row">
//                 <div className="col-lg-4 col-md-5">
//                 </div>
//                 <div className="col-lg-4 col-md-4">
//                   <div className="filter__found">
//                     <h6><span>16</span> Products found</h6>
//                   </div>
//                 </div>
//                 <div className="col-lg-4 col-md-3">
//                   <div className="filter__option">
//                     <span className="icon_grid-2x2"></span>
//                     <span className="icon_ul"></span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               {/* 여기서부터 */}
//               <div className="col-lg-4 col-md-6 col-sm-6">
//                 <div className="product__item">
//                   <div className="product__item__pic set-bg" data-setbg="img/product/product-1.jpg">
//                     <ul className="product__item__pic__hover">
//                       <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
//                     </ul>
//                   </div>
//                   <div className="product__item__text">
//                     <h6><a href="#">Crab Pool Security1</a></h6>
//                     <h5>$30.00</h5>
//                   </div>
//                 </div>
//               </div>
//               {/* 여기까지 한개상품 */}
//               <div className="col-lg-4 col-md-6 col-sm-6">
//                 <div className="product__item">
//                   <div className="product__item__pic set-bg" data-setbg="img/product/product-2.jpg">
//                     <ul className="product__item__pic__hover">
//                       <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
//                     </ul>
//                   </div>
//                   <div className="product__item__text">
//                     <h6><a href="#">Crab Pool Security2</a></h6>
//                     <h5>$30.00</h5>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-6 col-sm-6">
//                 <div className="product__item">
//                   <div className="product__item__pic set-bg" data-setbg="img/product/product-3.jpg">
//                     <ul className="product__item__pic__hover">
//                       <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
//                     </ul>
//                   </div>
//                   <div className="product__item__text">
//                     <h6><a href="#">Crab Pool Security3</a></h6>
//                     <h5>$30.00</h5>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-6 col-sm-6">
//                 <div className="product__item">
//                   <div className="product__item__pic set-bg" data-setbg="img/product/product-4.jpg">
//                     <ul className="product__item__pic__hover">
//                       <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
//                     </ul>
//                   </div>
//                   <div className="product__item__text">
//                     <h6><a href="#">Crab Pool Security4</a></h6>
//                     <h5>$30.00</h5>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-6 col-sm-6">
//                 <div className="product__item">
//                   <div className="product__item__pic set-bg" data-setbg="img/product/product-5.jpg">
//                     <ul className="product__item__pic__hover">
//                       <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
//                     </ul>
//                   </div>
//                   <div className="product__item__text">
//                     <h6><a href="#">Crab Pool Security5</a></h6>
//                     <h5>$30.00</h5>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-6 col-sm-6">
//                 <div className="product__item">
//                   <div className="product__item__pic set-bg" data-setbg="img/product/product-6.jpg">
//                     <ul className="product__item__pic__hover">
//                       <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
//                     </ul>
//                   </div>
//                   <div className="product__item__text">
//                     <h6><a href="#">Crab Pool Security6</a></h6>
//                     <h5>$30.00</h5>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         </div>
//     </section >

//   )
// }





