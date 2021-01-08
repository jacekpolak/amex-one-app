import { fromJS } from "immutable";

export const LOADING_API = "LOADING_API";
export const LOADED_API = "LOADED_API";

const buildInitialState = () =>
  fromJS({
    isLoading: false,
    isComplete: false,
    data: null,
    error: null,
  });

function reducer(state = buildInitialState(), action) {
  switch (action.type) {
    case LOADING_API:
      return state.set("isLoading", true).set("isComplete", false);
    case LOADED_API:
      return state
        .set("data", action.data)
        .set("isLoading", false)
        .set("isComplete", true);
    default:
      return state;
  }
}

reducer.buildInitialState = buildInitialState;

export default reducer;
