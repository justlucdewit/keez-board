<template>
  <div id="app">
    <Board ref="board" />

    <Cards :cards="hands.blue"
           @tryPlayCard="tryPlayCard" />

  </div>
</template>

<script>
// Import components
import Cards from "@/components/Cards";
import Board from "@/components/Board";

// Import keez engine
import engine from "@/engine";

export default {
  components: {Cards, Board},

  data: () => ({
    hands: {
      blue: [],
      red: [],
      green: [],
      yellow: []
    }
  }),

  mounted() {
    this.newCards();
  },

  methods: {
    newCards() {
      const cards = engine.distributeCards();
      const blueCards = cards[0];
      const redCards = cards[1];
      const greenCards = cards[2];
      const yellowCards = cards[3];

      this.hands.blue = blueCards.length === 4 ? [...blueCards, null] : blueCards;
      this.hands.red = redCards.length === 4 ? [...redCards, null] : redCards;
      this.hands.green = greenCards.length === 4 ? [...greenCards, null] : greenCards;
      this.hands.yellow = yellowCards.length === 4 ? [...yellowCards, null] : yellowCards;
    },

    tryPlayCard(index) {
      // Get the card at this index in the had
      const card = this.hands.blue[index];

      // Try to execute it
      this.$refs.board.tryExecuteCard(card, "blue");

      // Remove it from the hand
      this.hands.blue[index] = null;

      this.botPlayCards();

      if (this.outOfCards())
        this.newCards();

      this.hands = JSON.parse(JSON.stringify(this.hands));
    },

    outOfCards() {
      let outOfCards = true;

      Object.entries(this.hands).forEach(([_, hand]) => {
        if(hand.some(x => x !== null))
          outOfCards = false;
      });

      return outOfCards;
    },

    cardIsAllowed(card, color) {
      const playerPawns = window.pawns.filter(pawn => pawn.color === color);

      // Kings
      if ("🂮🂾🃎🃞".includes(card)) {
        // There must be pawns in the home base
        if (!playerPawns.some(pawn => pawn.pos.startsWith("h")))
          return false;

        // The home spot must be open
        if (playerPawns.some(pawn => pawn.pos === "s1"))
          return false;

        return true;
      }

      // 2, 3, 5, 6, 8, 9, 10, Q (normal walking cards)
      else if ("🂢🂲🃂🃒🂣🂳🃃🃓🂥🂵🃅🃕🂦🂶🃆🃖🂨🂸🃈🃘🂩🂹🃉🃙🂪🂺🃊🃚🂭🂽🃍🃝".includes(card)) {
        // There must be a pawn on the field
        if (playerPawns.every(pawn => pawn.pos.startsWith("h")))
          return false;

        return true;
      }

      else {
        return false;
      }
    },

    botPlayCards() {
      // get the cards that are left
      const redCards = this.hands.red.filter(x => this.cardIsAllowed(x, "red"));
      const greenCards = this.hands.green.filter(x => this.cardIsAllowed(x, "green"));
      const yellowCards = this.hands.yellow.filter(x => this.cardIsAllowed(x, "yellow"));

      // Pick random indexes
      const redIndex = Math.floor(Math.random() * redCards.length);
      const greenIndex = Math.floor(Math.random() * greenCards.length);
      const yellowIndex = Math.floor(Math.random() * yellowCards.length);

      // Store the cards at the indexes
      const redCard = redCards[redIndex];
      const greenCard = greenCards[greenIndex];
      const yellowCard = yellowCards[yellowIndex];

      // Remove the cards from their hands
      for (let i = 0; i < this.hands.red.length; i++)
        if (this.hands.red[i] === redCard)
          this.hands.red[i] = null;

      for (let i = 0; i < this.hands.green.length; i++)
        if (this.hands.green[i] === greenCard)
          this.hands.green[i] = null;

      for (let i = 0; i < this.hands.yellow.length; i++)
        if (this.hands.yellow[i] === yellowCard)
          this.hands.yellow[i] = null;

      this.$refs.board.tryExecuteCard(redCard, "red");
      this.$refs.board.tryExecuteCard(greenCard, "green");
      this.$refs.board.tryExecuteCard(yellowCard, "yellow");
    }
  }
}
</script>

<style lang="scss">
#app, body, html {
  padding: 0;
  margin: 0;
  height: 100vh;
  overflow: hidden;
}
</style>