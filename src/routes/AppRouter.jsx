import { Navigate, Route, Routes } from "react-router-dom"
import Landing from "../pages/LandingPage"
import Login from "../pages/LoginPage"
import Register from "../pages/RegisterPage"
import Daily from "../pages/DailyPage"
import Vocab from "../pages/VocabPage"
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route element={<PrivateRoute/>}>
                <Route path="/daily" element={<Daily/>}/>
                <Route path="/vocab" element={<Vocab/>}/> 
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default AppRouter;