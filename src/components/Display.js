import React from "react";

export default function Display(props) {
  return (
    <div className="h-1/4 bg-gray-800 flex justify-center items-center relative">
      {props.emergencyState ? (
        <div className="flex flex-col items-center">
          <span className="text-7xl animate-pulse text-yellow-300">
            EMERGENCY ACTIVATED
          </span>
          <span className="text-3xl text-yellow-300">
            The elevator will stop at next floor. The admin has been informed
          </span>
        </div>
      ) : props.warning ? (
        <div className="flex flex-col items-center">
          <span className="text-7xl animate-pulse text-yellow-300">
            WARNING!
          </span>
          <span className="text-3xl text-yellow-300">Elevator overloaded!</span>
        </div>
      ) : (
        <>
          <span className="text-9xl">{props.currentFloor}</span>
          {props.movingState !== 0 ? (
            props.movingState === 1 ? (
              <i
                style={{ fontSize: "3rem" }}
                className="im im-care-up ml-5"
              ></i>
            ) : (
              <i
                style={{ fontSize: "3rem" }}
                className="im im-care-down ml-5"
              ></i>
            )
          ) : (
            ""
          )}
        </>
      )}

      <div className="flex flex-col absolute top-2 right-2 items-end">
        <span>Current load: {props.weight} kg</span>
        <span className="text-gray-300">Max. load: 600 kg</span>
      </div>
    </div>
  );
}
