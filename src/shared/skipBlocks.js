import { TILE_HORIZONTAL_COUNT, TILE_VERTICAL_COUNT } from '../constants';
export const skipBlocksTable = (nodes) => {
  const path = nodes || [];
  let i;
  const lookupTable = [];

  for (i = 0; i < TILE_HORIZONTAL_COUNT * TILE_VERTICAL_COUNT; i++) {
    let skipBlock;
    if (path.length === 0) {
      skipBlock = false;
    } else {
      skipBlock = path.indexOf(i) === -1;
    }
    lookupTable.push(skipBlock);
  }
  return lookupTable;
}