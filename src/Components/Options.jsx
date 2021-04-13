import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Alert, AlertTitle } from "@material-ui/lab";

function Options(props) {
  //Maintian individual selection of planet and vehicle.
  var [selectedplanet, changeplanetselection] = useState(null);
  var [selectedvehicle, changevehicleselection] = useState(null);

  //Control display of vehicles options.
  var [vehiclesdisplay, changevehiclesdisplay] = useState("none");

  //Maintian individaul time taken.
  var [timetaken, changetimetaken] = useState(0);

  //Maintian display of warning.
  var [warning, warn] = useState("none");

  useEffect(() => {
    if (selectedplanet === null) {
      var radiolist = document.getElementsByClassName("vehicle" + props.index);
      for (let i = 0; i < radiolist.length; i++) {
        radiolist[i].checked = false;
      }
      props.changevehicles((prev) => {
        return prev.map((vehicle) => {
          if (
            selectedvehicle !== null &&
            selectedvehicle !== undefined &&
            selectedvehicle.name === vehicle.name
          ) {
            vehicle.total_no++;
            props.changerequestbody((prev) => {
              prev.vehicle_names[props.index] = null;
              return prev;
            });
            changevehicleselection(null);
            props.changetotaltime((prev) => {
              return prev - timetaken;
            });
            changetimetaken(0);
          }
          return vehicle;
        });
      });
      changevehiclesdisplay("none");
    }
  }, [selectedplanet]);

  //Handle selection of planet.
  function selectplanet(event) {
    if (event.target.innerText === undefined) {
      props.changeplanets((prev) => [...prev, selectedplanet]);
      changeplanetselection(null);
      props.changerequestbody((prev) => {
        prev.planet_names[props.index] = null;
        return prev;
      });
    } else {
      props.planets.forEach((planet) => {
        if (planet.name === event.target.innerText) {
          props.changeplanets(
            props.planets.filter((item) => {
              return item.name !== event.target.innerText;
            })
          );
          props.changerequestbody((prev) => {
            prev.planet_names[props.index] = planet.name;
            return prev;
          });
          changeplanetselection(planet);
          changevehiclesdisplay("block");
        }
      });
    }
  }

  //Handle selection of vehicle.
  function selectvehicle(event) {
    props.vehicles.forEach((vehicle) => {
      if (vehicle.name === event.target.value) {
        props.changevehicles((prev) => {
          return prev.map((veh) => {
            if (event.target.value === veh.name) {
              veh.total_no--;
            } else if (
              selectedvehicle !== null &&
              selectedvehicle !== undefined &&
              selectedvehicle.name === veh.name
            ) {
              veh.total_no++;
            }
            return veh;
          });
        });
        props.changerequestbody((prev) => {
          prev.vehicle_names[props.index] = vehicle.name;
          return prev;
        });
        setTimeout(() => {
          event.target.disabled = false;
        }, 500);
        changevehicleselection(vehicle);
        var time = selectedplanet.distance / vehicle.speed;
        props.changetotaltime((prev) => {
          return prev - timetaken + time;
        });
        changetimetaken(selectedplanet.distance / vehicle.speed);
      }
    });
  }

  function displaywarning() {
    warn("block");
    setTimeout(() => {
      warn("none");
    }, 1000);
  }

  return (
    <div>
      <Autocomplete
        id={"planet" + props.id}
        options={props.planets.map((planet) => planet.name)}
        getOptionLabel={(planet) => planet}
        style={{ width: 190, color: "red" }}
        getOptionSelected={(option, value) => option.name === value.name}
        onChange={selectplanet}
        renderInput={(params) => (
          <TextField {...params} label="Select the Planet" variant="outlined" />
        )}
      />
      {props.vehicles.map((vehicle, index) => {
        return vehicle.total_no === 0 ||
          selectedplanet === null ||
          selectedplanet.distance > vehicle.max_distance ? (
          <div
            key={index}
            onClick={displaywarning}
            style={{ display: vehiclesdisplay }}
          >
            <input
              className={"vehicle" + props.index}
              onClick={displaywarning}
              type="radio"
              id={vehicle.name}
              name={"vehicle" + props.index}
              value={vehicle.name}
              disabled
            />
            <label forhtml={vehicle.name}>
              {vehicle.name} ({vehicle.total_no})
            </label>
            <br />
          </div>
        ) : (
          <div key={index} style={{ display: vehiclesdisplay }}>
            <input
              type="radio"
              onChange={selectvehicle}
              className={props.index}
              id={"vehicle" + vehicle.name}
              name={"vehicle" + props.index}
              value={vehicle.name}
            />
            <label forhtml={vehicle.name}>
              {vehicle.name} ({vehicle.total_no})
            </label>
            <br />
          </div>
        );
      })}
      <Alert severity="info" className="warning" style={{ display: warning }}>
        <AlertTitle>Info</AlertTitle>
        Planet not selected || Distance of planet exceeds maximum distance limit
        of vehicle || No vehicles availalbe of this kind
      </Alert>
    </div>
  );
}

export default Options;
