import React from 'react'
import { Link } from "react-router-dom"
import ShoppingTemplete from '../ShoppingTemplate'
// import React, { useState } from 'react';

const Product = () => {
  // const [product, setProduct] = useState({
  //   name: '',
  //   price: 0,
  //   description: '',
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // 여기서 서버로 상품 정보를 전송하거나 다른 필요한 로직 수행
  //   console.log('Submitted Product:', product);
  // };
  return (
    // <!-- Product Section Begin -->
    <section className="product spad">
      <div>
        <div className="col-lg-9 col-md-7">
          <div className="product__discount">
            <div className="section-title product__discount__title">
              <h2>상 품</h2>
            </div>
            <div className="filter__item">
              <div className="row">
                <div className="col-lg-4 col-md-5">
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="filter__found">
                    <h6><span>16</span> Products found</h6>
                  </div>
                </div>
                <div className="col-lg-4 col-md-3">
                  <div className="filter__option">
                    <span className="icon_grid-2x2"></span>
                    <span className="icon_ul"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {/* 여기서부터 */}
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="img/product/product-1.jpg">
                    <ul className="product__item__pic__hover">
                      <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6><a href="#">Crab Pool Security1</a></h6>
                    <h5>$30.00</h5>
                  </div>
                </div>
              </div>
              {/* 여기까지 한개상품 */}
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="img/product/product-2.jpg">
                    <ul className="product__item__pic__hover">
                       <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6><a href="#">Crab Pool Security2</a></h6>
                    <h5>$30.00</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="img/product/product-3.jpg">
                    <ul className="product__item__pic__hover">
                      <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6><a href="#">Crab Pool Security3</a></h6>
                    <h5>$30.00</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="img/product/product-4.jpg">
                    <ul className="product__item__pic__hover">
                       <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6><a href="#">Crab Pool Security4</a></h6>
                    <h5>$30.00</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="img/product/product-5.jpg">
                    <ul className="product__item__pic__hover">
                      <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6><a href="#">Crab Pool Security5</a></h6>
                    <h5>$30.00</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="img/product/product-6.jpg">
                    <ul className="product__item__pic__hover">
                      <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6><a href="#">Crab Pool Security6</a></h6>
                    <h5>$30.00</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="img/product/product-7.jpg">
                    <ul className="product__item__pic__hover">
                      <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >

  )
}

export default Product



