import React, { useEffect, useState } from "react";
import logo from "./tastebud.svg";
import "./App.css";
import Kitchen from "./components/kitchen";
import Recipes from "./components/recipes";

function HomePage() {
  return (
    <div className="App-contents">
      <Kitchen />
    </div>
  );
}

function Page1() {
  return (
    <div>
      <h1>SHOPPING LIST</h1>
    </div>
  );
}

function Page2() {
  return (
    <div>
      <Recipes />
    </div>
  );
}

// function Page3() {
//   return (
//     <div>
//       <h1>MEAL PLAN</h1>
//       {/* Content specific to the meal plan page */}
//     </div>
//   );
// }

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderContent = (page) => {
    switch (page) {
      case "home":
        return <HomePage />;
      case "page1":
        return <Page1 />;
      case "page2":
        return <Page2 />;
      // case "page3":
      //   return <Page3 />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <img src={logo} className="App-logo-topleft" alt="logo" />
        <ul>
          <li>
            <button onClick={() => setCurrentPage("home")}>KITCHEN</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("page1")}>
              SHOPPING LIST
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("page2")}>RECIPES</button>
          </li>
        </ul>
      </div>
      <div className="content">{renderContent(currentPage)}</div>
    </div>
  );
}

export default App;
