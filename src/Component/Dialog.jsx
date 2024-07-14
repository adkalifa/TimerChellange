import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

const DialogModal = forwardRef(function DialogModal(
  { timer, remainingTime, onReset },
  ref
) {
  const dialogRef = useRef(null);
  const targetTime = (timer / 1000).toFixed(2);
  const score = (remainingTime / 1000).toFixed(2);

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current.showModal();
    },
    close() {
      dialogRef.current.close();
    },
  }));

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && dialogRef.current) {
        dialogRef.current.close();
      }
    };

    if (dialogRef.current) {
      dialogRef.current.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (dialogRef.current) {
        dialogRef.current.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="p-5 rounded-lg font-serif text-black flex flex-col gap-5"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      onClose={onReset}
    >
      <h1 id="dialog-title" className="text-xl font-bold">
        You Lost
      </h1>
      <p id="dialog-description" className="text-sm font-normal">
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p className="font-normal text-sm">
        You stopped the timer with <strong>{score} seconds left.</strong>
      </p>
      <form
        method="dialog"
        className="flex items-end justify-center"
        onSubmit={onReset}
      >
        <button
          className="px-4 py-2.5 text-base font-bold border border-green-400 rounded-lg"
          type="submit"
        >
          Close
        </button>
      </form>
    </dialog>,
    document.querySelector("body")
  );
});
export default DialogModal;
