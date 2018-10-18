import React, { Component } from 'react';

import './tile.css';

class Tile extends Component {


  render() {
    const classes = ["tile"];
    if (this.props.touched) {
      classes.push('touched')
    }
    return (
      <div 
        className={classes.join(' ')}
        index={this.props.index}
        style={this.props.style}
      />
    );
  }
}

export default Tile;