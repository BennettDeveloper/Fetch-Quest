import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import { ROUTES } from '../../constants/routes';

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
          <Link to={ROUTES.VIBES} className="nav-vibes-btn">
            🎮 Vibe Check
          </Link>
          <Link to={ROUTES.ROULETTE} className="nav-roulette-btn">
            🎲 Deal Roulette
          </Link>
        </nav>
      </div>

      <div className="navbar-right">
        <SearchBar />
      </div>
    </header>
  );
};

export default Navbar;