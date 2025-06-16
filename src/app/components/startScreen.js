"use client";
import * as ReactDOM from "react-dom/client";
import DisplayDeck from "./DisplayDeckService";

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
    root.render(<DisplayDeck />);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {" "}
      <div
        onClick={startButtonPress}
        style={{
          width: "100px",
          height: "50px",

          backgroundColor: "red",

          position: "fixed",
          top: "50%",
          left: "50%",
        }}
      >
        {" "}
        <h2>Start</h2>
      </div>
    </div>
  );
}
export default StartScreen;
