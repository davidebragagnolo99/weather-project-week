const initialState = {
  days: {
    content: [],
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DAYS":
      return {
        ...state,
        days: {
          content: [action.payload],
        },
      };
    default:
      return state;
  }
};

export default mainReducer;
