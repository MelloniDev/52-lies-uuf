export class cardDeck {
    constructor() {
        
        let deckID;

        (async ()=>{
        
            let req = await fetch("https://deckofcardsapi.com/api/deck/new/");

            //console.log(req);

            let res = await req.json();

            deckID = res.deck_id;
            console.log(res);
        })();
    }
}

// Testing

//let CardDeck = new cardDeck();