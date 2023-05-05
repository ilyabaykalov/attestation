import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCartList } from '../store/reducers/cart';

const CartItem = ({ dish }) => {
   const {
      id,
      title,
      price,
   } = dish;

   const dispatch = useDispatch();

   const onRemove = () => {
      dispatch(removeFromCartList(id));
   };

   return (
      <>
         <h1>{dish.title}</h1>
         <span>{price} ₽</span>
         <button onClick={onRemove}>X</button>
      </>
   );
};

export default CartItem;
