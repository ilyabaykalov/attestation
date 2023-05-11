import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/reducers/user';

const Header = ({ title, hasBackButton, hasCart }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const totalPrice = useSelector(({ cart }) => cart.totalPrice);
   const dishCount = useSelector(({ cart }) => cart.dishCount);

   function declOfNum(n, textForms) {
      n = Math.abs(n) % 100;
      const n1 = n % 10;
      if (n > 10 && n < 20) { return textForms[2]; }
      if (n1 > 1 && n1 < 5) { return textForms[1]; }
      if (n1 === 1) { return textForms[0]; }
      return textForms[2];
   }

   const goToCart = () => {
      navigate('/cart');
   };
   const onLogout = () => {
      dispatch(logout());
   };

   return (
      <div style={{
         height: '80px',
         width: '100%',
         backgroundColor: 'black',
         color: 'white',
         display: 'flex',
         justifyContent: 'space-between',
      }}>
         {hasBackButton && <button>назад</button>}
         { title && <h1>{title}</h1> }
         <div style={{ display: 'flex' }}>
            { hasCart && <>
               <div>
                  <p>{dishCount} {declOfNum(dishCount, ['товар', 'товара', 'товаров'])}</p>
                  <p>на сумму {totalPrice} ₽</p>
               </div>
               <button style={{
                  width: '70px',
                  height: '70px',
                  backgroundColor: 'orange',
                  borderRadius: '50%',
               }} onClick={goToCart}>Корзина
               </button>
            </>
            }
            <button style={{
               width: '70px',
               height: '70px',
               backgroundColor: 'orange',
            }} onClick={onLogout}>Выход
            </button>
         </div>
      </div>
   );
};

export default Header;
