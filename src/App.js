import 'App.css';
import {Outlet, Route, Routes} from 'react-router-dom';
import Sidebar from 'components/sidebar/Sidebar';
import Login from 'pages/basic/user/Login';
import EmailCheck from 'pages/basic/user/EmailCheck';
import ResetPassword from 'pages/basic/user/ResetPassword';
import SelectOffice from 'pages/basic/booking/office/SelectOffice';
import BookedList from 'pages/basic/myBookings/BookedList';
import OfficeBooking from 'pages/basic/booking/office/OfficeBooking';
import SelectResource from 'pages/basic/booking/resource/SelectResource';
import ResourceBooking from 'pages/basic/booking/resource/ResourceBooking';
import OfficeManage from 'pages/admin/office/OfficeManage';
import OfficeBookingCheck from 'pages/basic/booking/office/OfficeBookingCheck';
import ResourceBookingManage from 'pages/admin/resourceBookings/ResourceBookingManage';
import ResourceBookingCheck from 'pages/basic/booking/resource/ResourceBookingCheck'
import OfficeBookingManage from 'pages/admin/officeBookings/OfficeBookingManage';
import UserManage from 'pages/admin/user/UserManage';
import ResourceManage from 'pages/admin/resource/ResourceManage';
import ResourceManageAdd from "./pages/admin/resource/ResourceManageAdd";
import ResourceManageDetail from 'pages/admin/resource/ResourceManageDetail';
import OfficeManageDetail from 'pages/admin/office/OfficeManageDetail';
import SelectCar from "./pages/basic/booking/car/SelectCar";
import CarBooking from "./pages/basic/booking/car/CarBooking";
import CarBookingCheck from "./pages/basic/booking/car/CarBookingCheck";
import CarManage from "./pages/admin/car/CarManage";
import CarBookingManage from "./pages/admin/carBookings/CarBookingManage";
import CarManageAdd from "./pages/admin/car/CarManageAdd";
import CarManageDetail from "./pages/admin/car/CarManageDetail";
import OfficeManageAdd from "./pages/admin/office/OfficeManageAdd";
import EquipmentList from "./pages/basic/equipment/EquipmentList";
import EquipmentAdd from "./pages/basic/equipment/EquipmentAdd";

function App() {

    const SidebarLayout = () => (
        <>
            <Sidebar/>
            <Outlet/>
        </>
    )

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/email" element={<EmailCheck />} />
                <Route path="/resetPW" element={<ResetPassword />} />
                <Route element={<SidebarLayout />}>
                    <Route path="/officeBooking" element={<SelectOffice/>} />
                    <Route path="/officeBooking/:officeId" element={<OfficeBooking />} />
                    <Route path='/resourceBooking' element={<SelectResource />} />
                    <Route path='/resourceBooking/:resourceId' element={<ResourceBooking />} />
                    <Route path='/carBooking' element={<SelectCar />} />
                    <Route path='/carBooking/:carId' element={<CarBooking />} />
                    <Route path="/my/bookings/offices" element={<BookedList title="회의실 예약 내역" type={"offices"} />} />
                    <Route path="/my/bookings/offices/:bookingId" element={<OfficeBookingCheck isAdmin={false} />} />
                    <Route path="/my/bookings/resources" element={<BookedList title="장비 예약 내역" type={"resources"} />} />
                    <Route path='/my/bookings/resources/:bookingId' element={<ResourceBookingCheck />} />
                    <Route path="/my/bookings/cars" element={<BookedList title="차량 예약 내역" type={"cars"} />} />
                    <Route path='/my/bookings/cars/:bookingId' element={<CarBookingCheck />} />
                    <Route path='/equipments' element={<EquipmentList />} />
                    <Route path='/equipments/add' element={<EquipmentAdd />} />
                    <Route path='/equipments/:equipmentId/edit' element={<EquipmentAdd />} />
                    <Route path='/admin/offices' element={<OfficeManage />} />
                    <Route path='/admin/offices/add' element={<OfficeManageAdd />} />
                    <Route path='/admin/offices/:officeId/edit' element={<OfficeManageAdd />} />
                    <Route path='/admin/offices/:officeId' element={<OfficeManageDetail />} />
                    <Route path='/admin/officeBooking' element={<OfficeBookingManage />} />
                    <Route path='/admin/officeBooking/:bookingId' element={<OfficeBookingCheck isAdmin={true} />} />
                    <Route path='/admin/resources' element={<ResourceManage />} />
                    <Route path='/admin/resources/add' element={<ResourceManageAdd />} />
                    <Route path='/admin/resources/edit/:resourceId' element={<ResourceManageAdd />} />
                    <Route path='/admin/resources/:resourceId' element={<ResourceManageDetail/>} />
                    <Route path='/admin/resourceBooking' element={<ResourceBookingManage/>} />
                    <Route path='/admin/resourceBooking/:bookingId' element={<ResourceBookingCheck isAdmin={true} />} />
                    <Route path='/admin/cars' element={<CarManage />} />
                    <Route path='/admin/cars/add' element={<CarManageAdd />} />
                    <Route path='/admin/cars/:carId' element={<CarManageDetail/>} />
                    <Route path='/admin/cars/edit/:carId' element={<CarManageAdd />} />
                    <Route path='/admin/carBooking' element={<CarBookingManage/>} />
                    <Route path='/admin/carBooking/:bookingId' element={<CarBookingCheck isAdmin={true} />} />
                    <Route path='/admin/users' element={<UserManage />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App;
