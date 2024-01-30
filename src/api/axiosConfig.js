import axios from "axios";

export default axios.create({
    baseURL: `https://movie-app-backend-production-5f56.up.railway.app/`,
    // headers : {"ngrok-skip-browser-warning" : "true"}
});