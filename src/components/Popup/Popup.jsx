// Popup.jsx
import React from "react";
import "./Popup.css";

function Popup({ message, show, onClose }) {
  return (
    show && (
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <p>{message}</p>
        </div>
      </div>
    )
  );
}

export default Popup;
