import { NavLink } from 'react-router-dom'

export default function TabQuanLyHoSo() {
    return (
        <ul className='my-tabs'>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/hopdong/quanlyhoso.asp'>Hồ sơ</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/khachhang/congtacvien.asp'>Hợp đồng</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/khachhang/quanlynhomkhachhang.asp'>Bán trực tiếp</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/khachhang/quanlyimportkhachhang.asp'>Đặt hàng</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/khachhang/mergekhachhang.asp'>Liên hệ</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/ketoan/theodoicongno.asp'>Log hồ sơ</NavLink>
            </li>
        </ul>
    )
}
