import React from "react";
import { Link } from "react-router-dom";

function Result({ result, close }) {
  return (
    <div className="result">
      <div className="answer">
        {result === undefined ? (
          <h2>Please play from starting again!</h2>
        ) : result.status === "success" ? (
          <>
            <h2>Yes, you found Falcone at :{result.planet_name}</h2>
            <h1>
              <strong>Won!!!</strong>
            </h1>
          </>
        ) : (
          <>
            <h2>Sorry, you didn't find Falcone</h2>
            <h1>
              <strong>Lost!</strong>
            </h1>
          </>
        )}
        <button>
          <Link onClick={close} to="/">
            close
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Result;
