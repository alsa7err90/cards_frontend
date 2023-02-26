import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://smart.cvabd.com/api/`,
  headers: { 
    "Content-Type": "application/json",
  },
});

const token = JSON.parse(window.localStorage.getItem("token"));
console.log('token',token);
const axiosClientAuth = axios.create({
  baseURL: `https://smart.cvabd.com/api/`,
  
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: 'Bearer '+token,
  },
});

export { axiosClient, axiosClientAuth };
