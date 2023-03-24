import React from "react";
import Banner from "../components/Banner";
import Sidebar from "../components/Sidebar";
import Movielist from "../components/Movielist";

import { id_gener_map } from "../generId";

import { useParams } from "react-router-dom";

import "../CSS/HomeSearchGenre_page.css";

function Home() {
  function getMovieTerm(movieTerm) {
    let movieTermArr = movieTerm.split("+");
    return movieTermArr.join(" ");
  }

  function getGenreTerms(genreStr) {
    let genreArr = genreStr.split(",");
    genreArr = genreArr.map((id) => {
      return id_gener_map[id];
    });
    return genreArr.join(", ");
  }

  let details = useParams();

  return (
    <div className="page-container">
      <div className="page-left-container">
        {Object.keys(details).length === 0 && <Banner />}
        {details.hasOwnProperty("searchTerm") && (
          <h2 className="result-title">
            Results For :{" "}
            {getMovieTerm(details.searchTerm).toUpperCase()}
          </h2>
        )}
        {details.hasOwnProperty("genreIds") && (
          <h2 className="result-title">Results For : {getGenreTerms(details.genreIds)}</h2>
        )}
        <Movielist />
      </div>
      <div className="page-right-container">
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
