"use client";

import { useEffect, useState } from "react";
import { createCardDeck, getCards } from "./CardDeckService";
import { setItem, getItem, removeItem } from "./LocalStorageService";

const DisplayDeck = ({ onGameEnd }) => {
  const [remainingCards, setCards] = useState([]);
  const [pickedUpCards, setSelectedCards] = useState([]);

  useEffect(() => {
    const initCards = async () => {
      let cachedCards = getItem("allCards");
      let cachedSelectedCards = getItem("selectedCards") || [];

      const cardsAreInvalid =
        !Array.isArray(cachedCards) || cachedCards.length === 0;

      if (cardsAreInvalid) {
        removeItem("allCards");
        removeItem("selectedCards");

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const spread = 300;

        const deckID = await createCardDeck();
        const cardsFromAPI = await getCards(deckID);

        cachedCards = cardsFromAPI.map((card, index) => {
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
            isFaceDown: Math.random() < 0.25,
          };
        });

        cachedSelectedCards = [];
        setItem("allCards", cachedCards);
        setItem("selectedCards", []);
      }

      const filteredCards = cachedCards.filter(
        (card) => !cachedSelectedCards.find((sel) => sel.id === card.id)
      );

      setCards(filteredCards);
      setSelectedCards(cachedSelectedCards);
    };

    initCards();
  }, []);

  useEffect(() => {
    if (remainingCards.length === 0 && pickedUpCards.length > 0) {
      onGameEnd?.();
    }
  }, [remainingCards, pickedUpCards, onGameEnd]);

  const handleCardClick = (cardId) => {
    setCards((currentRemainingCards) => {
      const clickedCard = currentRemainingCards.find((c) => c.id === cardId);
      if (!clickedCard) return currentRemainingCards;

      if (clickedCard.isFaceDown) {
        const flippedCards = currentRemainingCards.map((card) =>
          card.id === cardId ? { ...card, isFaceDown: false } : card
        );
        setItem("allCards", flippedCards);
        return flippedCards;
      }

      const updatedSelectedCards = [...pickedUpCards, clickedCard];
      const remainingAfterClick = currentRemainingCards.filter(
        (card) => card.id !== cardId
      );

      setSelectedCards(updatedSelectedCards);

      if (remainingAfterClick.length === 0) {
        removeItem("allCards");
        removeItem("selectedCards");
      } else {
        setItem("allCards", remainingAfterClick);
        setItem("selectedCards", updatedSelectedCards);
      }

      return remainingAfterClick;
    });
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-green-700 relative">
      {remainingCards.map((card) => (
        <img
          key={card.id}
          src={
            card.isFaceDown
              ? "https://www.deckofcardsapi.com/static/img/back.png"
              : card.image
          }
          alt={card.isFaceDown ? "Card back" : `${card.value} of ${card.suit}`}
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
            cursor: "pointer",
          }}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default DisplayDeck;
