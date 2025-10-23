import React, { useEffect, useState } from "react";
import config from "../config";

function Kitchen() {
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/items`)
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, [apiData]);
  /////////////////////////////////////////////////////////////////////////////////////
  const handleDecrementQuantity = (itemName) => {
    fetch(`${config.API_BASE_URL}/items/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName }),
    })
      .then((response) => setApiData(response))
      .catch((error) => console.error("Error decrementing item:", error));
  };
  ////////////////////////////////////////////////////////////////////////////////////
  const handleIncrementQuantity = (itemName) => {
    fetch(`${config.API_BASE_URL}/increment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName }),
    })
      .then((response) => setApiData(response))
      .catch((error) => console.error("Error incrementing item:", error));
  };

  return (
    <div className="data-pane">
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>ITEM NAME</th>
            <th>QUANTITY</th>
            <th>EXPIRY</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(apiData).map(([itemName, item]) => (
            <tr key={itemName}>
              <td>
                <button
                  className="b1"
                  onClick={() => handleIncrementQuantity(itemName)}
                >
                  +
                </button>
                <button
                  className="b2"
                  onClick={() => handleDecrementQuantity(itemName)}
                >
                  -
                </button>
              </td>
              <td>{itemName}</td>
              <td>{item.quantity}</td>
              <td contentEditable="true">{item.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Kitchen;
