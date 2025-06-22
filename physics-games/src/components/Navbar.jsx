import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const pages = [
    { path: '/', label: 'Home' },
    { path: '/arcade', label: 'Arcade' },
    { path: '/demos', label: 'Demos' },
    {path: '/high-scores', label: 'High Scores' }
  ];

  return (
    <nav>
      <ul>
        {pages
          .filter(page => page.path !== currentPath)
          .map(page => (
            <li key={page.path}>
              <Link to={page.path}>{page.label}</Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Navbar;
