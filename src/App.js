import 'App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from 'components/sidebar/Sidebar';
import SelectOffice from 'pages/booking/selectOffice/SelectOffice';
import BookedList from 'pages/booking/bookedList/BookedList';
import MainPage from 'pages/main/MainPage';
import OfficeBooking from 'pages/booking/officeBooking/OfficeBooking';
import SelectResource from 'pages/booking/selectResource/SelectResource';
import ResourceBooking from 'pages/booking/resourceBooking/ResourceBooking';

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
          <Route path="/officeBooking" element={<SelectOffice title="회의실 예약" />} />
          <Route path="/officeBooking/:officeId" element={<OfficeBooking isCheck='false'/>} /> 
          <Route path="/bookings" element={<BookedList title="예약 내역" />} />
          <Route path="/bookings/offices/:bookingId" element={<OfficeBooking isCheck='true'/>} /> 
          <Route path='/bookings/resources/:bookingId' element={<ResourceBooking isCheck='true' />} />
          <Route path='/resourceBooking' element={<SelectResource title="자원 예약" />} />
          <Route path='/resourceBooking/:resourceId' element={<ResourceBooking/>} />
          {/* 나중에 요런식으로 활용하기 */}
          {/* <Route path="/reportManage/:recipeReportIdx" element={<ReportManageDetail />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
