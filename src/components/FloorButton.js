import React from "react";

export default function FloorButton(props) {
  const { active, number, addrequest } = props;
  return (
    <button
      onClick={() => {
        addrequest(number);
      }}
      style={{
        borderColor: active ? "#FF3300" : "white",
        color: active ? "#FF3300" : "white",
      }}
      className="rounded-full text-6xl h-24 w-24 border-4 flex justify-center items-center my-2 mx-6"
    >
      {number}
    </button>
  );
}
