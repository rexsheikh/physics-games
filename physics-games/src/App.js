import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Demo from './pages/Demo';
import Arcade from './pages/Arcade';
import HighScores from './pages/HighScores';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/demos" element={<Demo />} />
          <Route path="/arcade" element={<Arcade />} />
          <Route path="/high-scores" element={<HighScores />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
