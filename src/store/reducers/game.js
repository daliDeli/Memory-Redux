import * as actionTypes from "../actions/actionTypes";

const initialState = {
  mode: {
    double: {
      easy: [],
      hard: []
    },
    triple: {
      easy: []
    }
  },
  currentGame: {
    matches: []
  }
};

const setGame = (prevState, action) => {
  const mode =
    action.mode === "double"
      ? {
          double: {
            easy: action.cards[0].cards,
            hard: action.cards[1].cards
          },
          triple: prevState.mode.triple
        }
      : {
          double: prevState.mode.double,
          triple: {
            easy: action.cards
          }
        };

  return {
    ...prevState,
    mode: mode
  };
};

const addMatch = (prevState, action) => {
  return {
    ...prevState,
    currentGame: {
      matches: [...prevState.currentGame.matches, ...action.card]
    }
  };
};

const resetGame = (prevState, action) => {
  return {
    ...prevState,
    currentGame: {
      matches: []
    }
  };
};

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GAME:
      return setGame(prevState, action);
    case actionTypes.RESET_GAME:
      return resetGame(prevState, action);
    case actionTypes.CARDS_MATCHED:
      return addMatch(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
