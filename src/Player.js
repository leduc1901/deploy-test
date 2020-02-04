import React , { createRef}from 'react';
import './App.css';
import Slider from "react-input-slider"
import PrevIcon from "./Icons/PrevIcon";
import NextIcon from "./Icons/NextIcon";
import PauseIcon from "./Icons/PauseIcon";
import PlayIcon from "./Icons/PlayIcon";
import {Provider, connect} from "react-redux"
import { pausePlay , changeSong, nextBtn, prevBtn } from "./action/musicPlayerActions"

class Player extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          songIndex : 0,
          currentTime : 0,
          duration : 0,
          isPlay : false
        }
    }
  
    audioReference = createRef()
  
    pausePlayClick = () => {
      if(this.state.isPlay){
        this.audioReference.current.pause();
      }else{
        this.audioReference.current.play();
      }
      this.setState({
        isPlay : !this.state.isPlay
      })
      this.props.dispatchPausePlay(this.state.songIndex)
    }
  
    loadData = () => {
      this.setState({
        duration : this.audioReference.current.duration
      })
      if(this.state.isPlay){
        this.audioReference.current.play();
      }
    }
  
    sliderChange = ({x}) => {
      console.log(x)
      this.audioReference.current.currentTime = x;
      this.setState({
        currentTime : x
      })
      if(!this.state.isPlay){
        this.setState({
          isPlay : true
        })
        this.audioReference.current.play()
      }
    }
  
    prevBtn = () => {
        if(this.state.songIndex === 0){
          this.setState({
            songIndex : this.props.audios.length - 1
          })
          this.props.dispatchPrevBtn(this.props.audios.length - 1, this.state.isPlay)
        }else{
          this.setState({
            songIndex : this.state.songIndex - 1
          })
          this.props.dispatchPrevBtn(this.state.songIndex - 1 , this.state.isPlay)
        }
        
    }
  
    nextBtn = () => {
      if(this.state.songIndex === this.props.audios.length - 1){
        this.setState({
          songIndex : 0
        })
        this.props.dispatchNextBtn(0 , this.state.isPlay)
      }else{
        this.setState({
          songIndex : this.state.songIndex + 1
        })
        this.props.dispatchNextBtn(this.state.songIndex + 1 , this.state.isPlay)
      }
    }

    changeSong = (index) => {
        if(index !== this.state.songIndex){
            if(!this.state.isPlay){
                this.setState({
                    isPlay : true
                })
                this.props.dispatchChangeSong(index, true , this.state.songIndex)
            }
            this.setState({
                songIndex : index,
            })
            this.audioReference.current.play()
            this.props.dispatchChangeSong(index, true , this.state.songIndex)
        }else{
            if(!this.state.isPlay){
                this.audioReference.current.play()
                this.setState({
                    isPlay : true
                })
                this.props.dispatchChangeSong(index, this.state.isPlay , this.state.songIndex)
            }else{
                this.audioReference.current.pause()
                this.setState({
                    isPlay : false
                })
                this.props.dispatchChangeSong(index, this.state.isPlay , this.state.songIndex)
            }
            
        }         
    }

    render() {
        return (
            <div className="App">
            <img className="thumbnail" src={this.props.audios[this.state.songIndex].img} alt="thumbnail" />
            <h2 className="title" >{this.props.audios[this.state.songIndex].title}</h2>
            <p className="singer" >{this.props.audios[this.state.songIndex].artist}</p>
            <div className="button-group" >
                <div className="prev-btn " onClick={this.prevBtn}>
                    <PrevIcon/>
                </div>
                <div className="play-pause-btn" onClick={this.pausePlayClick} >
                    {this.state.isPlay ? <PauseIcon/> : <PlayIcon/>}
                </div>
                <div className="next-btn" onClick={this.nextBtn}>
                    <NextIcon/>
                </div>
            </div>
            <Slider
              axis = "x"
              xmax={this.state.duration}
              x={this.state.currentTime}
              onChange={this.sliderChange}
                  styles={{
                    track: {
                      backgroundColor: "#e3e3e3",
                      height: "2px",
                    },
                    active: {
                      backgroundColor: "#333",
                      height: "2px",
                    },
                    thumb: {
                      marginTop: "-5px",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#333",
                      borderRadius: 100,
                    },
                  }}
                />
               <audio
                  ref = {this.audioReference}
                  src = {this.props.audios[this.state.songIndex].src}
                  onLoadedData = {this.loadData}
                  onTimeUpdate={()=> this.setState({currentTime : this.audioReference.current.currentTime})}
                  onEnded={() => this.setState({isPlay : false})}
                />
              <div className="song-list">
                  {this.props.audios && this.props.audios.map((item , index) => {
                      return (
                        <div className={item.isPlaying ? "song-item active" : "song-item"} onClick={() => this.changeSong(index)}>
                            <div className="song-des">
                                <p className={item.isPlaying ? "song-name active" : "song-name"}>{item.title}</p>
                                <p className={item.isPlaying ? "song-artist active" : "song-artist"} >{item.artist}</p>
                            </div>
                            <div className={item.isPlaying ? "current-song active" : "current-song"}>
                                {item.isPlaying ? <PauseIcon/> : <PlayIcon/>}
                            </div>
                        </div>
                    )
                  })}
              </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        audios : state.audios
    }
  }

function mapDispatchToProps(dispatch){
    return {
        dispatchPausePlay : (index) => dispatch(pausePlay(index)),
        dispatchPrevBtn : (index , cond) => dispatch(prevBtn(index, cond)),
        dispatchNextBtn : (index , cond) => dispatch(nextBtn(index, cond)),
        dispatchChangeSong : (index , cond , lastSong) => dispatch(changeSong(index, cond , lastSong)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
