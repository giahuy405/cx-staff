import { https } from '../axiosHttp'
export const getXacNhanDocTin = async ({ tk, mk }) => https.get(`danhmuchopdong.asp?tk=${tk}&mk=${mk}`).then((res) => res.data);