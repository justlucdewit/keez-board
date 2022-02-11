<template>
  <div id="board">
    <span id="board-container">
      <img src="@/assets/board.png" ref="board"  alt=""/>
      <span v-if="loaded" @click="executeAction(pawn)" v-for="pawn in pawns" class="pawn" :class="`${pawn.color} ${ selectWalker && !pawn.pos.startsWith('h') ? 'selectable' : '' }`" :style="calculatePosition(pawn)">
        ♟
      </span>
    </span>

    <div id="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loaded: false,

    positions: {
      "hb1": [37, 55, "s1"],
      "hb2": [129, 55, "s1"],
      "hb3": [129, 155, "s1"],
      "hb4": [37, 155, "s1"],
      "hr1": [963, 155, "s31"],
      "hr2": [963, 55, "s31"],
      "hr3": [871, 155, "s31"],
      "hr4": [871, 55, "s31"],
      "hg1": [963, 910, "s21"],
      "hg2": [963, 1000, "s21"],
      "hg3": [871, 910, "s21"],
      "hg4": [871, 1000, "s21"],
      "hy1": [37, 910, "s11"],
      "hy2": [129, 1000, "s11"],
      "hy3": [129, 910, "s11"],
      "hy4": [37, 1000, "s11"],
      "s1": [411, 55, "s2"],
      "s2": [411, 150, "s3"],
      "s3": [411, 245, "s4"],
      "s4": [411, 340, "s5"],
      "s5": [411, 435, "s6"],
      "s6": [310, 435, "s7"],
      "s7": [219, 435, "s8"],
      "s8": [129, 435, "s9"],
      "s9": [37, 435, "s10"],
      "s10": [37, 530, "s11"],
      "s11": [37, 625, "s12"],
      "s12": [129, 625, "s13"],
      "s13": [219, 625, "s14"],
      "s14": [310, 625, "s15"],
      "s15": [411, 625, "s16"],
      "s16": [411, 717, "s17"],
      "s17": [411, 809, "s18"],
      "s18": [411, 910, "s19"],
      "s19": [411, 1000, "s20"],
      "s20": [500, 1000, "s21"],
      "s21": [589, 1000, "s22"],
      "s22": [589, 910, "s23"],
      "s23": [589, 809, "s24"],
      "s24": [589, 717, "s25"],
      "s25": [589, 625, "s26"],
      "s26": [689, 625, "s27"],
      "s27": [779, 625, "s28"],
      "s28": [869, 625, "s29"],
      "s29": [962, 625, "s30"],
      "s30": [962, 530, "s31"],
      "s31": [962, 435, "s32"],
      "s32": [869, 435, "s33"],
      "s33": [779, 435, "s34"],
      "s34": [689, 435, "s35"],
      "s35": [589, 435, "s36"],
      "s36": [589, 340, "s37"],
      "s37": [589, 245, "s38"],
      "s38": [589, 150, "s39"],
      "s39": [589, 55, "s40"],
      "s40": [500, 55, "s1"],
      "fb1": [500, 150, "fb2"],
      "fb2": [500, 245, "fb3"],
      "fb3": [500, 340, "fb4"],
      "fb4": [500, 435],
      "fr1": [500, 625, "fr2"],
      "fr2": [500, 717, "fr3"],
      "fr3": [500, 809, "fr4"],
      "fr4": [500, 910],
      "fg1": [869, 530, "fg2"],
      "fg2": [779, 530, "fg3"],
      "fg3": [689, 530, "fg4"],
      "fg4": [589, 530],
      "fy1": [401, 530, "fy2"],
      "fy2": [310, 530, "fy3"],
      "fy3": [219, 530, "fy4"],
      "fy4": [129, 530],
    },

    startingPosses: {
      blue: "s1"
    },

    pawns: [
      {
        color: "blue",
        pos: "hb1"
      },
      {
        color: "blue",
        pos: "hb2"
      },
      {
        color: "blue",
        pos: "hb3"
      },
      {
        color: "blue",
        pos: "hb4"
      },

      {
        color: "red",
        pos: "hr1"
      },
      {
        color: "red",
        pos: "hr2"
      },
      {
        color: "red",
        pos: "hr3"
      },
      {
        color: "red",
        pos: "hr4"
      },

      {
        color: "green",
        pos: "hg1"
      },
      {
        color: "green",
        pos: "hg2"
      },
      {
        color: "green",
        pos: "hg3"
      },
      {
        color: "green",
        pos: "hg4"
      },

      {
        color: "yellow",
        pos: "hy1"
      },
      {
        color: "yellow",
        pos: "hy2"
      },
      {
        color: "yellow",
        pos: "hy3"
      },
      {
        color: "yellow",
        pos: "hy4"
      },
    ],

    currentAction: null,
    message: "Your turn",
    selectWalker: false,
    selectHome: false
  }),

  mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 400);

    window.pawns = this.pawns;
    window.startingPosses = this.startingPosses;
    window.positions = this.positions;
  },

  methods: {
    async executeAction(pawn) {
      if (!(this.selectWalker && !pawn.pos.startsWith('h')))
        return

      if (this.currentAction === "forwards 2")
        await this.walk(pawn, 2);
      if (this.currentAction === "forwards 3")
        await this.walk(pawn, 3);
      if (this.currentAction === "forwards 5")
        await this.walk(pawn, 5);
      if (this.currentAction === "forwards 6")
        await this.walk(pawn, 6);
      if (this.currentAction === "forwards 8")
        await this.walk(pawn, 8);
      if (this.currentAction === "forwards 9")
        await this.walk(pawn, 9);
      if (this.currentAction === "forwards 10")
        await this.walk(pawn, 10);
      if (this.currentAction === "forwards 12")
        await this.walk(pawn, 12);


      this.selectHome = false;
      this.selectWalker = false;
      this.message = "";
      this.currentAction = "";
    },

    async walk(pawn, steps) {
      pawn.pos = this.positions[pawn.pos][2];

      await sleep(500)

      if (steps > 1)
        this.walk(pawn, steps - 1);
    },

    tryExecuteCard(card, color) {

      console.log(card, color)

      // kings
      if ("🂮🂾🃎🃞".includes(card)) {
        // Get a pawn that is at home position
        const pawn = this.pawns.find(
            pawn => pawn.color === color &&
            pawn.pos.startsWith("h")
        );

        // Move that pawn to its starting pos
        pawn.pos = this.startingPosses[color];
      }

      // Two's
      else if ("🂢🂲🃂🃒".includes(card)) {
        this.currentAction = "forwards 2";
        this.message = "Select pawn to move 2 steps forwards";
        this.selectWalker = true;
      }

      // Three's
      else if ("🂣🂳🃃🃓".includes(card)) {
        this.currentAction = "forwards 3";
        this.message = "Select pawn to move 3 steps forwards";
        this.selectWalker = true;
      }

      // Five's
      else if ("🂥🂵🃅🃕".includes(card)) {
        this.currentAction = "forwards 5";
        this.message = "Select pawn to move 5 steps forwards";
        this.selectWalker = true;
      }

      // Six's
      else if ("🂦🂶🃆🃖".includes(card)) {
        this.currentAction = "forwards 6";
        this.message = "Select pawn to move 6 steps forwards";
        this.selectWalker = true;
      }

      // Eight's
      else if ("🂨🂸🃈🃘".includes(card)) {
        this.currentAction = "forwards 8";
        this.message = "Select pawn to move 8 steps forwards";
        this.selectWalker = true;
      }

      // Nine's
      else if ("🂩🂹🃉🃙".includes(card)) {
        this.currentAction = "forwards 9";
        this.message = "Select pawn to move 9 steps forwards";
        this.selectWalker = true;
      }

      // Ten's
      else if ("🂪🂺🃊🃚".includes(card)) {
        this.currentAction = "forwards 10";
        this.message = "Select pawn to move 10 steps forwards";
        this.selectWalker = true;
      }

      // Queen's
      else if ("🂭🂽🃍🃝".includes(card)) {
        this.currentAction = "forwards 12";
        this.message = "Select pawn to move 12 steps forwards";
        this.selectWalker = true;
      }

      else {
        console.log("unknown card, skipping")
      }

      window.pawns = this.pawns;
      window.startingPosses = this.startingPosses;
      window.positions = this.positions;
    },

    lerp(start, stop, amt) {
      return amt * (stop - start) + start;
    },

    calculatePosition(pawn) {
      const pos = this.positions[pawn.pos];

      const rect = this.$refs.board.getBoundingClientRect();

      const maxX = rect.width - 27;
      const maxY = rect.height - 35;

      const x = this.lerp(0, maxX, pos[0] / 1000)
      const y = this.lerp(0, maxY, pos[1] / 1000)

      return `bottom: ${y - 5}px;left: ${x - 10}px;`
    }
  }
}
</script>

<style scoped lang="scss">
#board {
  text-align: center;
  margin: 40px 0;

  #message {
    color: green;
    font-weight: bold;
    font-size: xx-large;
  }

  #board-container {
    position: relative;

    img {
      max-height: 70vh;
      max-width: 70vw;
    }

    .pawn {
      color: black;
      font-size: 60px;
      position: absolute;
      height: 50px;
      line-height: 30px;
      border-radius: 50%;

      &.selectable:hover {
        background: #fffa;
        cursor: pointer;
      }

      &.blue {
        color: #0000a6;
      }

      &.red {
        color: #770000;
      }

      &.green {
        color: #004d00;
      }

      &.yellow {
        color: #797900;
      }

      &.black {
        color: #797900;
      }
    }
  }
}
</style>