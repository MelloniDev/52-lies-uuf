"use client";

function StartScreen() {
  function startButtonPress(e) {
    let element;

    if (e.target.nodeName === "H2") {
      element = e.target.parentNode;
    } else {
      element = e.target;
    }
    element.style.display = "none";
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
