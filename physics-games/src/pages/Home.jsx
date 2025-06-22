import { useNavigate } from 'react-router-dom';
import NewtonsCradle from '../components/NewtonsCradle';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="cradle-wrapper">
        <NewtonsCradle />
      </div>
      <div className="button-row">
        <button onClick={() => navigate('/arcade')}>Arcade</button>
        <button onClick={() => navigate('/demo')}>Demo</button>
        <button onClick={() => navigate('/high-scores')}>High Scores</button>
      </div>
    </div>
  );
}

export default Home;
