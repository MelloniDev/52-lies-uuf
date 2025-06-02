"use client";

import { useEffect, useState } from "react";
import { createCardDeck, getCards } from "../cardDeck";
import { setItem, getItem, removeItem } from "./Localstorage";

const DeckScatter = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    const initCards = async () => {
      let storedAllCards = getItem("allCards");
      let storedSelectedCards = getItem("selectedCards") || [];

      // Prüfen ob Karten vorhanden und gültig sind
      const cardsAreInvalid =
        !Array.isArray(storedAllCards) || storedAllCards.length === 0;

      if (cardsAreInvalid) {
        // LocalStorage leeren, wenn keine gültigen Karten vorhanden
        removeItem("allCards");
        removeItem("selectedCards");

        // Neues Deck generieren
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const spread = 300;

        const deckID = await createCardDeck();
        const cardsFromAPI = await getCards(deckID);

        storedAllCards = cardsFromAPI.map((card, index) => {
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

        storedSelectedCards = [];
        setItem("allCards", storedAllCards);
        setItem("selectedCards", []);
      }

      // Karten bereinigen: ausgewählte entfernen aus verbleibenden
      const filteredCards = storedAllCards.filter(
        (card) => !storedSelectedCards.find((sel) => sel.id === card.id)
      );

      setCards(filteredCards);
      setSelectedCards(storedSelectedCards);
    };

    initCards();
  }, []);

  const handleCardClick = (cardId) => {
    setCards((prevCards) => {
      const cardToSelect = prevCards.find((c) => c.id === cardId);
      if (!cardToSelect) return prevCards;

      const updatedSelected = [...selectedCards, cardToSelect];
      const updatedRemaining = prevCards.filter((card) => card.id !== cardId);

      setSelectedCards(updatedSelected);

      if (updatedRemaining.length === 0) {
        removeItem("allCards");
        removeItem("selectedCards");
      } else {
        setItem("allCards", updatedRemaining);
        setItem("selectedCards", updatedSelected);
      }

      return updatedRemaining;
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
