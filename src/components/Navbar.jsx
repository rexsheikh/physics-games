import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#ddd' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/DemoPage">Demos</Link>
      <Link to="/GamesPage">Games</Link>
      <Link to="/User Stats">Games</Link>
    </nav>
  );
}

export default Navbar;
