import { useState, useRef, useEffect, useCallback } from "react";
import { getNextState } from "./getNextState";
type SetStateAction<S> = (
  prevState: S | ((prevState: S) => S | Promise<S>)
) => Promise<S>;
type AsyncAction<S> = (value: S) => Promise<S>;

export default function useAsyncState<S>(init: S | (() => S)): [S, SetStateAction<S>] {
  const [state, setState] = useState<S>(init);

  const list = useRef<Array<(state: S) => void>>([]);

  useEffect(() => {
    list.current.forEach((v) => v(state));
    list.current = [];
  }, [state]);

  const action: AsyncAction<S> = useCallback(
    (nextState: S) => {
      return new Promise<S>((resolve) => {
        setState((prevState) => {
          // const nextState = value instanceof Function ? value(prevState) : value;

          if (nextState === prevState) {
            resolve(nextState);
          } else {
            list.current.push(resolve);
          }

          return nextState;
        });
      });
    },
    [setState]
  );

  const asyncSetState: SetStateAction<S> = useCallback(
    async (value: S | ((prevState: S) => S | Promise<S>)) => {
      const preState = await getNextState(setState);
      const nextState =
        value instanceof Function ? await value(preState) : value;
      return action(nextState);
    },
    []
  );

  return [state, asyncSetState];
}
