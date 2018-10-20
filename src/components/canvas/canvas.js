import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Blocks from './blocks';

class Canvas extends Component {
  state = {
    width: 500,
    height: 500,
    points: []
  };

  offsetXYFromParent(clientX, clientY, offsetParent) {
    const isBody = offsetParent === offsetParent.ownerDocument.body;
    const offsetParentRect = isBody ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();
  
    const x = clientX + offsetParent.scrollLeft - offsetParentRect.left;
    const y = clientY + offsetParent.scrollTop - offsetParentRect.top;
  
    return {x, y};
  }

  onTouchStart = e => {
    const touch = e.evt.touches[0];
    const { x, y } = this.offsetXYFromParent(touch.clientX, touch.clientY, e.evt.target.parentElement)
    const point = {
      x,
      y
    };
    e.evt.preventDefault();
    this.setState({
      points: [point]
    });
  }

  onTouchMove = e => {
    const touch = e.evt.changedTouches[0];
    const { x, y } = this.offsetXYFromParent(touch.clientX, touch.clientY, e.evt.target.parentElement)
    const point = {
      x,
      y
    };
    e.evt.preventDefault();

    this.setState({
      points: this.state.points.concat(point)
    });
  }

  onTouchEnd = e => {
    e.evt.preventDefault();
    this.setState({
      points: []
    })
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