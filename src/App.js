import 'App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from 'components/sidebar/Sidebar';
import SelectOffice from 'pages/booking/selectOffice/SelectOffice';
import BookedList from 'pages/booking/bookedList/BookedList';
import MainPage from 'pages/main/MainPage';
import SelectResource from 'pages/booking/selectResource/SelectResource';

function App() {

  const SidebarLayout = () => (
    <>
      <Sidebar />
      <Outlet />
    </>
  );

  return (
    <div className="App">
      <Routes>
        {/* 나중에 로그인 화면 생기면 활용하기 */}
        {/* <Route path="/" element={<Login />} /> */}
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<SelectOffice title="회의실 예약" />} />
          <Route path="/officeBooking" element={<SelectOffice title="회의실 예약" />} />
          <Route path="/bookings" element={<BookedList title="예약 내역" />} />
          <Route path='/resourceBooking' element={<SelectResource title="자원 예약" />} />
          {/* 나중에 요런식으로 활용하기 */}
          {/* <Route path="/reportManage/:recipeReportIdx" element={<ReportManageDetail />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
