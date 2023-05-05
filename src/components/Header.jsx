import React from 'react';
import { useSelector } from 'react-redux';

const Header = ({ title }) => {
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

   return (
      <div style={{
         height: '80px',
         width: '100%',
         backgroundColor: 'black',
         color: 'white',
         display: 'flex',
         justifyContent: 'space-between',
      }}>
         <h1>{title}</h1>
         <div style={{ display: 'flex' }}>
            <div>
               <p>{dishCount} {declOfNum(dishCount, ['товар', 'товара', 'товаров'])}</p>
               <p>на сумму {totalPrice} ₽</p>
            </div>
            <button style={{
               width: '70px',
               height: '70px',
               backgroundColor: 'orange',
               borderRadius: '50%',
            }}>Корзина
            </button>
         </div>
      </div>
   );
};

export default Header;
