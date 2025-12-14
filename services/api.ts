import axios from "axios";
//npm install axios


export const api = axios.create({
  baseURL: "http://localhost:8080/task",
  timeout: 5000
});