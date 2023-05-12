import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDishes } from '../store/reducers/dish';
import { DishCard, Header } from '../components';

const DishCardModal = ({ id }) => {
   const { title, description, image, price } = useSelector(({ dish }) =>
      dish.list.find((dish) =>
         dish.id === id));

   return (
      <div
         style={{ position: 'absolute', width: '500px', height: 'max-content', border: '1px solid black', borderRadius: '20px', backgroundColor: 'white' }}>
         <div style={{ display: 'flex' }}>
            <img src={image} alt={title}/>
            <div>
               <p>{title}</p>
               <p>{description}</p>
               <p>{price} ₽</p>
            </div>
         </div>
      </div>
   );
};

const DishesPage = () => {
   const dishes = useSelector(({ dish }) => dish.list);
   const [isOpenModal, setOpen] = useState(false);
   const [selectedDishId, setSelectedDishId] = useState();

   const dispatch = useDispatch();

   const openDishModal = (id) => {
      setSelectedDishId(id);
      setOpen((prevState) => !prevState);
   };

   useEffect(() => {
      dispatch(getDishes());
   }, []);

   return (<>
      <Header title={'Наша продукция'} hasCart/>
      <div style={{
         display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px',
      }}>
         {
            isOpenModal && <DishCardModal id={selectedDishId}/>
         }
         {dishes.map((dish) => <DishCard key={dish.id} dish={dish} open={openDishModal}/>)}
      </div>
   </>

   );
};

export default DishesPage;
