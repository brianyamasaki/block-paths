import React, { Component } from 'react';
import Tile from './tile';

import './board.css';

const BOARD_WIDTH = 500;
const BOARD_HEIGHT = 500;
const TILE_HORIZONTAL_COUNT = 5;
const TILE_VERTICAL_COUNT = 5;
const TILE_WIDTH = 94;
const TILE_HEIGHT = 94;
const TILE_MARGIN = 3;
const TILE_WIDTH_TOTAL = TILE_WIDTH + (2 * TILE_MARGIN);
const TILE_HEIGHT_TOTAL = TILE_HEIGHT + (2 * TILE_MARGIN);

class Board extends Component {
  state = {
    tiles: [],
    selectedTiles: []
  }

  componentDidMount() {
    const tiles = this.initTiles();
    this.setState({
      tiles,
      selectedTiles: []
    });
  }
  
  initTiles = () => {
    const tiles = [];
    let i; 
    
    for (i = 0; i < TILE_HORIZONTAL_COUNT * TILE_VERTICAL_COUNT; i++) {
      const row = Math.trunc(i / TILE_HORIZONTAL_COUNT);
      const column = i % TILE_HORIZONTAL_COUNT;
      tiles.push({ 
        style: {
          left: column * TILE_WIDTH_TOTAL + TILE_MARGIN,
          top: row * TILE_HEIGHT_TOTAL + TILE_MARGIN,
          width: TILE_WIDTH,
          height: TILE_HEIGHT
        }
      });
    }
    return tiles;
  }

  offsetXYFromParent(clientX, clientY, offsetParent) {
    const isBody = offsetParent === offsetParent.ownerDocument.body;
    const offsetParentRect = isBody ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();
  
    const x = clientX + offsetParent.scrollLeft - offsetParentRect.left;
    const y = clientY + offsetParent.scrollTop - offsetParentRect.top;
  
    return {x, y};
  }

  clientToTile(x, y) {
    const row = Math.trunc(y / TILE_WIDTH_TOTAL);
    const column = Math.trunc(x / TILE_HEIGHT_TOTAL);
    return row * TILE_HORIZONTAL_COUNT + column;
  }

  onTouchStart = e => {
    const tiles = this.initTiles();
    const touch = e.touches[0]
    const {x, y} = this.offsetXYFromParent(touch.clientX, touch.clientY, e.target.parentElement);
    const i = this.clientToTile(x, y);
    tiles[i].touched = true;
    this.setState({
      tiles,
      selectedTiles: [ i ]
    })
    e.preventDefault();
  }

  onTouchMove = e => {
    const touch = e.changedTouches[0];
    const { x, y } = this.offsetXYFromParent(touch.clientX, touch.clientY, e.target.parentElement);
    const i = this.clientToTile(x, y);
    const selectedTiles = this.state.selectedTiles.slice(0);
    const selectedTilesIndex = selectedTiles.indexOf(i);
    if (selectedTilesIndex === -1) {
      selectedTiles.push(i);
    } else if (selectedTilesIndex < selectedTiles.length - 1) {
      selectedTiles.splice(selectedTilesIndex, selectedTiles.length - selectedTilesIndex);
    } else {
      return;
    }

    const tiles = this.initTiles();
    selectedTiles.forEach(i => {
      tiles[i].touched = true;
    });

    this.setState({
      tiles,
      selectedTiles
    })
    e.preventDefault();
  }

  renderTile = (tile, i) => {
    return (
      <Tile 
        key={i} 
        index={i} 
        touched={this.state.tiles[i].touched}
        style={tile.style}
      />
    );
  }

  renderTiles = () => {
    return this.state.tiles.map(this.renderTile);
  }

  render() {
    const styles = {
      height: BOARD_HEIGHT,
      width: BOARD_WIDTH
    }
    return (
      <div 
        className="board" 
        style={styles}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
      >
        {this.renderTiles()}
      </div>
    );
  }
}

export default Board;