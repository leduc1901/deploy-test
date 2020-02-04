import MidnightPreterder from "./MidnightPretenders.mp3"
import StayWithMe from "./ORIGINALMusicVideoStayWithMeMikiMatsubaraHITACHISoundBreak.mp3";
import SlowNights from "./TomokoAranSlowNights1984.mp3"
import MidnightPretendersIMG from "../Images/e51c4d5c-5dba-42c4-8560-2621e01a43d1.jpg";
import StayWithMeIMG from "../Images/60425371_2223291284420463_3196375048923381760_n.jpg";
import SlowNightIMG from "../Images/b5ebad46c78bf1123dca42ae3787278d.jpg"
import * as ActionTypes from "../action/actionTypes"
const defaultState = {
    audios : [
        {
            src : MidnightPreterder,
            img : MidnightPretendersIMG,
            title : "Midnight Pretender",
            artist : "Tomoko Aran",
            isPlaying : false
        },
        {
            src : StayWithMe,
            img : StayWithMeIMG,
            title : "Stay With Me",
            artist : "Miki Matsubara",
            isPlaying : false
        },
        {
            src : SlowNights,
            img : SlowNightIMG,
            title : "Slow Nights",
            artist : 'Tomoko Aran',
            isPlaying : false
        }
    ]
}


export default function audioReducer(state = defaultState , action){
    switch(action.type){
        case ActionTypes.PAUSE_PLAY:
            let audiosPausePlay = JSON.parse(JSON.stringify(state))
            if(audiosPausePlay.audios[action.index].isPlaying){
                audiosPausePlay.audios[action.index].isPlaying = false
            }else{
                audiosPausePlay.audios[action.index].isPlaying = true
            }
            return audiosPausePlay
        case ActionTypes.PREV_BTN:
            let audiosPrevBtn = JSON.parse(JSON.stringify(state))
            console.log(action.cond , action.index)
            for(let i = 0 ; i < audiosPrevBtn.audios.length ; i++){
                audiosPrevBtn.audios[i].isPlaying = false
            }
            if(action.cond == true){
                audiosPrevBtn.audios[action.index].isPlaying = true
            }else{
                audiosPrevBtn.audios[action.index].isPlaying = false
            }
            return audiosPrevBtn;
        case ActionTypes.NEXT_BTN:
            let audiosNextBtn = JSON.parse(JSON.stringify(state))
            for(let i = 0 ; i < audiosNextBtn.audios.length ; i++){
                audiosNextBtn.audios[i].isPlaying = false
            }
            if(action.cond == true){
                audiosNextBtn.audios[action.index].isPlaying = true
            }else{
                audiosNextBtn.audios[action.index].isPlaying = false
            }
            return audiosNextBtn;
        case ActionTypes.CHANGE_SONG:
            console.log(action.index , action.lastSong)
            let audiosChange = JSON.parse(JSON.stringify(state))
            for(let i = 0 ; i < audiosChange.audios.length ; i++){
                audiosChange.audios[i].isPlaying = false
            }
            if(action.index !== action.lastSong){
                if(!action.cond){
                    audiosChange.audios[action.index].isPlaying = true
                }else{
                    audiosChange.audios[action.index].isPlaying = true
                }
            }else{
                if(!action.cond){
                    audiosChange.audios[action.index].isPlaying = true
                }else{
                    audiosChange.audios[action.index].isPlaying = false
                }
            }
            return audiosChange;
        default:
            return state
    }
};

