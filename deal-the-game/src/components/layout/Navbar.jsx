import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand-logo">
          Deal The Game
        </Link>
        <nav className="nav-links">
          <Link to="/">Discover</Link>
          <Link to="/search">Search</Link>
        </nav>
      </div>

      <div className="navbar-right">
        <SearchBar />
      </div>
    </header>
  );
};

export default Navbar;