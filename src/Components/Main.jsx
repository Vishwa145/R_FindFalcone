import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Options from "./Options";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

function Main({ requestbody, changerequestbody, findfalcone }) {
  //Maintian the planets and vehicles options.
  const [planets, changeplanets] = useState([]);
  const [vehicles, changevehicles] = useState([]);

  //Maintian total time required for trip.
  const [totaltime, changetotaltime] = useState(0);

  //TO load all the required data of of expedition.
  useEffect(() => {
    fetch("https://findfalcone.herokuapp.com/planets")
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          changeplanets(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });

    fetch("https://findfalcone.herokuapp.com/vehicles")
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        response.json().then(function (data) {
          changevehicles(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }, []);

  var select = [0, 1, 2, 3];

  return (
    <>
      <Header />
      <form className="form">
        <div className="main">
          {select.map((item) => {
            return (
              <Options
                key={item}
                index={item}
                planets={planets}
                changeplanets={changeplanets}
                vehicles={vehicles}
                changevehicles={changevehicles}
                requestbody={requestbody}
                changerequestbody={changerequestbody}
                totaltime={totaltime}
                changetotaltime={changetotaltime}
              />
            );
          })}
          <h2>Time taken: {totaltime}</h2>
        </div>
        <div className="btn">
          {requestbody.planet_names.includes(null) ||
          requestbody.vehicle_names.includes(null) ? (
            <Button
              variant="contained"
              color="default"
              type="submit"
              disabled
              endIcon={<SearchIcon />}
            >
              Find Falcone
            </Button>
          ) : (
            <Link to="/result" onClick={findfalcone}>
              <Button
                variant="contained"
                color="default"
                type="submit"
                endIcon={<SearchIcon />}
              >
                Find Falcone
              </Button>
            </Link>
          )}
        </div>
      </form>
      <Footer />
    </>
  );
}

export default Main;
