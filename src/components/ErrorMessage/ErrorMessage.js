import React from "react";
import "./style.css"; // Import the CSS for styling

const ErrorPopup = ({ message, onClose }) => {
  if (!message) return null; // Don't render if there's no message

  return (
    <div className="error-popup-overlay">
      <div className="error-popup">
        <h2 className="error-popup-title">Error</h2>
        <p className="error-popup-message">{message}</p>
        <button className="error-popup-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
