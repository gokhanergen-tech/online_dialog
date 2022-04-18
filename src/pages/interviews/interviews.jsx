import React from "react";
import InterContent from "../../components/interviews_base/interContent";
import Card from "../../components/room_card/card";
const Interviews = () => {
  const roomName = "Calculus-II";
  const title = "Grup-B | Monday | 14.00";
  const teacher = "Alex Whoknows";

  return (
    <InterContent>
      <Card roomName={roomName} title={title} teacher={teacher} id={23} />
      <Card roomName={roomName} title={title} teacher={teacher} id={23} />
      <Card roomName={roomName} title={title} teacher={teacher} id={23} />
      <Card roomName={roomName} title={title} teacher={teacher} id={23} />
      <Card roomName={roomName} title={title} teacher={teacher} id={23} />
    </InterContent>
  );
};

export default Interviews;
