import React, { useState } from 'react';

const Input = ({ type, validate, onUpdate }) => {
   const [value, setValue] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

   const onError = (errorMessage) => {
      setErrorMessage(errorMessage);
   };

   const onInputHandler = ({ target }) => {
      const { value } = target;

      setValue(value);

      if (validate && validate(value, onError)) {
         onUpdate(type, value);
      } else {
         onUpdate(type, '');
      }
   };

   return (<>
      <input type={type} value={value} onInput={onInputHandler}/>
      {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
   </>);
};

export default Input;
