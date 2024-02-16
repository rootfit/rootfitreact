import { Route, Routes } from 'react-router-dom';
import '../assets/css/combinedStyles.css'; 

import Product from './component/Product';
import Admin from './component/Admin';
import Order from './component/Order';
import ProductDetail from './component/ProductDetail';

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
