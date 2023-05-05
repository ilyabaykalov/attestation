import React, { useRef, useState } from 'react';
import { axios } from '../utils';
import { useDispatch } from 'react-redux';
import { login } from '../store/reducers/user';

const AuthView = () => {
   const [email, setEmail] = useState('');
   const password = useRef();

   const dispatch = useDispatch();

   const onLogin = () => {
      axios.post('/login', {
         email,
         password: password.current.value,
      })
         .then(({ data }) => dispatch(login({
            accessToken: data.accessToken,
            ...data.user,
         })));
   };

   const onInputEmail = ({ target }) => {
      const { value } = target;

      setEmail(value);
   };

   return (
      <div style={{
         display: 'flex',
         flexDirection: 'column',
         width: '200px',
      }}>
         <h1>Вход</h1>
         <input type="email" value={email} onInput={onInputEmail}/>
         <input type="password" ref={password} defaultValue={'123123123'}/>
         <button onClick={onLogin}>Войти</button>
      </div>
   );
};

const RegView = () => {
   const email = useRef();
   const password = useRef();

   const onRegister = () => {
      axios.post('/register', {
         email: email.current.value,
         password: password.current.value,
      })
         .then((result) => console.log(result));
   };

   return (
      <div style={{
         display: 'flex',
         flexDirection: 'column',
         width: '200px',
      }}>
         <h1>Регистрация</h1>
         <input type="email" ref={email} defaultValue={'qwerty@mail.ru'}/>
         <input type="password" ref={password} defaultValue={'123123123'}/>
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
         {isAuthView ? <AuthView/> : <RegView/>}
      </>
   );
};

export default Auth;
