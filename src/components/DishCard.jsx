import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartList, removeFromCartList } from '../store/reducers/cart';

const DishCard = ({ dish }) => {
   const { id, title, description, image, price } = dish;

   const navigate = useNavigate();

   const isAdded = useSelector(({ cart }) => cart.list.find((dish) => dish.id === id));

   const dispatch = useDispatch();

   const addToCart = (event) => {
      dispatch(addToCartList(dish));

      event.stopPropagation();
   };

   const removeFromCart = (event) => {
      dispatch(removeFromCartList(id));

      event.stopPropagation();
   };

   const onCardClickHandler = () => {
      navigate(`/dish/${id}`);
      // open(id);
   };

   return (
      <div style={{
         width: '300px',
         border: '1px solid orange',
         cursor: 'pointer',
      }} onClick={onCardClickHandler}>
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
