import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import Register from './pages/Register';
import SelectMode from './pages/SelectMode';
import Coupen from './pages/Coupen';
import Scane from './pages/Scanner';
import Info from './pages/Info';
import Login from './pages/Login';
import Loading from './components/loading';
import ResetPassword from './pages/ResetPassword';
import EditProfile from './pages/EditProfile';
import VerifyCode from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ScannerInfo from './pages/ScannerInfo';

const LOADING_TIMES = {
  '/': 300,
  '/register': 1000,
  'login': 1000,
  '/select-mode': 400,
  '/coupen-detail': 300,
  '/qr-code-scanner': 300,
  '/detail': 2000,
  '/qr-scanner': 2000,

};

const SHOW_LOADER = {
  '/': false,
  '/register': false,
  'login': false,
  '/select-mode': false,
  '/coupen-detail': false,
  '/qr-code-scanner': false,
  '/detail': true,
  '/qr-scanner': false,

};

function AppWrapper() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (SHOW_LOADER[location.pathname]) {
      setIsLoading(true);
      const loadingTime = LOADING_TIMES[location.pathname] || 300;
      const timer = setTimeout(() => setIsLoading(false), loadingTime);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [location.pathname]);

  return (
    <>
      {isLoading && <Loading />}
      <Routes location={location}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/select-mode" element={<SelectMode />} />
        <Route path="/coupen-detail" element={<Coupen />} />
        <Route path="/qr-code-scanner" element={<Scane />} />
        <Route path="/detail" element={<Info />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path='/verify-email' element={<VerifyCode></VerifyCode>} />
        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>} />
        <Route path='/scanner-info' element={<ScannerInfo></ScannerInfo>} />

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
