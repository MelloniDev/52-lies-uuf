import { Rethink_Sans } from "next/font/google";
import "./card";
import { card } from "./card";
import { act } from "react";

let stack = [{ image: "tset", value: "ACE", suit: "SPADES" }];
class logic {
  cardIsPlayed(playedCard, stackCard, activePlayer, otherPlayer) {
    if (!this.allowedToStack(stackCard, playedCard)) return false; // If turn is not allowed

    let check = this.checkForSpecialCard(playedCard);
    if (check === 1) {
      otherPlayer.drawCards(2); // Placeholder
    } else if (check === 2) {
      return activePlayer.playerNumber; // Gibt Spielernummer zurück von dem Spieler der am Zug ist
    } else if (check === 3) {
      // JACK-Logik noch einbauen
      return otherPlayer.playerNumber;
    } else if (check === 4) {
      return activePlayer.playerNumber;
    } else if (check === 0) return otherPlayer.playerNumber;
  }

  allowedToStack(stackCard, newCard) {
    if (newCard.value === "Jack" && stackCard.value === "JACK") return false;

    if (stackCard.value != newCard.value && stackCard.suit != newCard.suit)
      return false;

    return true;
  }

  checkForSpecialCard(newCard) {
    switch (newCard.value) {
      case "7":
        return 1;
      case "8":
        return 2;
      case "JACK":
        return 3;
      case "ACE":
        return 4;
      default:
        return 0;
    }
  }
}
