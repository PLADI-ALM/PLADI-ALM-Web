import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import styled  from 'styled-components';
import Sidebar from 'components/sidebar/Sidebar';
import MainPage from 'pages/main/MainPage';


export const Container = styled.div`
  width: 100%;
  height: 1080px;
  display: flex;
`




function App() {
  return (
    <Container>
      <Sidebar/>
      <MainPage title="회의실 예약"/>
    </Container>
  );
}

export default App;
