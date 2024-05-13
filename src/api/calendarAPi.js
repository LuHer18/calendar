import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";


const {VITE_API_URL} = getEnvVariables();


export const calendarAPi = axios.create({
    baseURL: VITE_API_URL
}) 

//Todo: configurar interceptores


export default calendarAPi;