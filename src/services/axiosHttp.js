import { BASE_URL, MEMBER_URL } from "../utils/constants";
import axios from "axios";


export const https = axios.create({
    baseURL: 'https://choixanh.net/staffapi/',
});
export const httpsMember = axios.create({
    baseURL: MEMBER_URL,
});
