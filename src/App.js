import React, { Component } from 'react';
import './App.css';
import Link from './Components/js/link';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link/>
        </header>
      </div>
    );
  }
}

export default App;
