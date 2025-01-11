import { useEffect, useCallback } from "react";

const useOutsideClick = (ref, callback) => {
  const handleClick = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  }, [ref, callback]);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);
};

export default useOutsideClick;
