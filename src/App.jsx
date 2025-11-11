import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import SinglePortfolio from './components/SinglePortfolio';
import './App.css';

function App() {
  const whatsappNumber = "01208050298"; // Your fixed WhatsApp number (Egypt)
  const whatsappLink = `https://wa.me/2${whatsappNumber}`; // Prefix with '2' for Egypt's country code (+20)

  return (
    <Router>
      <div style={{ backgroundColor: '#12183A', minHeight: '100vh', position: 'relative' }}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<SinglePortfolio />} />
        </Routes>

        {/* Floating WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#25D366',
            color: 'white',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
            textDecoration: 'none',
            fontSize: '28px',
          }}
        >
          <i className="bi bi-whatsapp"></i>
        </a>
      </div>
    </Router>
  );
}

export default App;
