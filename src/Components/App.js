import React, { Component } from 'react';
import './App.css';
import Link from './js/link';
import Card from './js/card';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link/>
          <Card />
        </header>
      </div>
    );
  }
}

export default App;
