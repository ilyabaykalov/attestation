import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/reducers/user';

import { axios } from '../utils';
import { Input } from '../components';

const AuthForm = () => {
   const [userData, setUserData] = useState({
      email: '', password: '',
   });

   const dispatch = useDispatch();

   const onLogin = () => {
      axios.post('/login', userData)
         .then(({ data }) => dispatch(login({
            accessToken: data.accessToken,
            ...data.user,
         })));
   };

   const emailValidate = (email, onError) => {
      if (email) {
         const regExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

         if (regExp.test(email)) {
            onError('');
            return true;
         }
         onError('Введен некорректный email');
         return false;
      }

      onError('Поле обязательно для заполнения');
      return false;
   };

   const passwordValidate = (password, onError) => {
      if (password) {
         if (password.length >= 8) {
            onError('');
            return true;
         }
         onError('Пароль должен содержать 8 или более символов');
         return false;
      }

      onError('Поле обязательно для заполнения');
      return false;
   };

   const onUpdate = (field, value) => {
      setUserData((prevState) => ({
         ...prevState,
         [field]: value,
      }));
   };

   return (
      <div style={{
         display: 'flex',
         flexDirection: 'column',
         width: '200px',
      }}>
         <h1>Вход</h1>
         <Input type={'email'} validate={emailValidate} onUpdate={onUpdate}/>
         <Input type={'password'} validate={passwordValidate} onUpdate={onUpdate}/>
         <button onClick={onLogin}>Войти</button>
      </div>
   );
};

const RegForm = () => {
   const [userData, setUserData] = useState({
      email: '', password: '',
   });

   const onRegister = () => {
      axios.post('/register', userData)
         .then((result) => console.log(result));
   };

   const onUpdate = (field, value) => {
      setUserData((prevState) => ({
         ...prevState,
         [field]: value,
      }));
   };

   const emailValidate = (email, onError) => {
      if (email) {
         const regExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

         if (regExp.test(email)) {
            onError('');
            return true;
         }
         onError('Введен некорректный email');
         return false;
      }

      onError('Поле обязательно для заполнения');
      return false;
   };

   const passwordValidate = (password, onError) => {
      if (password) {
         if (password.length >= 8) {
            onError('');
            return true;
         }
         onError('Пароль должен содержать 8 или более символов');
         return false;
      }

      onError('Поле обязательно для заполнения');
      return false;
   };

   return (
      <div style={{
         display: 'flex',
         flexDirection: 'column',
         width: '200px',
      }}>
         <h1>Регистрация</h1>
         <Input type={'email'} validate={emailValidate} onUpdate={onUpdate}/>
         <Input type={'password'} validate={passwordValidate} onUpdate={onUpdate}/>
         <label htmlFor="">галочка
            <input type="checkbox"/>
         </label>
         <button onClick={onRegister}>Зарегистрироваться</button>
      </div>
   );
};

const Auth = () => {
   const [isAuthView, setAuthViewState] = useState(false);

   const changeView = () => {
      setAuthViewState((prevState) => !prevState);
   };

   return (
      <>
         <button onClick={changeView}>{isAuthView ? 'Зарегистрироваться' : 'Войти'}</button>
         {isAuthView ? <AuthForm/> : <RegForm/>}
      </>
   );
};

export default Auth;
