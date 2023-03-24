import React from "react";
import "../CSS/Movieitem.css";

import { Link } from "react-router-dom";

function Movieitem({ movieObj }) {


  function getImageLink(path) {
    return `https://image.tmdb.org/t/p/w200/${path}`;
  }

  return (
    <div className="movie-item-container">
        <Link to={`/movie/${movieObj.id}`}>
        <div className="movie-item-poster">
          <img src={getImageLink(movieObj.poster_path)} />
        </div>
        <div className="movie-item-title">{movieObj.original_title}</div>
    </Link>
      </div>
  );
}

export default Movieitem;
