import React, { Component } from 'react';
import { Circle } from 'react-konva';

class Points extends Component {

  renderPoint(point, i) {
    return (
      <Circle 
        x={point.x} 
        y={point.y} 
        radius={20}
        fill="red"
        key={i} 
      />
    );
  }

  render() {
    const { points } = this.props;
    if (points && points.length) {
      return points.map(this.renderPoint);
    }
    return null;
  }
}

export default Points;