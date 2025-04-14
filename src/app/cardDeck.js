function createCardDeck() {

    return new Promise((resolve, reject)=>{
       (async ()=>{
        
            let req = await fetch("https://deckofcardsapi.com/api/deck/new/");

            //console.log(req);

            let res = await req.json();

            deckID = res.deck_id;
            //console.log(res);
             
            resolve(deckID);
        })(); 
    })
    
}

module.exports = createCardDeck;

// Testing

let CardDeck = new createCardDeck().then((deckID)=>{
    console.log(deckID);
});