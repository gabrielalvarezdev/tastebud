import React, { useEffect, useState } from "react";
import config from "../config";

function Recipes() {
  const [apiData, setApiData] = useState({});
  const [Breakfast, setBreakfast] = useState();
  const [Lunch, setLunch] = useState({});
  const [Dinner, setDinner] = useState({});

  /////////////////////////////////////////////////////////////////////// BREAKFAST OPTIONS
  const handleBreakfast = () => {
    fetch(`${config.API_BASE_URL}/breakfast`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const GPTresponse = JSON.parse(data.Dish);
        console.log(GPTresponse);
        setBreakfast(GPTresponse.Breakfast);
      })
      .catch((error) => console.error("Error fetching breakfast:", error));
  };
  //////////////////////////////////////////////////////////////////////// LUNCH OPTION
  const handleLunch = () => {
    fetch(`${config.API_BASE_URL}/lunch`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const GPTresponse = JSON.parse(data.Dish);
        console.log(GPTresponse);
        setLunch(GPTresponse.Lunch);
      })
      .catch((error) => console.error("Error fetching lunch:", error));
  };
  //////////////////////////////////////////////////////////////////////// GET DINNER OPTION
  const handleDinner = () => {
    fetch(`${config.API_BASE_URL}/dinner`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const GPTresponse = JSON.parse(data.Dish);
        console.log(GPTresponse);
        setDinner(GPTresponse.Dinner);
      })
      .catch((error) => console.error("Error fetching dinner:", error));
  };

  function setBreakFastCookie(cookiename) {
    document.cookie = cookiename;
  }
  function setLunchCookie(cookiename) {
    document.cookie = cookiename;
  }
  function setDinnerCookie(cookiename) {
    document.cookie = cookiename;
  }

  return (
    <div className="App-contents">
      <table className="recipes" width="50%">
        <thead>
          <tr>
            <th>BREAKFAST</th>
            <th>LUNCH</th>
            <th>DINNER</th>
          </tr>
        </thead>
        <tbody>
          {/* 
                                                                                BREAKFAST PANE
 */}
          <tr className="tr2">
            {Breakfast && (
              <td>
                <div className="scrollable-content">
                  <p className="pheader">{Breakfast.Dish}</p>
                  <p>{Breakfast.Recipe}</p>
                </div>
              </td>
            )}
            {!Breakfast && <td>{}</td>}
            {/* 
                                                                                LUNCH PANE
 */}
            {Lunch && (
              <td>
                <div className="scrollable-content">
                  <p className="pheader">{Lunch.Dish}</p>
                  <p>{Lunch.Recipe}</p>
                </div>
              </td>
            )}
            {!Lunch && <td>{}</td>}
            {/* 
                                                                                DINNER PANE
 */}
            {Dinner && (
              <td>
                <div className="scrollable-content">
                  <p className="pheader">{Dinner.Dish}</p>
                  <p>{Dinner.Recipe}</p>
                </div>
              </td>
            )}
            {!Dinner && <td>{}</td>}
            {/* 
                                                                                 MAKE FOOD BUTTONS
 */}
          </tr>
          <tr className="tr1">
            <td>
              <button onClick={() => handleBreakfast()}>MAKE BREAKFAST</button>
            </td>
            <td>
              <button onClick={() => handleLunch()}>MAKE LUNCH</button>
            </td>
            <td>
              <button onClick={() => handleDinner()}>MAKE DINNER</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Recipes;
