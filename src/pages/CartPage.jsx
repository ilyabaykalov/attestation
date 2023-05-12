import React from 'react';

import { useSelector } from 'react-redux';

import { Header, CartItem } from '../components';

const CartPage = () => {
   const dishList = useSelector(({ cart }) => cart.list);

   return (
      <>
         <Header title={'Корзина с выбранными товарами'} hasBackButton/>
         {
            dishList?.map((dish) => <CartItem key={dish.id} dish={dish}/>)
         }
      </>
   );
};

export default CartPage;
