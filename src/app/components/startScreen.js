"use client";
import * as ReactDOM from "react-dom/client";
import DeckScatter from "./DeckScatter";

function StartScreen() {
  function startButtonPress(e) {
    let element;

    if (e.target.nodeName === "H2") {
      element = e.target.parentNode;
    } else {
      element = e.target;
    }
    element.style.display = "none";

    const root = ReactDOM.createRoot(document.querySelector("main"));
    root.render(<DeckScatter />);
  }

  return (
    <div
      onClick={startButtonPress}
      style={{
        width: "100px",
        height: "50px",

        backgroundColor: "red",
      }}
    >
      <h2>Start</h2>
    </div>
  );
}
export default StartScreen;
