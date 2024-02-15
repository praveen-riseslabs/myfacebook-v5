import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useThunk(thunk) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRan, setIsRan] = useState(false);
  const [options, setOptions] = useState({duration: 0 });
  const dispatch = useDispatch();

  //emptying the error & stop loading immediately
  const reset = () => {
    setLoading(false);
    setError(null);
    setIsRan(false);
  };

  //reseting the is ran state
  const resetIsRan = () => {
    setIsRan(false);
  };

  const runThunk = useCallback(
    async (arg, optns) => {
      setOptions({...options, ...optns});
      try {
        setLoading(true);
        await dispatch(thunk(arg)).unwrap();
        setIsRan(true);
      } catch (err) {
        setError(err.message);
        setIsRan(false);
      } finally {
        setLoading(false);
      }
    },
    [thunk, dispatch, options]
  );

  useEffect(() => {
    if (!error || !options.duration) return;

    let timer = setTimeout(reset, options.duration * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [error, options.duration]);

  return [runThunk, loading, error, reset, isRan, resetIsRan];
}

export { useThunk };
