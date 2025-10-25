import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageViewer from "react-simple-image-viewer";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
        const loadData = async () => {

        try {
            fetch(`https://yousab-tech.com/workspace/public/api/clienttrack/52/browse portfolio Homepage`, {
            method: 'GET',
            headers: {

                'locale': "en"

            }
            })
            .then(async (response) => {
                const data = await response.json();
                console.log("boula", data.data);
                setData(data.data);
            })
            .catch((err) => {
                if (err.response) {
                    // Server responded with a status code outside 2xx
                    console.log("❌ Server Error Details:", err.response.data);
                    console.log("Status:", err.response.status);
                    console.log("Headers:", err.response.headers);

                    alert(
                    `Error ${err.response.status}: ${
                        JSON.stringify(err.response.data)
                    }`
                    );
                } else if (err.request) {
                    // Request was made but no response
                    console.log("⚠️ No response from server:", err.request);
                    alert("No response from server. Check API link or network.");
                } else {
                    // Something else happened
                    console.log("⚙️ Error setting up request:", err.message);
                    alert(`Error: ${err.message}`);
                }
            });
        } catch (err) {
            console.error('Error loadData', err);
        }
        };


        loadData();

    }, []);


  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get(
          "https://yousab-tech.com/webapp/public/api/portfolios",
          {
            headers: {
              locale: "en",
            },
          }
        );
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
    <div
      className="container py-5"
      style={{ backgroundColor: "#12183A", minHeight: "100vh" }}
    >
      <motion.h1
        className="text-center mb-5"
        style={{
          background:
            "linear-gradient(to right, #3098FE, #4A64E5, #9C46FF, #C139FF, #FF2DFF)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          fontSize: "3rem",
          fontWeight: "bold",
          width: "fit-content",
          margin: "0 auto",
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Yousab Tech
      </motion.h1>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <div className="spinner-border text-light" role="status"></div>
        </div>
      ) : (
        <motion.div
          className="row"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {portfolios.map((portfolio, index) => (
            <motion.div
              key={portfolio.id}
              className="col-md-4 mb-4"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="card h-100 border-0 shadow-lg"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  cursor: "pointer",
                  borderRadius: "15px",
                  overflow: "hidden",
                  backdropFilter: "blur(6px)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 25px rgba(255, 45, 255, 0.4)",
                  rotate: [0, -1, 1, 0],
                }}
                transition={{ duration: 0.4 }}
              >
                {portfolio.images?.[0] && (
                  <img
                    src={portfolio.images[0].url}
                    className="card-img-top"
                    alt={portfolio.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  {/* Only the title links to single portfolio */}
                  <Link to={`/portfolio/${portfolio.id}`} style={{ textDecoration: 'none' }}>
                    <h5
                      className="card-title"
                      style={{
                        background:
                          "linear-gradient(to left, #3098FE, #4A64E5, #9C46FF, #C139FF, #DE3CFF, #FF2DFF)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",           // Prevent line break
                        overflow: "hidden",             // Hide overflowed text
                        textOverflow: "ellipsis",       // Add ellipsis (...)
                        display: "block",               // Required for ellipsis to work on <h5>
                      }}
                    >
                      {portfolio.title}
                    </h5>

                  </Link>

                  {/* External Link Button */}
                  {portfolio.link && portfolio.type_id && (
                    <motion.a
                      href={portfolio.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn w-100 mt-3"
                      style={{
                        background: 'linear-gradient(to right, #3098FE, #9C46FF, #FF2DFF)',
                        border: 'none',
                        color: '#fff',
                        fontWeight: 'bold',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        boxShadow: '0 0 10px rgba(255, 45, 255, 0.3)',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 20px rgba(255, 45, 255, 0.5)',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {portfolio.type_id === 1 ? "Download" : portfolio.type_id === 2 ? "Browse" : "Visit"}
                    </motion.a>
                  )}

                  {/* Show Images Button */}
                  {portfolio.images?.length > 0 && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        openImageViewer(portfolio);
                      }}
                      className="btn w-100 mt-2"
                      style={{
                        background: 'linear-gradient(to right, #4A64E5, #C139FF, #FF2DFF)',
                        border: 'none',
                        color: '#fff',
                        fontWeight: 'bold',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        boxShadow: '0 0 10px rgba(255, 45, 255, 0.3)',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 20px rgba(255, 45, 255, 0.5)',
                      }}
                    >
                      Show Images
                    </motion.button>
                  )}
                </div>
              </motion.div>

            </motion.div>
          ))}

        </motion.div>
      )}

      {isViewerOpen && selectedPortfolio && (
        <ImageViewer
          src={selectedPortfolio.images.map((img) => img.url)}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: "rgba(18, 24, 58, 0.95)",
          }}
        />
      )}
    </div>
  );
};

export default Portfolio;
