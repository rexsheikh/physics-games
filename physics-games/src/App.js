// src/App.js

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Demo from './pages/Demo';
import Arcade from './pages/Arcade';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/demo">Demo</Link></li>
            <li><Link to="/arcade">Arcade</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/demo" element={<Demo />} />
          <Route path="/arcade" element={<Arcade />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
