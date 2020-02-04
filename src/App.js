import React , { createRef}from 'react';
import './App.css';
import Slider from "react-input-slider"
import PrevIcon from "./Icons/PrevIcon";
import NextIcon from "./Icons/NextIcon";
import PauseIcon from "./Icons/PauseIcon";
import PlayIcon from "./Icons/PlayIcon";
import {createStore} from 'redux';
import reducer from "./Audios/index"
import {Provider, connect} from "react-redux"
import Player from "./Player"

const store = createStore(reducer)

class App extends React.Component{

  
  render(){
    
    return (
      <Provider store={store}>
          <Player/>
      </Provider>
    );
  }
      
}




export default App;
