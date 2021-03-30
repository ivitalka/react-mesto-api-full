import React from 'react';
import { Link } from 'react-router-dom/';
import logo from '../images/logo.svg';

function Header({
  userData, linkText, linkPath, signOut,
}) {
  return (
        <header className="header">
            <div className="logo header__logo" style={{ backgroundImage: `url(${logo})` }}/>
            <p className="header__text">{ userData }</p>
          <Link className="link header__link" onClick={signOut} to={linkPath}>{linkText}</Link>
        </header>
  );
}

export default Header;
