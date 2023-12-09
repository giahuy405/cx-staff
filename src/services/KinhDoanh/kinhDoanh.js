import { https } from '../axiosHttp'
export const getKhachHangList = async ({ tk, mk }) => https.get(`khachhang.asp?tk=${tk}&mk=${mk}`).then((res) => res.data);

