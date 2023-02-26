import { axiosClient, axiosClientAuth } from "./base";

export function getProfile() {
  return axiosClientAuth.post("page/profile");
}
 
export function updateProfile(data) {
  return axiosClientAuth.post("/profile/update",data);
} 
export function updatePassword(data) {
  return axiosClientAuth.post("profile/update",data);
} 

export function login(data) {
  return axiosClient.post("login",data);
}

export function addToFavorite(id) {
  return axiosClientAuth.post("add_to_favorite/"+id);
} 

export function getWallet(id=1) {
  return axiosClientAuth.post("page/wallet?page="+id);
} 

export function getOrders(id=1) {
  return axiosClientAuth.post("page/orders?page="+id);
} 
export function getFvorite() {
  return axiosClientAuth.post("page/favorite");
} 

export function getDeposit() {
  return axiosClientAuth.post("page/deposit");
} 

 
