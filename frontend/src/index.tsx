import React from "react";
import AOS from "aos";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ThemeProvider from "./components/ThemeProvider";

AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
    offset: 100,
});

const container = document.getElementById("root");
if (!container) {
    throw new Error("Root container not found");
}
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
