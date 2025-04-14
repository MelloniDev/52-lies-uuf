"use client";

import { useEffect, useState } from "react";
import { generateDummyDeck } from "../dummyCards";

const DeckScatter = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const cardWidth = 300; // vorher z. B. 120
    const cardHeight = 400; // vorher z. B. 160

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // 💡 Spread wie vorher bei kleinen Karten (ca. 40vw × 90vh)
    const oldSpreadX = window.innerWidth * 0.2; // 40vw total → ±20vw
    const oldSpreadY = window.innerHeight * 0.45; // 90vh total → ±45vh

    const deck = generateDummyDeck().map((card) => {
      const x =
        centerX + (Math.random() - 0.5) * oldSpreadX * 2 - cardWidth / 2;
      const y =
        centerY + (Math.random() - 0.5) * oldSpreadY * 2 - cardHeight / 2;

      return {
        ...card,
        x,
        y,
        rotation: Math.random() * 360 - 180,
        zIndex: Math.floor(Math.random() * 100),
      };
    });

    setCards(deck);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-green-700 relative">
      {cards.map((card) => (
        <img
          key={card.id}
          src={card.image}
          alt={`${card.value} of ${card.suit}`}
          className="absolute transition-transform duration-300 ease-in-out"
          style={{
            top: `${card.y}px`,
            left: `${card.x}px`,
            transform: `rotate(${card.rotation}deg)`,
            width: "120px",
            zIndex: card.zIndex,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
};

export default DeckScatter;
