import { Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx'
import DemoPage from './pages/DemoPage.jsx';
import GamesPage from './pages/GamesPage.jsx';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/user-stats" element={<GamesPage />} />
    </Routes>
    </>
  );
}

export default App;
