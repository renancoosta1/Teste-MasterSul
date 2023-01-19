import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    params: {},
})

export default instance;