import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/items"); // Assuming the backend API is running on the same server
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Items</h1>
      {items.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
