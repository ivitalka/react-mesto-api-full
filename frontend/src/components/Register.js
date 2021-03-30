import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Register({ handleRegister, linkText, linkPath }) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(data.password, data.email);
  };

  return (
            <div className="page">
              <Header linkText={linkText} linkPath={linkPath}/>
                <div className="auntification">
                    <p className="auntification__title">Регистрация</p>
                    <form onSubmit={handleSubmit} className="form auntification__form">
                        <input className="input auntification__input"
                               name="email"
                               type="text"
                               placeholder="Email"
                               value={data.email}
                               onChange={handleChange}
                        />
                        <input className="input auntification__input"
                               name="password"
                               type="password"
                               placeholder="Пароль"
                               value={data.password}
                               onChange={handleChange}
                        />
                        <button className="button auntification__button" type="submit">Зарегистрироваться</button>
                    </form>
                    <p className="auntification__text">Уже зарегистрированы? <Link className="link" to="sign-in">Войти</Link></p>
                </div>
            </div>
  );
}

export default Register;
