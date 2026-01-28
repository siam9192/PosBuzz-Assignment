import { useEffect, useRef, useState } from "react";

function useLoadingBouncer(loading: boolean, delay = 200) {
  const [visible, setVisible] = useState(loading);
  const timerRef = useRef<any | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [loading, delay]);

  return visible;
}

export default useLoadingBouncer;
