import React, { Component } from 'react';
import Canvas from './components/canvas/canvas';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Block Paths</h1>
        </header>
        <Canvas />
      </div>
    );
  }
}

export default App;
