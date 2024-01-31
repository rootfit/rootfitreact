import { Route, Routes } from 'react-router-dom'
import ShoppingTemplate from './ShoppingTemplate';

import Product from "./component/Product";
import Admin from "./component/Admin";
// import Cart from "./component/Cart";
// import Order from "./component/Order";
// import OrderDetail from "./component/OrderDetail";

const ShoppingMain = () => {
  return (
    <div>
      <Routes>
        <Route path='/product' element={<Product />} />
        <Route path='/admin' element={<Admin />} />
        {/* <Route path='/cart' element={<Cart/>} />
      <Route path='/order' element={<Order/>} />
      <Route path='/orderDetail' element={<OrderDetail/>} /> */}
      </Routes>

    </div>
  )
}


export default ShoppingMain


