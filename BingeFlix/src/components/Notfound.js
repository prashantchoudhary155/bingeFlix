import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

import "../CSS/Notfound.css";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="not-found-container">
      <div style={{ marginBottom: "2rem" }}>
        <h1>404: Page Not Found </h1>
      </div>

      <div className="navbar-icon not-found">
        <FontAwesomeIcon icon={faBug} />
      </div>
      <div className="not-found-title">
        <h1>
          Go to <Link to="/">Home</Link>{" "}
        </h1>
      </div>
    </div>
  );
}

export default Notfound;
