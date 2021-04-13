import React, { useState } from "react";
import Main from "./Main";
import Result from "./Result";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  //Maintian the result of expedition.
  const [result, changeresult] = useState();

  //Maintian selection of the option for expedition.
  const [requestbody, changerequestbody] = useState({
    token: "",
    planet_names: [null, null, null, null],
    vehicle_names: [null, null, null, null]
  });

  //To handle the find of falcone.
  function findfalcone(event) {
    fetch("https://findfalcone.herokuapp.com/token", {
      method: "post",
      headers: {
        Accept: "application/json"
      }
    })
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          changerequestbody((prev) => {
            prev.token = data.token;
            return prev;
          });
          fetch("https://findfalcone.herokuapp.com/find", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(requestbody)
          })
            .then(function (response) {
              if (response.status !== 200) {
                console.log(
                  "Looks like there was a problem. Status Code: " +
                    response.status
                );
                return;
              }

              // Examine the text in the response
              response.json().then(function (data) {
                changeresult(data);
              });
            })
            .catch(function (error) {
              console.log("Request failed", error);
            });
        });
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  function clean() {
    changerequestbody({
      token: "",
      planet_names: [null, null, null, null],
      vehicle_names: [null, null, null, null]
    });
  }

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/result">
            <Result result={result} close={clean} />
          </Route>
          <Route path="/">
            <Main
              requestbody={requestbody}
              changerequestbody={changerequestbody}
              findfalcone={findfalcone}
              clean={clean}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
