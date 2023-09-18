import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from 'components/sidebar/Sidebar';
import OfficeBooking from 'pages/booking/officeBooking/OfficeBooking'

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
        <Route element={<SidebarLayout />}>
          <Route path="/officeBooking" element={<OfficeBooking />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
