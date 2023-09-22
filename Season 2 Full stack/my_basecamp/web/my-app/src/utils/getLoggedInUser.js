import { getCookie } from "./getCookie";
import jwtdecode from "jwt-decode";

export const getLoggedInUser = () => {
    //retrive the looged in user from token
  const token = getCookie("token");

  if(!token) {
    window.location.replace("/signin")
  }
  const loggedInUser =  jwtdecode(token)
  return loggedInUser
};