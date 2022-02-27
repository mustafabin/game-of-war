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
    //The unshift() method adds one or more items to the beginning of an array and returns the new length of the modified array.
    for (let i = 0; i < table.length; i++) {
      this.deck.unshift(table[i]);
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
let playRound = (playerOne, playerTwo, table, cards) => {
  playerOne.playCard(cards);
  playerTwo.playCard(cards);
  table.add(playerOne.cardsPlayed);
  table.add(playerTwo.cardsPlayed);
  if (playerOne.lastPlayed == playerTwo.lastPlayed) {
    console.log("tieeeee");
    gameOver = true;
  } else if (playerOne.lastPlayed < playerTwo.lastPlayed) {
    //player two wins
    console.log(
      "player two wins with his last card being",
      playerTwo.lastPlayed
    );
    playerTwo.eatTable(table.deck);
  } else if (playerTwo.lastPlayed < playerOne.lastPlayed) {
    //player one wins
    console.log(
      "player one wins with his last card being",
      playerOne.lastPlayed
    );
    playerOne.eatTable(table.deck);
  }

  console.log("_____________TABLE ___________________");
  console.log(table.deck);
  console.log("_____________TABLE ___________________");
  clearHands();
};
let deck = createDeck();
deck = shuffle(deck);
const playerOne = new player(deck.slice(0, 26));
const playerTwo = new player(deck.slice(26, 52));
const table = new Table([]);
let gameOver = false;
do {
  if (playerOne.deck.length === 0 || playerTwo.deck.length === 0) {
    console.log("GAMEEEEEE!!!");
    gameOver = true;
  } else {
    playRound(playerOne, playerTwo, table, 1);
    console.log(playerOne.deck, playerOne.deck.length);
    console.log(playerTwo.deck, playerTwo.deck.length);
    console.log("_____________NEW ROUND ___________________");
  }
} while (!gameOver);
