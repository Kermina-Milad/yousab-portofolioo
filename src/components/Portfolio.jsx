import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageViewer from 'react-simple-image-viewer';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get('https://yousab-tech.com/webapp/public/api/portfolios');
        setPortfolios(response.data.data.portfolios);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const openImageViewer = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setCurrentImage(0);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

 
  if (error) return <div className="text-center text-white">Error: {error}</div>;

  return (
    <div className="container py-5" style={{ backgroundColor: '#12183A', minHeight: '100vh' }}>
      <h1 
        className="text-center mb-5"
        style={{
          background: 'linear-gradient(to right, #3098FE, #4A64E5, #9C46FF, #C139FF, #FF2DFF)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontSize: '3rem',
          fontWeight: 'bold',
          width:'fit-content',
          margin: '0 auto',

        }}
      >
      
       Yousab Tech
      </h1>
      
      <div className="row">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="col-md-4 mb-4">
            <div 
              className="card h-100 border-0 shadow-lg" 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                cursor: 'pointer',
                transition: 'transform 0.3s',
                borderRadius: '15px',
                overflow: 'hidden'
              }}
              onClick={() => openImageViewer(portfolio)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {portfolio.images && portfolio.images.length > 0 && (
                <img
                  src={portfolio.images[0].url}
                  className="card-img-top"
                  alt={portfolio.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 
                  className="card-title"
                  style={{
                    background: 'linear-gradient(to left, #3098FE, #4A64E5, #9C46FF, #C139FF, #DE3CFF, #FF2DFF)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 'bold'
                  }}
                >
                  {portfolio.title}
                </h5>
                <p className="card-text text-white-50">
                  {portfolio.description || 'No description available'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isViewerOpen && selectedPortfolio && (
        <ImageViewer
          src={selectedPortfolio.images.map(img => img.url)}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: 'rgba(18, 24, 58, 0.9)'
          }}
        />
      )}
    </div>
  );
};

export default Portfolio;