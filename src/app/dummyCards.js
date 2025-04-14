export const generateDummyDeck = () => {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const deck = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({
        id: `${value}-of-${suit}`,
        value,
        suit,
        image: `https://deckofcardsapi.com/static/img/${value}${suit[0].toUpperCase()}.svg`,
      });
    }
  }

  return deck;
};
