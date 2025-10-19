import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import SinglePortfolio from './components/SinglePortfolio';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#12183A', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<SinglePortfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
