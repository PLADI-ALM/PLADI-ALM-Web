import 'App.css';
import {Outlet, Route, Routes} from 'react-router-dom';
import Sidebar from 'components/sidebar/Sidebar';
import Login from 'pages/user/Login';
import SelectOffice from 'pages/booking/selectOffice/SelectOffice';
import BookedList from 'pages/booking/bookedList/BookedList';
import OfficeBooking from 'pages/booking/officeBooking/OfficeBooking';
import SelectResource from 'pages/booking/selectResource/SelectResource';
import ResourceBooking from 'pages/booking/resourceBooking/ResourceBooking';
import OfficeManage from 'pages/manager/officeManage/OfficeManage';
import OfficeBookingCheck from 'pages/booking/officeBooking/OfficeBookingCheck';
import ResourceBookingManage from 'pages/manager/resourceBookingManage/ResourceBookingManage';
import ResourceBookingCheck from 'pages/booking/resourceBooking/ResourceBookingCheck'
import OfficeBookingManage from 'pages/manager/officeBookingManage/OfficeBookingManage';
import UserManage from 'pages/manager/userManage/UserManage';
import ResourceManage from 'pages/manager/resourceManage/ResourceManage';
import ResourceManageAdd from "./pages/manager/resourceManage/ResourceManageAdd";

function App() {

  const SidebarLayout = () => (
    <>
      <Sidebar />
      <Outlet />
    </>
  )

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<SidebarLayout />}>
          <Route path="/officeBooking" element={<SelectOffice title="회의실 예약" />} />
          <Route path="/officeBooking/:officeId" element={<OfficeBooking isCheck='false' />} />
          <Route path="/bookings" element={<BookedList title="예약 내역" />} />
          <Route path="/bookings/offices/:bookingId" element={<OfficeBookingCheck isAdmin={false} />} />
          <Route path='/bookings/resources/:bookingId' element={<ResourceBookingCheck />} />
          <Route path='/resourceBooking' element={<SelectResource title="자원 예약" />} />
          <Route path='/resourceBooking/:resourceId' element={<ResourceBooking />} />
          <Route path='/manage/offices' element={<OfficeManage title="회의실 관리" />} />
          <Route path='/manage/officeBooking' element={<OfficeBookingManage title="회의실 예약 내역" />} />
          <Route path='/manage/officeBooking/:bookingId' element={<OfficeBookingCheck isAdmin={true} />} />
          <Route path='/manage/resources' element={<ResourceManage title="자원 관리" />} />
          <Route path='/manage/resources/add' element={<ResourceManageAdd title="자원 관리" />} />
          <Route path='/manage/resourceBooking' element={<ResourceBookingManage title="자원 예약 관리" />} />
          <Route path='/manage/resourceBooking/:bookingId' element={<ResourceBookingCheck isAdmin={true} />} />
          <Route path='/manage/users' element={<UserManage title="직원 관리" />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
