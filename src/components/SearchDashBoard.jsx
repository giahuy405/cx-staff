import { useToggleSideBar } from '../zustand/toggleSidebar'
import { FaBars } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";


export default function SearchDashBoard() {
  const { setCollapsed } = useToggleSideBar()
  return (
    <div className='search-bar'>
      <div className="sb-button" onClick={setCollapsed}>
        <FaBars />
      </div>
      {/* <input type="text" placeholder='Nhập từ khóa cần tìm' />
       */}
      <form className='form-searchbar'>
        <div className="input-wrapper">
          <input className="input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="text" placeholder=" " data-placeholder="E-mail" required />
          <span className="placeholder">Nhập từ khóa cần tìm</span>
        </div>
        <button>
          <IoSearch />
        </button>
      </form>

    </div>
  )
}
