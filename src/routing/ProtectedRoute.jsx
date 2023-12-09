import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import SideBar from "../layout/SideBar"
import SearchDashBoard from "../components/SearchDashBoard"

const ProtectedRoute = ({ component: Component }) => {
    const { authState: { isAuthenticated } } = useContext(AuthContext)
    return isAuthenticated ?
        <div className="wrap-sidebar">
            <SideBar />
            <div className='main-board'>
                <SearchDashBoard />
                <div className="dashboard-content">
                    <Component />
                </div>
            </div>
        </div> : <Navigate to={'/login'} />
}

export default ProtectedRoute
