import { skipBlocksTable } from '../shared/skipBlocks';

export const UPDATE_PATH = 'UPDATE_PATH';
export const STORE_PATH = 'STORE_PATH';
export const CLEAR_PATHS = 'CLEAR_PATHS';
export const LOAD_PATH = 'LOAD_PATH';
export const SKIP_FROM_PATH = 'SKIP_FROM_PATH';
export const RESTART_PUZZLE = 'RESTART_PUZZLE';
export const WON_PUZZLE = 'WON_PUZZLE';

const KEY_PATHS = 'KEY_PATHS';

const initialState = () => {
  let paths = [];
  if (window.localStorage) {
    paths = JSON.parse(window.localStorage.getItem(KEY_PATHS)) || []
  }
  return {
    currentPath: [],
    paths,
    skipBlocks: skipBlocksTable([]),
    won: false
  }
}

export default (state, action) => {
  let paths, path;
  if (!state) {
    return initialState();
  }
  switch(action.type) {
    case RESTART_PUZZLE:
      return initialState();
    case WON_PUZZLE:
      return {
        ...state,
        won: true
      };
    case UPDATE_PATH:
      return {
        ...state,
        currentPath: action.payload
      };
    case LOAD_PATH:
      path = state.paths[action.payload];
      return { 
        ...state,
        currentPath: path,
        skipBlocks: skipBlocksTable([])
      };
    case SKIP_FROM_PATH:
      path = state.paths[action.payload];
      return {
        ...state,
        currentPath: [],
        skipBlocks: skipBlocksTable(path)
      }
    case STORE_PATH:
      paths = state.paths.slice(0);
      paths.push(state.currentPath);
      if (window.localStorage) {
        const localStorage = window.localStorage;
        localStorage.setItem(KEY_PATHS, JSON.stringify(paths));
      }
      return {
        ...state,
        paths
      };
    case CLEAR_PATHS:
      if (window.localStorage) {
        window.localStorage.removeItem(KEY_PATHS);
      }
      return {
        ...state,
        paths: [],
        skipBlocks: skipBlocksTable([])
      }
    default:
      return state;
  }
}

export const updatePath = path => (
  {
    type: UPDATE_PATH,
    payload: path
  }
)

export const storePath = () => (
  {
    type: STORE_PATH
  }
)

export const clearPaths = () => (
  {
    type: CLEAR_PATHS
  }
)

export const loadPath = (i) => (
  {
    type: LOAD_PATH,
    payload: i
  }
)

export const skipBlocksFromPath = (i) => (
  {
    type: SKIP_FROM_PATH,
    payload: i
  }
)

export const restartPuzzle = () => (
  {
    type: RESTART_PUZZLE
  }
)

export const wonPuzzle = () => (
  {
    type: WON_PUZZLE
  }
)