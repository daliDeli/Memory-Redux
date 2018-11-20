import * as actionTypes from "./actionTypes";

// Action creators
const fetchGameAction = (mode, cards) => {
  return {
    type: actionTypes.FETCH_GAME,
    mode: mode,
    cards: cards
  };
};

const resetGameAction = () => {
  return {
    type: actionTypes.RESET_GAME
  };
};

const addMatchAction = card => {
  return {
    type: actionTypes.CARDS_MATCHED,
    card: card
  };
};

// Actions
export const fetchGame = mode => {
  return dispatch => {
    const endpoint = mode === "double" ? "cards.json" : "triples.json";

    fetch(`https://web-code-test-dot-nyt-games-prd.appspot.com/${endpoint}`)
      .then(response => response.json())
      .then(game => {
        const cards = mode === "double" ? game.levels : game.cards;
        dispatch(fetchGameAction(mode, cards));
      })
      .catch(console.log);
  };
};

export const resetGame = () => {
  return dispatch => {
    dispatch(resetGameAction());
  };
};

export const addMatch = card => {
  return dispatch => {
    dispatch(addMatchAction(card));
    // return Promise.resolve();
  };
};
