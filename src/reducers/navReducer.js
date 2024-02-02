import {
  FETCH_NAV_REQUEST,
  FETCH_NAV_SUCCESS,
  FETCH_NAV_FAILURE,
} from "../action/actions";

const initialState = {
  navData: [],
  loading: false,
  error: null,
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NAV_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_NAV_SUCCESS:
      return {
        ...state,
        loading: false,
        navData: action.payload,
      };

    case FETCH_NAV_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    default:
      return state;
  }
};

export default navReducer;
