import { NavLink } from 'react-router-dom'

export default function TabKinhDoanh() {
    return (
        <ul className='my-tabs'>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/khachhang/quanlykhachhang.asp'>Quản lý</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/khachhang/congtacvien.asp'>Cộng tác viên</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/khachhang/quanlynhomkhachhang.asp'>Nhóm</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/khachhang/quanlyimportkhachhang.asp'>Import</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/khachhang/mergekhachhang.asp'>Merge</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/ketoan/theodoicongno.asp'>Công nợ</NavLink>
            </li>
        </ul>
    )
}
