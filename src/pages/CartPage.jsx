import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getCartList } from '../store/reducers/cart';

import { Header, CartItem } from '../components';

const CartPage = () => {
   const dishList = useSelector(({ cart }) => cart.list);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getCartList())
         .then((result) => console.log(result));
   }, []);

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
