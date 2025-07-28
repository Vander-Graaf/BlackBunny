import React, { useState, useEffect } from "react";
import "./Popup.css";

function Popup({ message, show }) {
  if (show) {
    return (
      <div className={`popup show`}>
        <div className="popup-content">
          <p>{message}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`popup hide`}>
        <div className="popup-content">
          <p>{message}</p>
        </div>
      </div>
    );
  }
}

export default Popup;
