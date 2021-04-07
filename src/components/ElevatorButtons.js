import React from "react";
import FloorButton from "./FloorButton";

export default function ElevatorButtons({
  requestArray,
  addRequest,
  emergency,
}) {
  return (
    <div className="h-2/4 flex">
      <div className="w-2/3 flex flex-wrap justify-center">
        <FloorButton
          addrequest={addRequest}
          active={requestArray.includes(9)}
          number={9}
        />
        <FloorButton
          addrequest={addRequest}
          active={requestArray.includes(8)}
          number={8}
        />
        <FloorButton
          addrequest={addRequest}
          active={requestArray.includes(7)}
          number={7}
        />
        <FloorButton
          addrequest={addRequest}
          active={requestArray.includes(6)}
          number={6}
        />
        <FloorButton
          addrequest={addRequest}
          active={requestArray.includes(5)}
          number={5}
        />
        <FloorButton
          addrequest={addRequest}
          active={requestArray.includes(4)}
          number={4}
        />
        <FloorButton
          addrequest={addRequest}
          active={requestArray.includes(3)}
          number={3}
        />
        <FloorButton
          addrequest={addRequest}
          active={requestArray.includes(2)}
          number={2}
        />
        <FloorButton
          addrequest={addRequest}
          active={requestArray.includes(1)}
          number={1}
        />
        <FloorButton
          addrequest={addRequest}
          active={requestArray.includes(0)}
          number={0}
        />
      </div>
      <div className="w-1/3 flex flex-col justify-around items-end pr-5">
        <button className="text-5xl flex items-center border-4 border-white p-4 rounded-xl">
          <i style={{ fontSize: "3rem" }} className="im im-care-left"></i>
          <i style={{ fontSize: "3rem" }} className="im im-care-right mr-2"></i>
          OPEN
        </button>
        <button className="text-5xl flex items-center border-4 border-white p-4 rounded-xl">
          <i style={{ fontSize: "3rem" }} className="im im-care-right"></i>
          <i style={{ fontSize: "3rem" }} className="im im-care-left mr-2"></i>
          CLOSE
        </button>
        <button
          onClick={emergency}
          className="text-5xl flex items-center border-4 border-white p-4 rounded-xl"
        >
          <i style={{ fontSize: "3rem" }} class="im im-warning mr-2"></i>
          EMERGENCY
        </button>
      </div>
    </div>
  );
}
