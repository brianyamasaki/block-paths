import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Blocks from './blocks';
import CPanel from '../cpanel/cpanel';
import { BOARD_PIXEL_WIDTH, BOARD_PIXEL_HEIGHT } from './constants';

import './canvas.css';

class Canvas extends Component {
  state = {
    width: BOARD_PIXEL_WIDTH,
    height: BOARD_PIXEL_HEIGHT,
    points: []
  };

  render() {

    return (
      <div className="blockGame" style={{ width: this.state.width }}>
        <Stage
          width={this.state.width} 
          height={this.state.width}
        >
          <Layer>
            <Blocks />
          </Layer>
        </Stage>
        <CPanel />
      </div>
    )
  }
}

export default Canvas;