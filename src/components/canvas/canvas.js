import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Blocks from './blocks';
import { BOARD_PIXEL_WIDTH, BOARD_PIXEL_HEIGHT } from './constants';

class Canvas extends Component {
  state = {
    width: BOARD_PIXEL_WIDTH,
    height: BOARD_PIXEL_HEIGHT,
    points: []
  };

  offsetXYFromParent(clientX, clientY, offsetParent) {
    const isBody = offsetParent === offsetParent.ownerDocument.body;
    const offsetParentRect = isBody ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();
  
    const x = clientX + offsetParent.scrollLeft - offsetParentRect.left;
    const y = clientY + offsetParent.scrollTop - offsetParentRect.top;
  
    return {x, y};
  }

  render() {
    const styles = {
      background: 'gray',
      width: this.state.width,
      height: this.state.height,
      margin: 'auto'
    };

    return (
      <Stage
        width={this.state.width} 
        height={this.state.width}
      >
        <Layer style={styles}>
          <Blocks />
        </Layer>
      </Stage>
    )
  }
}

export default Canvas;