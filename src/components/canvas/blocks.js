import React, { Component } from 'react';
import { Rect, Group, Line } from 'react-konva';
import { connect } from 'react-redux';
import { 
  BOARD_PIXEL_HEIGHT, 
  BOARD_PIXEL_WIDTH,
  BLOCK_COLOR,
  SELECTED_COLOR,
  WIN_COLOR
} from './constants';
import { TILE_HORIZONTAL_COUNT, TILE_VERTICAL_COUNT } from '../../constants';
import { updatePath, wonPuzzle } from '../../modules/pathStore';

const TILE_WIDTH_TOTAL = BOARD_PIXEL_WIDTH / TILE_HORIZONTAL_COUNT;
const TILE_HEIGHT_TOTAL = BOARD_PIXEL_HEIGHT / TILE_VERTICAL_COUNT;
const TILE_LEFT_MARGIN = 2;
const TILE_TOP_MARGIN = 2;
const TILE_PIXEL_WIDTH = TILE_WIDTH_TOTAL - (TILE_LEFT_MARGIN * 2);
const TILE_PIXEL_HEIGHT = TILE_HEIGHT_TOTAL - (TILE_TOP_MARGIN * 2);

class Blocks extends Component {
  state = {
    blocks: [],
    selected: [],
    skipBlocks: [],
    nonSkippedBlocks: 0,
    won: false
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
      blocks,
      nonSkippedBlocks: blocks.length,
    });
  }

  componentDidUpdate = (prevProps) => {
    const { currentPath, skipBlocks, won } = this.props;
    if (prevProps.currentPath !== currentPath) {
      this.setState({
        selected: currentPath
      });
    }
    if (prevProps.skipBlocks !== skipBlocks) {
      this.setState({
        skipBlocks,
        nonSkippedBlocks: skipBlocks.filter(show => !show).length
      });
    }
    if (this.state.won !== won) {
      this.setState({
        won
      });
    }
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

    const won = selected.length === this.state.nonSkippedBlocks;
    this.setState({
      selected,
      won
    });
    if (won) {
      this.props.wonPuzzle();
    }
    
    e.evt.preventDefault();
  }

  onTouchEnd = (e) => {
    e.evt.preventDefault();
    this.props.updatePath(this.state.selected);
  }

  renderBlock = (block, i) => {
    let fill;
    if (this.state.won) {
      fill = WIN_COLOR;
    } else if (this.state.selected.indexOf(i) !== -1) {
      fill = SELECTED_COLOR;
    } else {
      fill = BLOCK_COLOR;
    }

    if (!this.state.skipBlocks[i]) {
      return (
        <Rect  
          x={block.x} 
          y={block.y} 
          width={block.width} 
          height={block.height} 
          fill={fill}
          onTouchStart={(e) => this.onTouchStart(e, i)}
          onTouchMove={(e) => this.onTouchMove(e, i)}
          onTouchEnd={(e) => this.onTouchEnd(e)}
          onMouseDown={(e) => this.onMouseDown(e, i)}
          onMouseMove={(e) => this.onMouseMove(e, i)}
          onMouseUp={this.onMouseUp}
          key={i}
        />
      );
    }
  }

  renderSelection() {
    let points = [];
    const blockHalfWidth = TILE_PIXEL_WIDTH / 2;
    const blockHalfHeight = TILE_PIXEL_HEIGHT / 2;
    this.state.selected.forEach(iBlock => {
      const block = this.state.blocks[iBlock];
      const x = block.x + blockHalfWidth;
      const y = block.y + blockHalfHeight;
      points = points.concat(x, y);
    });
    if (points.length < 1) 
      return;
    const stroke = this.state.won ? WIN_COLOR : SELECTED_COLOR;
    return (
      <Line 
        points={points} 
        stroke={stroke} 
        strokeWidth={TILE_PIXEL_HEIGHT} 
        lineJoin='miter' 
      />
    );
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

const mapStateToProps = state => {
  const { puzzles } = state;
  return {
    paths: puzzles.paths,
    currentPath: puzzles.currentPath,
    skipBlocks: puzzles.skipBlocks,
    won: puzzles.won
  };
}

export default connect(mapStateToProps, {
  updatePath,
  wonPuzzle
})(Blocks);