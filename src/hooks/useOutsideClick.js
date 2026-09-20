import { useEffect, useRef } from "react";

const useOutsideClick = (onOutsideClick) => {
  const ref = useRef(null);
  const handlerRef = useRef(onOutsideClick);

  useEffect(() => {
    handlerRef.current = onOutsideClick;
  }, [onOutsideClick]);

  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handlerRef.current(event);
      }
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, []);

  return ref;
};

export default useOutsideClick;
