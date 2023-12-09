export const TabTatCa = () => {

    return <>
        <form className='canhan-search'>
            <div className="input-wrapper">
                <input className="input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="text" placeholder=" " data-placeholder="E-mail" required />
                <span className="placeholder">Nhập từ khóa cần tìm</span>
            </div>
        </form>
        <br />
    </>
}