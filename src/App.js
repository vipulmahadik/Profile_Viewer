import React, { Component } from 'react';
import logo from './img/github-logo.png';
import a from './img/Profile_Viewer1.jpg';
import b from './img/Profile_Viewer2.jpg';
import c from './img/Profile_Viewer3.jpg';
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
