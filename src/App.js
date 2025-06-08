import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DemoPage from './pages/DemoPage';
import GamesPage from './pages/GamesPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/games" element={<GamesPage />} />
    </Routes>
    </>
  );
}

export default App;
