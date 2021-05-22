import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Controls from "./components/Controls";
import Elevator from "./components/Elevator";

function App() {
  const elevator = useRef(null);
  const door = useRef(null);
  const [warning, setWarning] = useState(0);
  const [emergencyState, setEmergencyState] = useState(0);
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

  const moveElevator = () => {
    setIdle(false);
    if (requestArray.includes(currentFloor)) stop();
    else if (requestArray[0] > currentFloor) moveUp();
    else moveDown();
  };

  const moveUp = () => {
    if (requestArray.length) {
      setMovingState(1);
      elevator.current.style.marginBottom = (currentFloor + 1) * 10 + "vh";
      setTimeout(() => {
        setCurrentFloor(currentFloor + 1);
      }, 1000);
    } else {
      setIdle(true);
      setTimeout(() => {
        closeDoor();
      }, 4000);
    }
  };

  const moveDown = () => {
    if (requestArray.length) {
      setMovingState(-1);
      elevator.current.style.marginBottom = (currentFloor - 1) * 10 + "vh";
      setTimeout(() => {
        setCurrentFloor(currentFloor - 1);
      }, 1000);
    } else {
      setIdle(true);
      setTimeout(() => {
        closeDoor();
      }, 4000);
    }
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

  const stop = () => {
    openDoor();
    setRequestArray((prevValue) => prevValue.filter((f) => f !== currentFloor));
    setDoorState(1);
  };

  const openDoor = () => {
    door.current.style.width = "90%";
  };

  const closeDoor = () => {
    door.current.style.width = "3%";
  };

  const emergency = () => {
    setRequestArray([]);
    setEmergencyState(1);
    fetch("http://localhost:3001/database", {
      method: "POST",
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    </div>
  );
}

export default App;
