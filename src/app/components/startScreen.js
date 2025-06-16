"use client";
import * as ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import DisplayDeck from "./DisplayDeckService";

function StartScreen() {
  const [shouldShowDeck, setShouldShowDeck] = useState(false);
  const [showButton, setShowButton] = useState(false);

  function handleGameEnd() {
    setShouldShowDeck(false);
    setShowButton(true);
  }
  useEffect(() => {
    const cached = localStorage.getItem("allCards");

    try {
      const parsed = JSON.parse(cached);

      if (Array.isArray(parsed) && parsed.length > 0) {
        setShouldShowDeck(true);
      } else {
        setShowButton(true);
      }
    } catch {
      setShowButton(true);
    }
  }, []);

  function startButtonPress(e) {
    let element;

    if (e.target.nodeName === "H2") {
      element = e.target.parentNode;
    } else {
      element = e.target;
    }

    element.style.display = "none";
    setShouldShowDeck(true);
  }

  if (shouldShowDeck) {
    return <DisplayDeck onGameEnd={handleGameEnd} />;
  }
  if (showButton) {
    return (
      <div
        onClick={startButtonPress}
        style={{
          width: "100px",
          height: "50px",
          backgroundColor: "red",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Start</h2>
      </div>
    );
  }

  return null;
}

export default StartScreen;
