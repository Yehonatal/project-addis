import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/slices/uiSlice";
import { RootState } from "@/store/store";
import { ThemeButton } from "@/styles/component-styles/ThemeSwitcher.style";

const ThemeSwitcher = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.ui.theme);
    const isDarkMode = theme === "dark";

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <ThemeButton
            onClick={handleToggle}
            title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            data-aos="flip-left"
            data-aos-delay="100"
            data-aos-duration="600"
        >
            {isDarkMode ? "☀️" : "🌙"}
        </ThemeButton>
    );
};

export default ThemeSwitcher;
