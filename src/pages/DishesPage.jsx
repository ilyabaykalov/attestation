import React, { useEffect, useState } from 'react';

import { DishCard, Header } from '../components';

import { axios } from '../utils';
import { useDispatch } from 'react-redux';
import { getCartList } from '../store/reducers/cart';

const DishesPage = () => {
   const [dishes, setDishes] = useState([]);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getCartList())
         .then((result) => console.log(result));

      axios.get('/dishes')
         .then(({ data }) => setDishes(data));
   }, []);

   return (
      <>
         <Header title={'Наша продукция'}/>
         <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: '20px',
         }}>{
               dishes.map((dish) => <DishCard key={dish.id} dish={dish}/>)
            }
         </div>
      </>

   );
};

export default DishesPage;
