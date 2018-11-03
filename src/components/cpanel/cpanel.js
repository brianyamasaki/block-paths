import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { storePath, clearPaths, loadPath, skipBlocksFromPath, restartPuzzle } from '../../modules/pathStore';
import './cpanel.css';

class CPanel extends Component {
  renderPath = (path, i) => {
    const { loadPath, skipBlocksFromPath } = this.props;
    return (
      <li key={i}>
        <Button 
          color="primary" 
          outline
          size="sm"
          onClick={() => loadPath(i)}
        >
          Solution
        </Button>
        <Button 
          color="secondary" 
          outline
          size="sm"
          onClick={() => skipBlocksFromPath(i)}
        >
          Puzzle
        </Button>
        {path.join(', ')}
      </li>
    )
  }

  renderPaths = () => {
    return (
      <ol>
        {this.props.paths.map(this.renderPath)}
      </ol>
    );
  }

  render() {
    return (
      <div className="cpanel">
        <div className="buttonBar">
          <Button 
            color="primary"
            onClick={() => this.props.restartPuzzle()}
          >
            Reset
          </Button>
          <Button 
            color="primary"
            onClick={() => this.props.storePath()}
          >
            Store Path
          </Button>
          <Button 
            color="danger"
            onClick={() => this.props.clearPaths()}
          >
            Clear All Storage
          </Button>
        </div>
        {this.renderPaths()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { puzzles } = state;
  return {
    paths: puzzles.paths
  };
}

export default connect(mapStateToProps, {
  restartPuzzle,
  storePath,
  clearPaths,
  loadPath,
  skipBlocksFromPath
})(CPanel);