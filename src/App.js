import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from 'components/sidebar/Sidebar';
import OfficeInfo from 'components/officeInfo/OfficeInfo';
import OfficeBooking from 'pages/booking/officeBooking/OfficeBooking'
import SelectOffice from 'pages/booking/selectOffice/SelectOffice';



function App() {

  const SidebarLayout = () => (
    <>
      <Sidebar />
      <Outlet />
    </>
  );

  return (
    // <div className="App">
    //   {/* <Routes>
    //     <Route element={<SidebarLayout />}>
    //       <Route path="/SelectOffice" element={<SelectOffice />} />
    //     </Route>
    //   </Routes> */}
    // </div>
    <OfficeInfo/>
  );
}

export default App;
