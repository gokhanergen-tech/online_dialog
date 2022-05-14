import TYPES from './types'

const setOfficeRooms=(payload)=>{
   return {
       type:TYPES.SET_OFFICE_ROOMS,payload:{officeRooms:payload}
   }
}

const setInterviewRooms=(payload)=>{
    return {
        type:TYPES.SET_INTERVIEW_ROOMS,payload:{interviewRooms:payload}
    }
}

const addInterviewRoom=(payload)=>{
    return {
        type:TYPES.ADD_INTERVIEW_ROOM,payload
    }
}

const addOfficeRoom=(payload)=>{
    return {
        type:TYPES.ADD_OFFICE_ROOM,payload
    }
}

export {setInterviewRooms,setOfficeRooms,addInterviewRoom,addOfficeRoom};