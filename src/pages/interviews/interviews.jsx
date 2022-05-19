import React from "react";
import { useEffect,useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getOwnerRoomsByRoomType, getUserRoomsByRoomType } from "../../axios/http";
import InterContent from "../../components/inter_content/interContent";
import Card from "../../components/room_card/card";
import { setInterviewRooms } from "../../redux_store/actions/room_actions/actions";
const Interviews = () => {
  const dispatch=useDispatch();
  const owner=useSelector(state=>state.authReducer.user.userDto.owner,shallowEqual);
  const rooms=useSelector(state=>state.roomsReducer.interviewRooms,shallowEqual);
 
  const getRoomsFromApi=useCallback(async ()=>{
    try{
      let allRooms=[]
      if(owner){
        const {data:{rooms}}=await getOwnerRoomsByRoomType("INTERVIEW_ROOM")
        allRooms=allRooms.concat(rooms)
      }
      const {data:{rooms}}=await getUserRoomsByRoomType("INTERVIEW_ROOM")
      allRooms=allRooms.concat(rooms)
      dispatch(setInterviewRooms(allRooms))
    }catch(err){
      console.log(err.response.data?.message)
    }
  },[rooms,owner])
  

  useEffect(()=>{
    getRoomsFromApi();
    document.title="Interviews"
  },[])
  

  return (
    <InterContent>
      {
        rooms.map((room)=>{
          return <Card id={room.hashedId} open={room.open} key={room.hashedId} roomName={room.title} title={room.subtitle} teacher={room.ownerOfTheRoom.fullName} ></Card>
        })
      }
    </InterContent>
  );
};

export default Interviews;
