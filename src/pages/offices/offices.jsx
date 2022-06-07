import React,{useCallback} from 'react'
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getOwnerRoomsByRoomType, getUserRoomsByRoomType } from '../../axios/http';

import InterContent from "../../components/inter_content/interContent";
import Card from "../../components/room_card/card";
import { setOfficeRooms } from '../../redux_store/actions/room_actions/actions';
const Offices = () => {
  const dispatch=useDispatch();
  const owner=useSelector(state=>state.authReducer.user.userDto.owner,shallowEqual);
  const rooms=useSelector(state=>state.roomsReducer.officeRooms,shallowEqual);
  const getRoomsFromApi=useCallback(async ()=>{
    try{
      let allRooms=[]
      if(owner){
        const {data:{rooms}}=await getOwnerRoomsByRoomType("OFFICE_ROOM")
        allRooms=allRooms.concat(rooms)
      }
      const {data:{rooms}}=await getUserRoomsByRoomType("OFFICE_ROOM")
      allRooms=allRooms.concat(rooms)

      dispatch(setOfficeRooms(allRooms))
    }catch(err){
      console.log(err.response.data?.message)
    }
  },[rooms,owner])
  
  useEffect(()=>{
    getRoomsFromApi();
    document.title="Offices"
  },[])
  return (
    <InterContent>
      {
        rooms.map((room)=>{
          return <Card open={room.open} id={room.hashedId} key={room.hashedId} roomName={room.title} title={room.subtitle} teacher={room.ownerOfTheRoom.fullName} ></Card>
        })
      }
    </InterContent>
  )
}

export default React.memo(Offices)