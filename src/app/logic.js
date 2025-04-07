import { Rethink_Sans } from "next/font/google";
import "./card";

let stack = [{ image: "tset", value: "ACE", suit: "SPADES" }];
class logic {
  allowedToStack(currentCard, newCard) {
    if (newCard.value === "Jack" && currentCard.value !== "JACK") return true;

    if (currentCard.value != newCard.value && currentCard.suit != newCard.suit)
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

  activateSpecialCard(newCard, stack) {
    let specialValue = this.checkForSpecialCard(newCard);
  }
}
