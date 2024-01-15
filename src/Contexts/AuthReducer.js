const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      
      // When a user logs in, update the currentUser in the state with the provided payload.
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {

      // When a user logs out, set currentUser to null in the state.
      return {
        ...state,
        currentUser: null,
      };
    }
    case "REGISTER": {

      // When a user registers, update the currentUser in the state with the provided payload.
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
