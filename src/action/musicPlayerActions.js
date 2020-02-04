import * as ActionTypes from "./actionTypes.js"

export const changeSong = (index , cond , lastSong) => {
    return {
        type : ActionTypes.CHANGE_SONG,
        index,
        cond,
        lastSong
    }
}

export const pausePlay = (index) => {
    return {
        type : ActionTypes.PAUSE_PLAY,
        index
    }
}
export const nextBtn = (index , cond) => {
    return {
        type : ActionTypes.NEXT_BTN,
        index,
        cond
    }
}
export const prevBtn = (index , cond) => {
    return {
        type : ActionTypes.PREV_BTN,
        index, 
        cond
    }
}