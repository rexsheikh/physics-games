import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/arcade')}>Arcade</button>
      <button onClick={() => navigate('/demo')}>Demos</button>
      <button onClick={() => navigate('/high-scores')}>High Scores</button>
    </div>
  );
}

export default Home;
