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
class Card {
  constructor(value, suite) {
    this.value = value;
    this.suite = suite;
  }
}
class player {
  constructor(deck, cardsPlayed = [], lastPlayed = 0) {
    this.deck = deck;
    this.lastPlayed = lastPlayed;
    this.cardsPlayed = cardsPlayed;
  }
  playCard(iterations) {
    this.clear();
    for (let i = 0; i < iterations; i++) {
      this.cardsPlayed.push(this.deck.pop());
    }
    this.lastPlayed = this.cardsPlayed[this.cardsPlayed.length - 1].value;
  }
  clear() {
    this.cardsPlayed.splice(0, this.cardsPlayed.length);
  }

  eatTable(table) {
    //i reverse the table b/c your first played card should be at the bottom of the deck
    //to better simulate the card game to have a person wins the table i reverse the array the push it
    let clone = shuffle([...table]);

    //The unshift() method adds one or more items to the beginning of an array and returns the new length of the modified array.
    for (let i = 0; i < clone.length; i++) {
      this.deck.unshift(clone[i]);
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
let clearHands = (playerOne, playerTwo, table) => {
  table.reset();
  playerOne.clear();
  playerTwo.clear();
};

let playRound = (playerOne, playerTwo, table, cards) => {
  let warOver = false;
  roundCounter++;
  console.log(playerOne.deck, playerOne.deck.length, "Player one");
  console.log(playerTwo.deck, playerTwo.deck.length, "Player two");
  playerOne.playCard(cards);
  playerTwo.playCard(cards);
  table.add(playerOne.cardsPlayed);
  table.add(playerTwo.cardsPlayed);
  if (playerOne.lastPlayed == playerTwo.lastPlayed) {
    console.log("tieeeee");
    //start war
    while (!warOver) {
      //war
      if (playerOne.deck.length >= 4 && playerTwo.deck.length >= 4) {
        playerOne.playCard(4);
        playerTwo.playCard(4);
        table.add(playerOne.cardsPlayed);
        table.add(playerTwo.cardsPlayed);
        if (playerOne.lastPlayed > playerTwo.lastPlayed) {
          playerOne.eatTable(table.deck);
          clearHands(playerOne, playerTwo, table);
          warOver = true;
        } else if (playerTwo.lastPlayed > playerOne.lastPlayed) {
          playerTwo.eatTable(table.deck);
          clearHands(playerOne, playerTwo, table);
          warOver = true;
        }
      } else {
        if (playerOne.deck.length < 4) {
          playerTwo.eatTable(table.deck);
          warOver = true;
          gameOver = true;
        } else if (playerTwo.deck.length < 4) {
          playerOne.eatTable(table.deck);
          warOver = true;
          gameOver = true;
        } else {
          throw playerOne.deck.length;
        }
        warOver = true;
      }
      warCounter++;
    }
  } else if (playerOne.lastPlayed < playerTwo.lastPlayed) {
    console.log(
      "player two wins with his last card being",
      playerTwo.lastPlayed,
      playerOne.lastPlayed
    );
    //player two wins
    playerTwo.eatTable(table.deck);
    console.log(playerOne.deck, " player one ", playerOne.deck.length);
    console.log(playerTwo.deck, " player two ", playerTwo.deck.length);
  } else if (playerTwo.lastPlayed < playerOne.lastPlayed) {
    console.log(
      "player one wins with his last card being",
      playerOne.lastPlayed,
      playerTwo.lastPlayed
    );
    playerOne.eatTable(table.deck);
    //player one wins
    console.log(playerOne.deck, " player one ", playerOne.deck.length);
    console.log(playerTwo.deck, " player two ", playerTwo.deck.length);
  }

  console.log("_____________TABLE _____________________");
  console.log(table.deck, "currently whats on the table");
  console.log("_____________TABLE _____________________");
  clearHands(playerOne, playerTwo, table);
};
let runGame = (runtimes = 1) => {
  for (let i = 0; i < runtimes; i++) {
    const table = new Table([]);
    let deck = createDeck2();
    deck = shuffle(deck);
    const playerOne = new player(deck.slice(0, 26));
    const playerTwo = new player(deck.slice(26, 52));
    let gameOver = false;
    do {
      if (playerOne.deck.length === 0 || playerTwo.deck.length === 0) {
        console.log(playerOne.deck.length, playerTwo.deck.length);

        console.log(
          "GAMEEEEEE!!! with this many rounds:  ",
          roundCounter,
          " this many war loops: ",
          warCounter
        );
        gameOver = true;
      } else {
        playRound(playerOne, playerTwo, table, 1);
        console.log(playerOne.deck.length, playerTwo.deck.length);
        console.log("_____________NEW ROUND _____________________");
      }
    } while (!gameOver);

    roundTotal += roundCounter;
    roundCounter = 0;
    warTotal += warCounter;
    warCounter = 0;
  }
  console.log(
    "game length avg: ",
    roundTotal / runtimes,
    "wars per game avg: ",
    warTotal / runtimes,
    "( in rounds )"
  );
};

//end of definfitionns

let createDeck2 = () => {
  let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  let suites = ["spades", "hearts", "diamonds", "clubs"];
  let deck = [];
  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < suites.length; j++) {
      let name = ranks[i] + suites[j];
      name = { value: ranks[i], suite: suites[j] };
      deck.push(name);
    }
  }
  return deck;
};
//global variables
let roundTotal = 0;
let warTotal = 0;
let warCounter = 0;
let roundCounter = 0;

//end of globals
//run x amount of rounds
runGame(1);

//the avg of game length in a 100 random games was 270.22 and war length was 17.07
//and in a 1000 games game length:255.896  war lengths: 16.35
