import { axiosClient, axiosClientAuth } from "./base";

export function homepage() {
  return axiosClientAuth.post("page/home");
}
 
export function updateProfile(data) {
  return axiosClientAuth.post("profile",data);
} 
export function updatePassword(data) {
  return axiosClientAuth.post("profile/update",data);
} 

export function login(data) {
  return axiosClient.post("login",data);
}

export function getNoty() {
  return axiosClientAuth.post("get_ll_notifition");
}
