import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Controls from "./components/Controls";
import Elevator from "./components/Elevator";

function App() {
  const elevator = useRef(null);
  const door = useRef(null);
  const form = useRef(null);
  const [doorState, setDoorState] = useState(0);
  const [weight, setWeight] = useState(0);
  const [currentFloor, setCurrentFloor] = useState(0);  
  const [requestArray, setRequestArray] = useState([]);
  const [movingState, setMovingState] = useState(0); // 0 for idle, 1 for up, -1 for down
  const [idle, setIdle] = useState(true);
  const addRequest = (floor) => {
    setRequestArray((prevValue) => [...prevValue, floor]);
  };

  useEffect(() => {
    if (requestArray !== [] && idle) moveElevator();
  }, [requestArray]);

  useEffect(() => {
    if (!idle) {
      if (requestArray.includes(currentFloor)) stop();
      else if (movingState === 1) checkUp();
      else checkDown();
    }
  }, [currentFloor]);

  const checkUp = () => {
    if (requestArray.filter((f) => f > currentFloor).length) moveUp();
    else moveDown();
  };

  const checkDown = () => {
    if (requestArray.filter((f) => f < currentFloor).length) moveDown();
    else moveUp();
  };

  useEffect(() => {
    if (doorState) startTimer();
    else checkWeight();
  }, [doorState]);

  const checkWeight = () => {
    if (weight > 600) {
      setWarning(1);
      setDoorState(1);
    } else {
      setWarning(0);
      if (movingState === 1) {
        if (requestArray.length === 0) {
          setIdle(true);
          setDoorState(0);
          closeDoor();
        } else {
          setDoorState(0);
          closeDoor();
          setTimeout(() => {
            checkUp();
          }, 1000);
        }
      } else {
        if (requestArray.length === 0) {
          setIdle(true);
          setDoorState(0);
          closeDoor();
        } else {
          setDoorState(0);
          closeDoor();
          setTimeout(() => {
            checkDown();
          }, 1000);
        }
      }
    }
  };

  const startTimer = () => {
    setTimeout(() => {
      setDoorState(0);
    }, 5000);
  };

  const openDoor = () => {
    door.current.style.width = "90%";
  };

  const closeDoor = () => {
    door.current.style.width = "3%";
  };

  return (
    <div className="w-screen h-screen bg-gray-600 text-white flex">
      <Controls
        currentFloor={currentFloor}
        addRequest={addRequest}
        movingState={movingState}
        requestArray={requestArray}
        doorState={doorState}
        weight={weight}
        setWeight={setWeight}
        warning={warning}
        emergency={emergency}
        emergencyState={emergencyState}
      />
      <Elevator elevator={elevator} door={door} />
      <span className="absolute p-3 text-2xl italic text-gray-400">
        elevate
      </span>
      <form
        ref={form}
        className="h-0 w-0 overflow-hidden"
        onSubmit={handleSubmit}
        action="https://formspree.io/f/mknknzyr"
        method="POST"
      >
        <input type="hidden" name="message" value="Emergency Alert!" />
      </form>
    </div>
  );
}

export default App;
