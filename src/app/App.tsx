import { ThemeProvider } from "@mui/material";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import myTheme from "../utils/theme/theme";
import "./App.scss";
import { HelmetProvider } from "react-helmet-async";
import MainLayout from "../layout/main_layout/MainLayout";
import Login from "../components/auth/Login";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import { useEffect, useState } from "react";
import EmailSent from "../components/auth/EmailSent";
import Signup from "../components/auth/Signup";
import axios from "axios";
import Chatbot from "../components/Chatbot/Chatbot";

function App() {
  const token = useSelector((state: any) => state?.auth?.token) || localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      setIsLoggedIn(true);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setIsLoggedIn(false);
    }
  }, [token]);

  return (
    <HelmetProvider>
      <ThemeProvider theme={myTheme}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/admin/signup" element={isLoggedIn ? <Navigate to="/" replace /> : <Signup />} />
            <Route path="forgot-password" element={isLoggedIn ? <Navigate to="/" replace /> : <ForgotPassword />} />
            <Route path="reset-password/:token" element={isLoggedIn ? <Navigate to="/" replace /> : <ResetPassword />} />
            <Route path="email-sent" element={isLoggedIn ? <Navigate to="/" replace /> : <EmailSent />} />

            {/* Private Routes */}
            <Route path="/" element={isLoggedIn ? <MainLayout /> : <Navigate to="/login" replace />} >
              <Route index element={<Chatbot />} />
              <Route path="c/:chat_id" element={<Chatbot />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
