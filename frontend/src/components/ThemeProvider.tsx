import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { RootState } from "@/store/store";
import { lightTheme, darkTheme } from "@/styles/theme";

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const theme = useSelector((state: RootState) => state.ui.theme);
    const currentTheme = theme === "dark" ? darkTheme : lightTheme;

    return (
        <EmotionThemeProvider theme={currentTheme}>
            {children}
        </EmotionThemeProvider>
    );
};

export default ThemeProvider;
