import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Needed if you're using routing
import axios from "axios";
import ImageViewer from "react-simple-image-viewer";
import { motion } from "framer-motion";

const SinglePortfolio = () => {
  const { id } = useParams(); // only works with routing
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(
          `https://yousab-tech.com/webapp/public/api/portfolio/${id}`,
          {
            headers: {
              locale: "en",
            },
          }
        );
        setPortfolio(response.data.data.portfolio);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  const openImageViewer = (index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="spinner-border text-light" role="status"></div>
      </div>
    );
  }

  if (error) return <div className="text-center text-white">Error: {error}</div>;

  if (!portfolio) return null;

  return (
    <div className="py-5 px-4" style={{ backgroundColor: "#12183A", minHeight: "100vh" }}>
      <motion.h1
        className="text-center mb-4"
        style={{
          background:
            "linear-gradient(to right, #3098FE, #4A64E5, #9C46FF, #C139FF, #FF2DFF)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          fontSize: "2.5rem",
          fontWeight: "bold",
          width: "fit-content",
          margin: "0 auto",
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {portfolio.title}
      </motion.h1>

      {portfolio.description && (
        <p className="text-white text-center mb-5">{portfolio.description}</p>
      )}

      <div className="row">
        {portfolio.images.map((img, index) => (
          <div className="col-md-4 mb-4" key={img.id}>
            <motion.img
              src={img.url}
              alt={`Portfolio Image ${index + 1}`}
              className="img-fluid rounded shadow-sm"
              style={{ cursor: "pointer", height: "250px", objectFit: "cover", width: "100%" }}
              whileHover={{ scale: 1.03 }}
              onClick={() => openImageViewer(index)}
            />
          </div>
        ))}
      </div>

      {isViewerOpen && (
        <ImageViewer
          src={portfolio.images.map((img) => img.url)}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          backgroundStyle={{ backgroundColor: "rgba(0,0,0,0.95)" }}
          closeOnClickOutside={true}
        />
      )}
    </div>
  );
};

export default SinglePortfolio;
