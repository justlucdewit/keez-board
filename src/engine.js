console.clear()

const allCards = ["🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧", "🂨", "🂩", "🂪", "🂫", "🂭", "🂮", "🂱", "🂲", "🂳", "🂴", "🂵", "🂶", "🂷", "🂸", "🂹", "🂺", "🂻", "🂽", "🂾", "🃁", "🃂", "🃃", "🃄", "🃅", "🃆", "🃇", "🃈", "🃉", "🃊", "🃋", "🃍", "🃎", "🃑", "🃒", "🃓", "🃔", "🃕", "🃖", "🃗", "🃘", "🃙", "🃚", "🃛", "🃝", "🃞"];
let deck = [...allCards];

const takeRandomCard = () => {
    // Pull a random card
    const index = Math.floor(Math.random() * deck.length);
    const card = deck[index];

    // Remove it from the deck
    deck.splice(index, 1);

    return card;
}

const reShuffleDeck = () => {
    deck = [...allCards];
}

const distributeCards = () => {
    if (deck.length === 0) {
        reShuffleDeck();
    }

    const firstTime = deck.length === 52;
    const cardCount = firstTime ? 5 : 4;

    const playerHands = [];
    for (let i = 0; i < 4; i++) {
        const hand = [];
        for (let i = 0; i < cardCount; i++) {
            const card = takeRandomCard();
            hand.push(card);
        }

        playerHands.push(hand);
    }

    playerHands[0][0] = "🃎"
    playerHands[1][0] = "🃎"
    playerHands[2][0] = "🃎"
    playerHands[3][0] = "🃎"
    playerHands[0][1] = "🃒"

    return playerHands;
}

export default {
    distributeCards
}