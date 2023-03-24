import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";

import "../CSS/Banner.css";
import getMovieGenerFormId from "../generId";
import { popularConfig } from "../API";
import axios from "axios";
import { Link } from "react-router-dom";

function Banner() {
  
  let [bannerList, setBannerList] = useState(null);
  let [bannerMovie, setBannerMovie] = useState(null);
  let [currIdx, setCurrIdx] = useState(Math.floor(Math.random() * 20));

  function getImageLink(path) {
    return `https://image.tmdb.org/t/p/w200/${path}`;
  }

  useEffect(() => {
    getBannerList();
  }, []);

  useEffect(() => {
    getBannerMovie();
  }, [bannerList, currIdx]);

  function getBannerMovie() {
    if (bannerList == null) return;
    setBannerMovie(bannerList[currIdx]);
  }

  async function getBannerList() {
    try {
      const response = await axios(popularConfig);
      let data = response.data.results;
      setBannerList(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="banner-container">
      {bannerMovie != null && (
        <div
          style={{
            backgroundImage: `url(${getImageLink(bannerMovie.backdrop_path)})`,
          }}
          className="banner-container-bg-img"
        ></div>
      )}
      <div className="banner-container-bg-backdrop"></div>

      <div className="banner-img-container">
        {bannerMovie == null ? (
          <div>Loading</div>
        ) : (
          <img src={getImageLink(bannerMovie.poster_path)} />
        )}
      </div>

      <div className="banner-info-container">
        {bannerMovie == null ? (
          <p className="banner-info-movie-title">Loading...</p>
        ) : (
          <Link to={`/movie/${bannerMovie.id}`}>
            <p className="banner-info-movie-title">
              {bannerMovie.original_title}
            </p>
          </Link>
        )}
        <p className="banner-info-movie-details">
          {" "}
          {bannerMovie == null ? "Loading" : bannerMovie.overview}
        </p>

        <div className="banner-info-utility-container">
          <ul className="banner-info-utility-container-ul">
            <li className="banner-info-utility-container-li">
              <div className="navbar-icon ">
                <FontAwesomeIcon icon={faTag} />
              </div>
            </li>

            {bannerMovie == null ? (
              <li className="banner-info-utility-container-li">Loading</li>
            ) : (
              bannerMovie.genre_ids.map((id) => (
                <li className="banner-info-utility-container-li">
                  <div>{getMovieGenerFormId(id)}</div>
                </li>
              ))
            )}
          </ul>
          <div className="banner-info-utility-container-icon-container">
            <div className="navbar-icon ">
              <FontAwesomeIcon
                onClick={() => setCurrIdx((currIdx + 1) % 20)}
                icon={faAngleLeft}
              />
            </div>

            <div className="navbar-icon ">
              <FontAwesomeIcon
                onClick={() => setCurrIdx((currIdx - 1 + 20) % 20)}
                icon={faAngleRight}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
