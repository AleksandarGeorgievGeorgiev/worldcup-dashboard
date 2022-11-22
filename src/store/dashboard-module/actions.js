import axios from "axios";
import { API_URL } from "src/common/config";
import { SetStandings } from "./mutations";

export function Register() {
  axios.defaults.headers = { "Access-Control-Allow-Headers": "*" };


  axios.post(`/api/v1/user`, {
    "name": "Aleksandar",
    "email": "alekvd77@gmail.com",
    "password": "FuckYou0225",
    "passwordConfirm": "FuckYou0225"
  }).then((response) => {
    console.log("token", response, JSON.stringify(response.data.token))
    localStorage.setItem("token", JSON.stringify(response.data.token))
  })
}

export function Login() {
  axios.defaults.headers = { "Access-Control-Allow-Headers": "*" };


  axios.post(`/api/v1/user/login`, {
    "email": "alekvd77@gmail.com",
    "password": "FuckYou0225",
  }).then((response) => {
    console.log("token", response, JSON.stringify(response.data.token))
    localStorage.setItem("token", (response.data.data.token))
  })
}

export function GetStandings() {
  axios.defaults.headers = { "Access-Control-Allow-Headers": "*", "Authorization": `Bearer ${localStorage.getItem("token")}` };

  axios.get(`/api/v1/standings`).then((response) => {
    console.log("standings", response)
    SetStandings(response)
  })
}
