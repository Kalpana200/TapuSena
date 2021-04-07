import React from "react";
import Display from "./Display";
import FloorButtons from "./FloorButtons";
import ElevatorButtons from "./ElevatorButtons";

export default function Controls(props) {
  return (
    <div className="w-2/3 border-r border-gray-700">
      <Display
        currentFloor={props.currentFloor}
        movingState={props.movingState}
        weight={props.weight}
        warning={props.warning}
        emergencyState={props.emergencyState}
      />
      <FloorButtons
        addRequest={props.addRequest}
        moveElevator={props.moveElevator}
        doorState={props.doorState}
        setWeight={props.setWeight}
        weight={props.weight}
      />
      <ElevatorButtons
        requestArray={props.requestArray}
        addRequest={props.addRequest}
        emergency={props.emergency}
      />
    </div>
  );
}
