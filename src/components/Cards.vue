<template>
  <div id="cards">
    <div class="card" v-for="(card, i) in cards"
         @click="tryPlayCard(i)"
         :class="{ red: redCards.includes(card), allowed: cardIsAllowed(card) }" >
      {{ card }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cards: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    redCards: ["🂱", "🂲", "🂳", "🂴", "🂵", "🂶", "🂷", "🂸", "🂹", "🂺", "🂻", "🂼", "🂽", "🂾", "🃁", "🃂", "🃃", "🃄", "🃅", "🃆", "🃇", "🃈", "🃉", "🃊", "🃋", "🃌", "🃍", "🃎"]
  }),

  methods: {
    cardIsAllowed(card) {
      const playerPawns = window.pawns.filter(pawn => pawn.color === "blue");

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

    tryPlayCard(index) {
      const card = this.cards[index];

      if (card && this.cardIsAllowed(card)) {
        this.$emit("tryPlayCard", index)
      }
    }
  }
}
</script>

<style scoped lang="scss">
#cards {
  display: flex;
  justify-content: space-around;
  width: 100vw;
  position: absolute;
  bottom: 40px;

  .card {
    outline: 1px dashed #aaa;
    display: inline-block;
    width: 10vw;
    height: 14vw;
    font-size: 10vw;
    opacity: .2;

    &.allowed:hover {
      outline: 3px dashed black;
      cursor: pointer;
    }

    &.allowed {
      opacity: 1;
    }

    &.red {
      color: red;
    }
  }
}
</style>