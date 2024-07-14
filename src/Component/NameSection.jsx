import React from "react";
import { useRef, useState } from "react";

export default function NameSection() {
  const refName = useRef();
  const [name, setName] = useState("");
  const handleSubmit = () => {
    const currentName = refName.current?.value;
    setName(currentName);
  };
  return (
    <div className="flex items-center gap-4 justify-center p-14 text-center  max-w-96 mx-auto flex-col text-white bg-black/80">
      <h1>The Almost final countdown</h1>
      <p>Stop you timer once you estimate that time is (almost) up</p>
      <h5>Welcome {name ? name : "Unknown"} entity</h5>
      <input
        placeholder="Enter the name"
        className="px-4 py-2.5 rounded-lg text-black"
        ref={refName}
      />
      <button
        className="bg-slate-400 text-black px-4 py-2 rounded-lg border-0"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
