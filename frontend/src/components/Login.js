import React from 'react';
import Header from './Header';

function Login({ handleLogin, linkText, linkPath }) {
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
    if (!data.email || !data.password) {
      return;
    }
    handleLogin(data.email, data.password);
  };

  return (
            <div className="page">
              <Header linkText={linkText} linkPath={linkPath}/>
                <div className="auntification">
                    <p className="auntification__title">Вход</p>
                    <form onSubmit={handleSubmit} className="form auntification__form">
                        <input className="input auntification__input"
                               type="text"
                               name="email"
                               placeholder="Email"
                               value={data.email}
                               onChange={handleChange}
                        />
                        <input className="input auntification__input"
                               type="password"
                               name="password"
                               placeholder="Пароль"
                               value={data.password}
                               onChange={handleChange}
                        />
                        <button className="button auntification__button" type="submit">Войти</button>
                    </form>
                </div>
            </div>
  );
}

export default Login;
