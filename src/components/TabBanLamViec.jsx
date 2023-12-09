import { NavLink } from 'react-router-dom'

export default function TabBanLamViec() {
    return (
        <ul className='my-tabs'>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/dashboard-1.asp'>Làm việc</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/dashboard-2.asp'>Quản lý</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/staff/dashboard-3.asp'>Kiểm duyệt</NavLink>
            </li>
        </ul>
    )
}
