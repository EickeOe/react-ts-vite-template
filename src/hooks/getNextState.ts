import { Dispatch, SetStateAction } from "react";

export const getNextState = <S>(setState: Dispatch<SetStateAction<S>>) => {
  return new Promise<S>((resolve) => {
    setState((preState) => {
      resolve(preState);
      return preState;
    });
  });
};
