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
import ResourceManageDetail from 'pages/manager/resourceManage/ResourceManageDetail';
import OfficeManageDetail from 'pages/manager/officeManage/OfficeBookingManageDetail';

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
          <Route path="/my/bookings/offices" element={<BookedList title="회의실 예약 내역" />} />
          <Route path="/my/bookings/offices/:bookingId" element={<OfficeBookingCheck isAdmin={false} />} />
          <Route path='/my/bookings/resources/:bookingId' element={<ResourceBookingCheck />} />
          <Route path='/resourceBooking' element={<SelectResource title="장비 예약" />} />
          <Route path='/resourceBooking/:resourceId' element={<ResourceBooking />} />
          <Route path='/admin/offices' element={<OfficeManage title="회의실 관리" />} />
          <Route path='/admin/offices/:officeId' element={<OfficeManageDetail />} />
          <Route path='/admin/officeBooking' element={<OfficeBookingManage title="회의실 예약 내역" />} />
          <Route path='/admin/officeBooking/:bookingId' element={<OfficeBookingCheck isAdmin={true} />} />
          <Route path='/admin/resources' element={<ResourceManage title="장비 관리" />} />
          <Route path='/admin/resources/add' element={<ResourceManageAdd title="장비 관리" />} />
          <Route path='/admin/resources/edit/:resourceId' element={<ResourceManageAdd title="장비 관리" />} />
          <Route path='/admin/resources/:resourceId' element={<ResourceManageDetail/>} />
          <Route path='/admin/resourceBooking' element={<ResourceBookingManage title="장비 예약 관리" />} />
          <Route path='/admin/resourceBooking/:bookingId' element={<ResourceBookingCheck isAdmin={true} />} />
          <Route path='/admin/users' element={<UserManage title="직원 관리" />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
