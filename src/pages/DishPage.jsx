import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from '../components';
import { addToCartList, removeFromCartList } from '../store/reducers/cart';

const DishPage = () => {
   const params = useParams();
   const id = Number.parseInt(params.id, 10);

   const dispatch = useDispatch();

   const isAdded = useSelector(({ cart }) => cart.list.find((dish) => dish.id === id));

   const { title, description, image, price } = useSelector(({ dish }) =>
      dish.list.find((dish) =>
         dish.id === id));

   const addToCart = () => {
      dispatch(addToCartList({ id, title, description, image, price }));
   };

   const removeFromCart = () => {
      dispatch(removeFromCartList(id));
   };

   return (
      <>
         <Header hasBackButton hasCart/>
         <div style={{ display: 'flex' }}>
            <img src={image} alt={title}/>
            <div>
               <p>{title}</p>
               <p>{description}</p>
               <p>{price} ₽</p>
               <button onClick={isAdded ? removeFromCart : addToCart}>{isAdded ? '-' : '+'}</button>
            </div>
         </div>
      </>
   );
};

export default DishPage;
