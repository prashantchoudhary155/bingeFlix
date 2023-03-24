import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovieConfig, nowPlayingConfig, genreFilterConfig } from "../API";
import { useWindowScroll } from "react-use";
import Movieitem from "./Movieitem";
import "../CSS/Movielist.css";
import axios from "axios";

function Movielist() {
  const [currPage, setCurrPage] = useState(1);
  const [currMovies, setCurrMovies] = useState([]);
  const { y: pageYOffset } = useWindowScroll();

  const details = useParams();

  function getMovieTerm(movieTerm) {
    let movieTermArr = movieTerm.split("+");
    return movieTermArr.join(" ");
  }

  useEffect(() => {
    scrollToTop();

    if (Object.keys(details).length === 0) {
      loadLatestMovies(false);
    } else if (details.hasOwnProperty("searchTerm")) {
      loadSearchResults(details.searchTerm);
    } else {
      loadGenreMovies(details.genreIds, false);
    }
    setCurrPage(2);
  }, [details]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  async function loadGenreMovies(genreIds, loadMore) {
    try {
      const response = await axios(
        genreFilterConfig(genreIds, loadMore == true ? currPage : 1)
      );
      if (loadMore == false) {
        setCurrMovies(response.data.results);
      } else {
        setCurrMovies(currMovies.concat(response.data.results));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function loadLatestMovies(loadMore) {
    try {
      const response = await axios(
        nowPlayingConfig(loadMore == true ? currPage : 1)
      );
      if (loadMore == false) {
        setCurrMovies(response.data.results);
      } else {
        console.log(currPage);
        setCurrMovies(currMovies.concat(response.data.results));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function loadSearchResults(searchTerm) {
    try {
      const response = await axios(searchMovieConfig(getMovieTerm(searchTerm)));
      setCurrMovies(response.data.results);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function loadMoreMovies() {
    setCurrPage(currPage + 1);
    if (Object.keys(details).length === 0) {
      loadLatestMovies(true);
    } else if (details.hasOwnProperty("searchTerm")) {
      loadSearchResults(details.searchTerm);
    } else {
      loadGenreMovies(details.genreIds, true);
    }
  }

  return (
    <div>
      {currMovies.length == 0 ? (
        <h1>Loading</h1>
      ) : (
        <div className="movielist-container">
          {currMovies.map((movieObj) => (
            <Movieitem movieObj={movieObj} />
          ))}
        </div>
      )}

      {currMovies.length != 0 && details.hasOwnProperty("searchTerm") == false && (
        <button onClick={loadMoreMovies} className="movielist-load-more-button">
          {" "}
          Load More
        </button>
      )}
    </div>
  );
}

export default Movielist;
