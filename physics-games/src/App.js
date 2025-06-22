import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Arcade from './pages/Arcade';
import HighScores from './pages/HighScores';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/demo" element={<Demo />} />
          <Route path="/arcade" element={<Arcade />} />
          <Route path="/high-scores" element={<HighScores />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
