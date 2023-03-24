import React, { useState, useEffect } from "react";
import { getTrailerConfig } from "../API";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

let Trailer = () => {
  const id = useParams().movieId;
  const [trailerId, setTrailerId] = useState(null);
  const location = useNavigate();
  useEffect(() => {
    let getTrailer = async () => {
      setTrailerId(null);
      try {
        let response = await axios(getTrailerConfig(id));
        response = response.data.results;
        response = response.filter((video) => {
          if (
            video.type == "Trailer" &&
            video.official == true &&
            video.site == "YouTube"
          ) {
            return true;
          }
          return false;
        });
        if (response.length == 0) {
          throw "TRAILER_NOT_FOUND";
        }
        setTrailerId(response[0].key);
      } catch (error) {
        setTrailerId([]);
      }
    };
    getTrailer();
  }, [location]);

  return (
    <>
      {trailerId == null ? (
        <h1>Loading Trailer</h1>
      ) : trailerId.length == 0 ? (
        <div
          style={{
            display: "flex",
              alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <h1>Trailer Not Found</h1>
          <div className="navbar-icon brand">
            <FontAwesomeIcon
              style={{ width: "40px", height: "40px" }}
              icon={faExclamationCircle}
            />
          </div>
        </div>
      ) : (
        <div>
          <iframe
            style={{
              border: "none",
              borderRadius: "10px",
            }}
            width="500"
            height="225"
            src={`https://www.youtube.com/embed/${trailerId}`}
            title="Youtube iFrame Embed API"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Trailer;
