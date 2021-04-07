import React, { useState } from "react";

export default function FloorButtons(props) {
  const [selectedFloor, setSelectedFloor] = useState("0");
  const call = () => {
    props.addRequest(parseInt(selectedFloor));
  };
  const addPerson = () => {
    if (props.doorState) props.setWeight((prevValue) => prevValue + 60);
  };
  const removePerson = () => {
    if (props.doorState) {
      console.log("!");
      props.setWeight((prevValue) => prevValue - 60);
    }
  };
  return (
    <div className="h-1/4 border-b border-gray-700 flex justify-around items-center">
      <select
        onChange={(e) => {
          setSelectedFloor(e.target.value);
        }}
        className="text-black text-4xl rounded"
        value={selectedFloor}
      >
        <option value={0}>Floor 0</option>
        <option value={1}>Floor 1</option>
        <option value={2}>Floor 2</option>
        <option value={3}>Floor 3</option>
        <option value={4}>Floor 4</option>
        <option value={5}>Floor 5</option>
        <option value={6}>Floor 6</option>
        <option value={7}>Floor 7</option>
        <option value={8}>Floor 8</option>
        <option value={9}>Floor 9</option>
      </select>
      <div className="flex">
        <button
          onClick={call}
          className="rounded-full h-24 w-24 border-4 border-white flex justify-center items-center mr-16"
        >
          <i style={{ fontSize: "3rem" }} className="im im-care-up mb-2"></i>
        </button>
        <button
          onClick={call}
          className="rounded-full h-24 w-24 border-4 border-white flex justify-center items-center"
        >
          <i style={{ fontSize: "3rem" }} className="im im-care-down mt-2"></i>
        </button>
      </div>
      <div className="border-l border-gray-700">
        <button
          onClick={addPerson}
          className="mx-2 text-9xl hover:text-gray-200"
        >
          +
        </button>{" "}
        <button
          onClick={removePerson}
          className="mx-2 text-9xl hover:text-gray-200"
        >
          -
        </button>
      </div>
    </div>
  );
}
