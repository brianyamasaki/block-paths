export const STORE_PATH = 'STORE_PATH';

const INITIAL_STATE = {
  paths: []
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export const storePath = path => (
  {
    type: STORE_PATH,
    payload: path
  }
)