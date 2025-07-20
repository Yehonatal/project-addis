import { useEffect } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    AppContainer,
    Header,
    Title,
    Subtitle,
    SubContainer,
    Fun,
} from "./App.style";
import MusicManagement from "./pages/MusicManagement";
import { RootState } from "./store/store";
import Notifications from "@/components/Notifications";

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

        // Also apply to html element for complete coverage
        document.documentElement.style.backgroundColor = isDarkMode
            ? "#131314"
            : "#ffffff";
        document.documentElement.style.transition =
            "background-color 0.3s ease";
    }, [theme]);

    return (
        <AppContainer>
            <Notifications />

            <Header data-aos="fade-zoom-in">
                <Title>Addis Software Internship Test</Title>
                <SubContainer>
                    <Subtitle>by</Subtitle>
                    <Subtitle>
                        <Fun>Yonatan</Fun>
                    </Subtitle>
                    <Subtitle>Afewerk Teshome</Subtitle>
                </SubContainer>
            </Header>
            <div data-aos="fade-up" data-aos-delay="200">
                <MusicManagement />
            </div>
        </AppContainer>
    );
};

export default App;
