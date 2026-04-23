export function createStore(initialState) {
  let state = { ...initialState };

  return {
    getState() {
      return state;
    },
    setState(nextState) {
      state = { ...nextState };
    },
    update(patch) {
      state = { ...state, ...patch };
    }
  };
}
