import React from "react";
import "./style.css"; // Import the CSS for styling

const MessagePopup = ({ isError = true, message, onClose }) => {
  if (!message) return null; // Don't render if there's no message

  const popupClass = isError ? "error-popup" : "success-popup" ;
  const title = isError ? "Error" : "Success" ;

  return (
    <div className="popup-overlay">
      <div className={`popup ${popupClass}`}>
        <h2 className="popup-title">{title}</h2>
        <p className="popup-message">{message}</p>
        <button className="popup-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MessagePopup;
