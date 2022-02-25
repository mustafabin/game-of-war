class Table {
  constructor(deck = []) {
    this.deck = deck;
  }
  deck = [];
  add(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.deck.push(arr[i]);
    }
  }
  reset() {
    this.deck.splice(0, this.deck.length);
  }
}

class player {
  constructor(deck, cardsPlayed = [], lastPlayed = 0) {
    this.deck = deck;
    this.lastPlayed = lastPlayed;
    this.cardsPlayed = cardsPlayed;
  }
  playCard(iterations) {
    for (let i = 0; i < iterations; i++) {
      this.cardsPlayed.push(this.deck.pop());
    }
    this.lastPlayed = this.cardsPlayed[this.cardsPlayed.length - 1];
  }
  clear() {
    this.cardsPlayed.splice(0, this.cardsPlayed.length);
    console.log("clear", this.cardsPlayed);
  }
  eatTable(table) {
    //console.log(table, "hey");
    for (let i = 0; i < table.length; i++) {
      this.deck.push(table[i]);
    }
  }
}

let createDeck = (deck) => {
  let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < ranks.length; j++) {
      deck.push(ranks[j]);
    }
  }
  return deck;
};

let shuffle = (deck) => {
  let remainingCards = deck.length;
  let randomIndex;
  while (remainingCards != 0) {
    randomIndex = Math.floor(Math.random() * remainingCards); //gets a random index based on how many cards are remaining
    remainingCards--;
    //swap current index with a random one
    [deck[remainingCards], deck[randomIndex]] = [
      deck[randomIndex],
      deck[remainingCards],
    ];
  }
  return deck;
};
