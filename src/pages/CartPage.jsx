import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, CartItem } from '../components';
import { getCartList } from '../store/reducers/cart';
import { axios } from '../utils';

const CartPage = () => {
   const dishList = useSelector(({ cart }) => cart.list);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getCartList())
         .then((result) => console.log(result));
   }, []);

   return (
      <>
         <Header title={'Наша продукция'}/>
         {
            dishList?.map((dish) => <CartItem key={dish.id} dish={dish}/>)
         }
      </>
   );
};

export default CartPage;
