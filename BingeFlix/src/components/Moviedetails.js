import "../CSS/Moviedetails.css";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useWindowScroll } from "react-use";

import {
  getMovieDetailsConfig,
  getCastDetailsConfig,
  getSimilarMoviesConfig,
} from "../API";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";

import Movieitem from "./Movieitem";
import Trailer from "./Trailer";
import { mockComponent } from "react-dom/test-utils";

function Moviepage() {
  const details = useParams();
  // const location = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);

  const [castDetails, setCastDetails] = useState(null);

  const [similarDetails, setSimilarDetails] = useState(null);

  const { y: pageYOffset } = useWindowScroll();

  useEffect(() => {
    scrollToTop();
    getSetMovieDetails();
    getSetCastDetails();
    getSetSimilarDetails();
  }, [details]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  async function getSetMovieDetails() {
    try {
      const response = await axios(getMovieDetailsConfig(details.movieId));
      setMovieDetails(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getSetCastDetails() {
    try {
      const response = await axios(getCastDetailsConfig(details.movieId));
      response.data.cast = response.data.cast.slice(0, 10);
      // console.log(response.data.cast);
      setCastDetails(response.data.cast);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getSetSimilarDetails() {
    try {
      const response = await axios(getSimilarMoviesConfig(details.movieId));
      setSimilarDetails(response.data.results);
    } catch (error) {
      console.log(error.message);
    }
  }

  function getImageLink(path) {
    return `https://image.tmdb.org/t/p/w200/${path}`;
  }

  return (
    <>
      {" "}
      {movieDetails == null || similarDetails == null || castDetails == null ? (
        <h1>Loading</h1>
      ) : (
        <div className="movie-details-container">
          <div className="movie-details-poster-container">
            <img src={getImageLink(movieDetails.poster_path)} />
            <h3>About</h3>
            <div className="movie-details-description">
              <p> {movieDetails.overview}</p>
            </div>
          </div>

          <div className="movie-details-info-container">
            <div className="info-fragment fragment-general">
              <div className="movie-details-info info-title info-fragment-title">
                {movieDetails.original_title}
              </div>

              <div className="movie-details-info info-rating">
                <div className="movie-details-info-label">Rating :</div>
                <FontAwesomeIcon
                  style={{ marginRight: "0.5rem" }}
                  icon={faStar}
                />

                {movieDetails.vote_average}
              </div>

              <div className="movie-details-info info-genre">
                <div className="movie-details-info-label">Genre :</div>
                <FontAwesomeIcon
                  style={{ marginRight: "0.5rem" }}
                  icon={faTag}
                />

                <ul className="movie-details-genre-ul">
                  {movieDetails.genres.map((genreObj) => (
                    <li className="movie-details-genre-li">{genreObj.name}</li>
                  ))}
                </ul>
              </div>

              <div className="movie-details-info info-runtime">
                <div className="movie-details-info-label">Runtime :</div>
                {movieDetails.runtime}min
              </div>

              <div className="movie-details-info info-released">
                <div className="movie-details-info-label">Released :</div>
                {movieDetails.release_date}
              </div>

              <div className="movie-details-info info-revenue">
                <div className="movie-details-info-label">Box office :</div>$
                {movieDetails.revenue}
              </div>
            </div>

            <div className="info-fragment fragment-trailer">
              <Trailer />
            </div>

            <div className="info-fragment fragment-cast">
              <div className="info-fragment-title">Cast</div>
              {castDetails.map((castObj) => (
                <div className="cast-info-container">
                  <div className="cast-info-img-container">
                    <img src={getImageLink(castObj.profile_path)} />
                  </div>

                  <div className="cast-info-details">
                    <span> {castObj.original_name} </span> as{" "}
                    {castObj.character}
                  </div>
                </div>
              ))}
            </div>

            <div className="info-fragment fragment-similar">
              <div className="info-fragment-title">Similar</div>
              <div className="similar-movie-container">
                {similarDetails.map((similarObj) => (
                  <Movieitem movieObj={similarObj} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Moviepage;
