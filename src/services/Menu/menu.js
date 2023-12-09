import { https } from '../axiosHttp'
export const getMenu = async ({ tk, mk }) => https.get(`menu.asp?tk=${tk}&mk=${mk}`).then((res) => res.data);