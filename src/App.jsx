import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./routing/ProtectedRoute";
import AuthContextProvider from "./contexts/AuthContext";
import DashBoard from "./components/DashBoard";
import Login from "./layout/Login";
import CaNhan from "./pages/BanLamViec/CaNhan";
import KiemDuyet from "./pages/BanLamViec/KiemDuyet";
import QuanLy from "./pages/BanLamViec/QuanLy";
import YeuCauDangXuLy from "./pages/BanLamViec/YeuCauDangXuLy";
import QuanLyKhachHang from "./pages/KinhDoanh/QuanLyKhachHang";
import CongTacVien from "./pages/KinhDoanh/CongTacVien";
import QuanLyNhomKhachHang from "./pages/KinhDoanh/QuanLyNhomKhachHang";
import QLimportKhachHang from "./pages/KinhDoanh/QLimportKhachHang";
import MergeKhachHang from "./pages/KinhDoanh/MergeKhachHang";
import TheoDoiCongNo from "./pages/KinhDoanh/TheoDoiCongNo";
import QuanLyHoSo from "./pages/KinhDoanh/QuanLyHoSo";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/staff/login" element={<Login />} />
          <Route path="/staff" element={<ProtectedRoute component={DashBoard} />} />
          <Route path="/staff/dashboard-1.asp" element={<ProtectedRoute component={CaNhan} />} />
          <Route path="/staff/dashboard-2.asp" element={<ProtectedRoute component={QuanLy} />} />
          <Route path="/staff/dashboard-3.asp" element={<ProtectedRoute component={KiemDuyet} />} />
          <Route path="/staff/yeucau/xemyeucau.asp" element={<ProtectedRoute component={YeuCauDangXuLy} />} />
          <Route path="/staff/khachhang/quanlykhachhang.asp" element={<ProtectedRoute component={QuanLyKhachHang} />} />
          <Route path="/staff/khachhang/congtacvien.asp" element={<ProtectedRoute component={CongTacVien} />} />
          <Route path="/staff/khachhang/quanlynhomkhachhang.asp" element={<ProtectedRoute component={QuanLyNhomKhachHang} />} />
          <Route path="/staff/khachhang/quanlyimportkhachhang.asp" element={<ProtectedRoute component={QLimportKhachHang} />} />
          <Route path="/staff/khachhang/mergekhachhang.asp" element={<ProtectedRoute component={MergeKhachHang} />} />
          <Route path="/staff/ketoan/theodoicongno.asp" element={<ProtectedRoute component={TheoDoiCongNo} />} />
          <Route path="/staff/hopdong/quanlyhoso.asp" element={<ProtectedRoute component={QuanLyHoSo} />} />
          {/* <Route path="" element={<DashBoard />} /> */}
          <Route path="/staff/login" element={<Navigate to={'/staff/login'} />} />

        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
