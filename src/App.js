import React, { Component } from 'react';
import logo from './img/github-logo.png';
import './App.css';
import Search from './Component/Search';

class App extends Component {
  render() {
    return (
        <div>
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="App">
                <div className="App-intro">
                    <Search/>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
