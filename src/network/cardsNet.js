import axios from "axios";
import { axiosClient, axiosClientAuth } from "./base";

 


export function getCard(id) {
  return axiosClientAuth.post("card/"+id  );
}
export function getBouquets(id) {
  return axiosClientAuth.post("bouquets/"+id  );
}
export function buyItem(data) {
  return axiosClientAuth.post("new_order", data );
}

export function searchApi(data) {
  return axiosClientAuth.post("search", data );
}

export function searchOrders(data) {
  return axiosClientAuth.post("search_orders" ,data );
}

export function depositNow(data) {
  return axiosClientAuth.post("add_deposit", data );
}

export function getMyTickets() {
  return axiosClientAuth.get("my_tickets");
} 

export function showTickets(id) {
  return axiosClientAuth.get("tickets/"+id);
} 

export function newTicket(data) {
  return axiosClientAuth.post("new_ticket", data );
}

export function setCommend(data) {
  return axiosClientAuth.post("comment", data );
}


