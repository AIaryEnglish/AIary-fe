import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/LandingPage/LandingPage";
import Login from "../pages/LoginPage/LoginPage";
import Register from "../pages/RegisterPage/RegisterPage";
import Daily from "../pages/DailyPage/DailyPage";
import Vocab from "../pages/VocabPage/VocabPage";
import PrivateRoute from "./PrivateRoute";
import Header from "../common/components/Header/Header";

const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 인증이 필요한 라우트들 */}
        <Route element={<PrivateRoute />}>
          <Route path="/vocab" element={<Vocab />} />
          <Route path="/daily" element={<Daily />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
