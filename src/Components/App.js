import React, { Component } from 'react';
import './App.css';
import Title from './js/title';
import Card from './js/card';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Title/>
          <Card />
        </header>
      </div>
    );
  }
}

export default App;
