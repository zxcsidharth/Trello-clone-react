import { FETCH_CARDS, CREATE_CARDS, DELETE_CARDS } from "../constant";

const initialState = {
  cards: {},
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.key]: action.payload,
        },
      };
    case CREATE_CARDS:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.key]: [...state.cards[action.key], action.payload],
        },
      };
    case DELETE_CARDS:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.key]: state.cards[action.key].filter((card) => {
            return card.id !== action.payload;
          }),
        },
      };

    default:
      return state;
  }
};

export default cardReducer;
