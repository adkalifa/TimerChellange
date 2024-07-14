import React, { useRef, useState } from "react";
import DialogModal from "./Dialog";

export default function Card({ title, timer }) {
  const [isActiveTimer, setRunningTimer] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timer * 1000);
  const currentCard = useRef(null);
  const modalRef = useRef(null);

  const currentTimer = timer * 1000;

  const handleChallenge = () => {
    const startTime = Date.now();
    currentCard.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newRemainingTime = currentTimer - elapsedTime;

      if (newRemainingTime <= 0) {
        setRunningTimer(false);
        clearInterval(currentCard.current);
        setRemainingTime(0);
        if (modalRef.current) {
          modalRef.current.open();
        }
      } else {
        setRemainingTime(newRemainingTime);
      }
    }, 100);

    setRunningTimer(true);
  };

  const handleReset = () => {
    setRemainingTime(timer * 1000);
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handleStopChallenge = () => {
    setRunningTimer(false);
    clearInterval(currentCard.current);
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  return (
    <>
      <DialogModal
        timer={currentTimer}
        remainingTime={remainingTime}
        ref={modalRef}
        onReset={handleReset}
      />
      <div className="p-5 items-center justify-center font-serif flex rounded-lg bg-green-400 gap-4 flex-col">
        <h2 className="text-xl text-black font-bold">{title}</h2>
        <small className="block text-sm font-normal">{timer} Second</small>
        <button
          className="bg-black text-white text-base px-2 py-2.5 rounded-lg"
          onClick={isActiveTimer ? handleStopChallenge : handleChallenge}
        >
          {isActiveTimer ? "Stop Challenge" : "Start Challenge"}
        </button>
        <h6 className="text-sm font-normal">
          {isActiveTimer ? "Time is Active" : "Time is Inactive"}
        </h6>
      </div>
    </>
  );
}
