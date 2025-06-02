function createCardDeck() {
  return new Promise((resolve, reject) => {
    (async () => {
      let req = await fetch("https://deckofcardsapi.com/api/deck/new/");

      let res = await req.json();

      let deckID = res.deck_id;

      resolve(deckID);
    })();
  });
}

function getCards(deckID) {
  return new Promise((resolve, reject) => {
    (async () => {
      let req = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`
      );

      let res = await req.json();

      resolve(res.cards);
    })();
  });
}

module.exports = { createCardDeck, getCards };
