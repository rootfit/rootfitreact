import { Route, Routes } from 'react-router-dom';
import '../assets/css/combinedStyles.css';

import Product from '../shopping/component/Product';
import Admin from '../shopping/component/Admin';
import Order from '../shopping/component/Order';
import ProductDetail from '../shopping/component/ProductDetail';

const ShoppingMain = () => {
  return (
    <div>
      <Routes>
        <Route path='/product' element={<Product />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/order/:prodNum/:quantity' element={<Order />} />
        <Route path='/product/:prodNum' element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default ShoppingMain;
