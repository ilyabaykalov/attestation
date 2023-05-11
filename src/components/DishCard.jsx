import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCartList, removeFromCartList } from '../store/reducers/cart';

const DishCard = ({ dish }) => {
   const { id, title, description, image, price } = dish;

   const [isAdded, setAddState] = useState(false);

   const dispatch = useDispatch();

   const addToCart = () => {
      dispatch(addToCartList(dish));

      setAddState((prevState) => !prevState);
   };

   const removeFromCart = () => {
      dispatch(removeFromCartList(id));

      setAddState((prevState) => !prevState);
   };

   return (
      <div style={{
         width: '300px',
         border: '1px solid orange',
      }}>
         <img src={image} alt={title}/>
         <p>{title}</p>
         <p>{description}</p>
         <div style={{
            display: 'flex',
            height: '50px',
            justifyContent: 'space-between',
         }}>
            <p>{price}₽</p>
            <button onClick={isAdded ? removeFromCart : addToCart}>{isAdded ? '-' : '+'}</button>
         </div>
      </div>
   );
};

export default DishCard;
