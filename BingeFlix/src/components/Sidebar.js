import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../CSS/Sidebar.css";
import { gener_id_map } from "../generId";

function Sidebar() {
  const details = useParams();
  const navigate = useNavigate();

  const [currAppliedGenre, setCurrAppliedGenre] = useState([]);

  useEffect(() => {
    setCurrAppliedGenre(getCurrAppliedGenre());
  }, [details]);

  function getCurrAppliedGenre() {
    if (details.hasOwnProperty("genreIds") === false) {
      return [];
    }
    let currAppliedGenreArr = details.genreIds.split(",");
    return currAppliedGenreArr.map((id) => {
      return id;
    });
  }

  const getGenreLink = (genreList) => {
    let link = "/genre/";
    for (let i = 0; i < genreList.length; ++i) {
      if (i != 0) {
        link += ",";
      }
      link += genreList[i];
    }
    return link;
  };

  const handleGenreItemClick = (e) => {
    let newGenreList = [];

    if (currAppliedGenre.includes(e.target.value) == false) {
      newGenreList = currAppliedGenre;
      newGenreList.push(e.target.value);
    } else {
      for (let i = 0; i < currAppliedGenre.length; ++i) {
        if (currAppliedGenre[i] != e.target.value) {
          newGenreList.push(currAppliedGenre[i]);
        }
      }
    }

    setCurrAppliedGenre(newGenreList);
    let link = getGenreLink(newGenreList);
    navigate(link == "/genre/" ? "/" : link);
  };

  return (
    <div className="sidebar-container">
      <ul className="sidebar-ul">
        <li className="sidebar-li sidebar-li-title">Genres</li>
        {Object.keys(gener_id_map).map((key, index) => (
          <li className="sidebar-li">
            <input
              checked={
                currAppliedGenre.includes(gener_id_map[key].toString())
                  ? "true"
                  : ""
              }
              onClick={(e) => handleGenreItemClick(e)}
              type="checkbox"
              id={gener_id_map[key]}
              value={gener_id_map[key]}
            />
            <label htmlFor={gener_id_map[key]}> {key}</label>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
