import React, { useState, useEffect } from "react";
import "./Popup.css";

function Popup({ message, show }) {
  const visible = show ? `popup show` : `popup hide`;

  return (
    <div className={visible}>
      <div className="popup-content">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Popup;
