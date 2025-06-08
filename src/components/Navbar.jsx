import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/demos">Demos</Link>
      <Link to="/games">Games</Link>
      <Link to="/user-stats">User Stats</Link>
    </nav>
  );
}

export default Navbar;
