import React, { useEffect, useState } from 'react';

import { DishCard } from '../components';

import { axios } from '../utils';

const DishesPage = () => {
   const [dishes, setDishes] = useState([]);

   useEffect(() => {
      axios.get('/dishes')
         .then(({ data }) => setDishes(data));
   }, []);

   return (
      <div style={{
         display: 'flex',
         flexWrap: 'wrap',
         justifyContent: 'space-around',
         gap: '20px',
      }}>{
            dishes.map((dish) => <DishCard key={dish.id} dish={dish}/>)
         }</div>
   );
};

export default DishesPage;
