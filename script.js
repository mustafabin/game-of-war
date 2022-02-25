class Table {
  constructor(deck = []) {
    this.deck = deck;
  }
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
  }
  eatTable(table) {
    //console.log(table, "hey");
    for (let i = 0; i < table.length; i++) {
      this.deck.push(table[i]);
    }
  }
}

let createDeck = () => {
  let deck = [];
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
let clearHands = () => {
  table.reset();
  playerOne.clear();
  playerTwo.clear();
};

let deck = createDeck();
deck = shuffle(deck);
const playerOne = new player(deck.slice(0, 26));
const playerTwo = new player(deck.slice(26, 52));
const table = new Table([]);
console.log(playerOne.deck.length);
console.log(playerTwo.deck.length);

playerOne.playCard(4);
playerTwo.playCard(4);
table.add(playerOne.cardsPlayed);
table.add(playerTwo.cardsPlayed);

console.log(table.deck);
playerTwo.eatTable(table.deck);
clearHands();

playerOne.playCard(21);
playerTwo.playCard(21);
table.add(playerOne.cardsPlayed);
table.add(playerTwo.cardsPlayed);

console.log(table.deck);
playerTwo.eatTable(table.deck);
console.log(playerOne.deck.length);
console.log(playerTwo.deck.length);
