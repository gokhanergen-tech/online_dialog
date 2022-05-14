import TYPES from "../../../actions/room_actions/types";

const initialState={
    officeRooms:[],
    interviewRooms:[]
}

const roomsReducer=(state=initialState,action)=>{
     switch(action.type){
        case TYPES.SET_INTERVIEW_ROOMS:
            return {
              ...state,...action.payload
            }
        case TYPES.SET_OFFICE_ROOMS:
            return {
                ...state,...action.payload
            }
        case TYPES.ADD_INTERVIEW_ROOM:
            return{
                ...state,interviewRooms:[...state.interviewRooms,action.payload]
            }
        case TYPES.ADD_OFFICE_ROOM:
            return{
                ...state,officeRooms:[...state.officeRooms,action.payload]
            }
        default:
            return state;
     }
}

export default roomsReducer;


