import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    AppContainer,
    Header,
    Title,
    SubContainer,
    AuthButton,
    ProfileCircle,
} from "./App.style";
import MusicManagementPage from "./pages/MusicManagementPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { RootState } from "./store/store";
import Notifications from "@/components/Notifications";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRequest, refreshTokenRequest } from "@/store/slices/authSlice";

const App = () => {
    const theme = useSelector((state: RootState) => state.ui.theme);

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });

        // Apply theme to body
        const isDarkMode = theme === "dark";
        document.body.style.backgroundColor = isDarkMode
            ? "#131314"
            : "#ffffff";
        document.body.style.color = isDarkMode ? "#f1f3f6" : "#111827";
        document.body.style.transition =
            "background-color 0.3s ease, color 0.3s ease";

        document.documentElement.style.backgroundColor = isDarkMode
            ? "#131314"
            : "#ffffff";
        document.documentElement.style.transition =
            "background-color 0.3s ease";
    }, [theme]);

    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutRequest());
        navigate("/login");
    };

    // Refresh Token on App Load
    useEffect(() => {
        dispatch(refreshTokenRequest());
    }, []);

    return (
        <AppContainer>
            <Notifications />
            <Header data-aos="fade-zoom-in">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                    }}
                >
                    <SubContainer>
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <Title>HmmMusic (v.2)</Title>
                        </Link>
                    </SubContainer>

                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "end",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignContent: "center",
                                gap: "1rem",
                                marginLeft: "1rem",
                                padding: "0.25rem 0.65rem",
                            }}
                        >
                            {/* Use Link components for navigation */}
                            {user ? (
                                <>
                                    <div>
                                        <AuthButton onClick={handleLogout}>
                                            Logout
                                        </AuthButton>
                                    </div>
                                    <Link to="/profile">
                                        <ProfileCircle>
                                            {user.name
                                                ? user.name
                                                      .charAt(0)
                                                      .toUpperCase()
                                                : "U"}
                                        </ProfileCircle>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/register">
                                        <AuthButton>Register</AuthButton>
                                    </Link>
                                    <Link to="/login">
                                        <AuthButton>Login</AuthButton>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Header>
            <Routes>
                <Route path="/" element={<MusicManagementPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </AppContainer>
    );
};

export default App;
