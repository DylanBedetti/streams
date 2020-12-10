import { SIGN_IN, SIGN_OUT } from "./types";

export const signIn = (userId, email) => {
  return {
    type: SIGN_IN,
    payload: { userId, email },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
