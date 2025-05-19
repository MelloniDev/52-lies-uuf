"use client";

import { useEffect, useState } from "react";
import { createCardDeck, getCards } from "../cardDeck";

const DeckScatter = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const spread = 300;

    new createCardDeck().then((deckID) => {
      new getCards(deckID).then((cardsFromAPI) => {
        const scatteredCards = cardsFromAPI.map((card, index) => {
          const x = centerX + (Math.random() - 0.5) * spread;
          const y = centerY + (Math.random() - 0.5) * spread;

          return {
            id: `${card.code}-${index}`,
            image: card.image,
            value: card.value,
            suit: card.suit,
            x,
            y,
            rotation: Math.random() * 360 - 180,
            zIndex: Math.floor(Math.random() * 100),
          };
        });

        setCards(scatteredCards);
      });
    });
  }, []);

  const handleCardClick = (cardId) => {
    setCards((prevCards) => {
      const cardToSelect = prevCards.find((c) => c.id === cardId);
      if (!cardToSelect) return prevCards;

      setSelectedCards((prevSelected) => [...prevSelected, cardToSelect]);

      return prevCards.filter((card) => card.id !== cardId);
    });
  };

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
            height: "auto",
            zIndex: card.zIndex,
            pointerEvents: "auto",
            display: "block",
            position: "absolute",
            objectFit: "contain",
          }}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default DeckScatter;
