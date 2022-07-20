import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <section className="headerContext">
        <div className="logo">
          <Link to="/" className="goToMain">
            <img className="logoImage" src="/images/logo.png" alt="logo" />
          </Link>
        </div>

        <div className="storesButtons">
          <button id="storeA" className="storeBtn">
            A 매장
          </button>
          <button id="storeB" className="storeBtn">
            B 매장
          </button>
          <button id="storeC" className="storeBtn">
            C 매장
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;
