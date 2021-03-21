import {useContext} from 'react';
import {AuthContext} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";

export const useAuthentication = () => {
  const auth = useContext(AuthContext)

  return useAuthState(auth)
};