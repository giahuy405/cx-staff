import { https } from '../axiosHttp'
export const getDanhMucHopDong = async ({ tk, mk, pageid }) => https.get(`danhmuchopdong.asp?tk=${tk}&mk=${mk}&pageid=${pageid}`).then((res) => res.data);

export const getMaTinhTrangHoSo = async ({ tk, mk, pageid }) => https.get(`matinhtranghs.asp?tk=huypham&mk=e87cbf3ec7528de78fd28327c5cdfd6e`).then((res) => res.data);
export const getMaKhachHang = async ({ tk, mk, id }) => https.get(`matinhtranghs.asp?tk=huypham&mk=e87cbf3ec7528de78fd28327c5cdfd6e&id=${id}`).then((res) => res.data);

