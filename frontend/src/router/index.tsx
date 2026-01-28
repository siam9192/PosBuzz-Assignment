import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import MainPage from "../pages/MainPage";
import MainLayout from "../components/MainLayout";
export default function Router () {
 return (
 <Routes>
   <Route path="/"  element={<MainLayout/>}>
    <Route index element={<MainPage/>}/>
  </Route>
   <Route path="/login" element={<LoginPage/>}/>
   <Route path="/register" element={<RegistrationPage/>}/>
 </Routes>
)
}