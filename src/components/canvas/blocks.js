import React, { Component } from 'react';
import { Rect, Group, Line } from 'react-konva';
import { 
  BOARD_PIXEL_HEIGHT, 
  BOARD_PIXEL_WIDTH,
  BLOCK_COLOR,
  SELECTED_COLOR
} from './constants';

const TILE_HORIZONTAL_COUNT = 8;
const TILE_VERTICAL_COUNT = 8;
const TILE_WIDTH_TOTAL = BOARD_PIXEL_WIDTH / TILE_HORIZONTAL_COUNT;
const TILE_HEIGHT_TOTAL = BOARD_PIXEL_HEIGHT / TILE_VERTICAL_COUNT;
const TILE_LEFT_MARGIN = 2;
const TILE_TOP_MARGIN = 2;
const TILE_PIXEL_WIDTH = TILE_WIDTH_TOTAL - (TILE_LEFT_MARGIN * 2);
const TILE_PIXEL_HEIGHT = TILE_HEIGHT_TOTAL - (TILE_TOP_MARGIN * 2);

class Blocks extends Component {
  state = {
    blocks: [],
    selected: []
  };

  componentDidMount() {
    const blocks = [];
    for (let i = 0; i < TILE_HORIZONTAL_COUNT * TILE_VERTICAL_COUNT; i++) {
      blocks.push({
        iBlock: i,
        x: ((i % TILE_HORIZONTAL_COUNT) * TILE_WIDTH_TOTAL) + TILE_LEFT_MARGIN,
        y: (Math.trunc(i / TILE_HORIZONTAL_COUNT) * TILE_HEIGHT_TOTAL) + TILE_TOP_MARGIN,
        width: TILE_PIXEL_WIDTH,
        height: TILE_PIXEL_HEIGHT
      });
    }

    this.setState({
      blocks
    });
  }

  onMouseDown = (e, i) => {
    this.onTouchStart(e, i);
    this.isMouseDown = true;
  }

  onMouseMove = (e, i) => {
    if (this.isMouseDown) {
      this.onTouchMove(e, i);
    }
  }

  onMouseUp = () => {
    this.isMouseDown = false;
  }

  onTouchStart = (e, i) => {
    const indexOf = this.state.selected.indexOf(i);
    if (indexOf === -1) {
      this.setState({
        selected: [i]
      })  
    } else {
      this.setState({
        selected: this.state.selected.slice(0, indexOf + 1)
      })
    }
    e.evt.preventDefault();
  }

  onTouchMove = (e, i) => {
    const { selected } = this.state;
    const selectedTilesIndex = selected.indexOf(i);
    if (selectedTilesIndex === -1) {
      const selectedLast = selected[selected.length - 1];
      if (i === selectedLast - TILE_HORIZONTAL_COUNT ||
        i === selectedLast + TILE_HORIZONTAL_COUNT ||
        i === selectedLast - 1 ||
        i === selectedLast + 1) {
          selected.push(i);
      }
      else {
        return;
      }
    } else if (selectedTilesIndex < selected.length - 1) {
      selected.splice(selectedTilesIndex, selected.length - selectedTilesIndex);
    } else {
      return;
    }

    this.setState({
      selected
    });
    e.evt.preventDefault();
  }


  renderBlock = (block, i) => {
    const fill = this.state.selected.indexOf(i) !== -1 ? SELECTED_COLOR : BLOCK_COLOR;

    return (
      <Rect  
        x={block.x} 
        y={block.y} 
        width={block.width} 
        height={block.height} 
        fill={fill}
        onTouchStart={(e) => this.onTouchStart(e, i)}
        onTouchMove={(e) => this.onTouchMove(e, i)}
        onMouseDown={(e) => this.onMouseDown(e, i)}
        onMouseMove={(e) => this.onMouseMove(e, i)}
        onMouseUp={this.onMouseUp}
        key={i}
      />
    );
  }

  renderSelection() {
    let points = [];
    this.state.selected.forEach(iBlock => {
      const block = this.state.blocks[iBlock];
      const x = block.x + (block.width / 2);
      const y = block.y + (block.height / 2);
      points = points.concat(x, y);
    });
    if (points.length < 1) 
      return;
    return <Line points={points} stroke={SELECTED_COLOR} strokeWidth={TILE_PIXEL_HEIGHT} lineJoin='miter' />;
  }

  render() {
    return (
      <Group>
        {this.renderSelection()}
        {this.state.blocks.map(this.renderBlock)}
      </Group>
    );
  }
}

export default Blocks;