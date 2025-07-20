import "@emotion/react";

declare module "@emotion/react" {
    export interface Theme {
        colors: {
            primary: string;
            primaryDark: string;
            secondary: string;
            background: string;
            surface: string;
            text: string;
            textSecondary: string;
            border: string;
            white: string;
            success: string;
            error: string;
            warning: string;
        };
        spacing: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            "2xl": string;
            "3xl": string;
            "4xl": string;
        };
        fontSizes: {
            xs: string;
            sm: string;
            base: string;
            lg: string;
            xl: string;
            "2xl": string;
            "3xl": string;
            "4xl": string;
            "5xl": string;
        };
        fontWeights: {
            light: number;
            normal: number;
            medium: number;
            semibold: number;
            bold: number;
            extrabold: number;
        };
        borderRadius: {
            none: string;
            sm: string;
            base: string;
            md: string;
            lg: string;
            xl: string;
            "2xl": string;
            "3xl": string;
            full: string;
        };
        shadows: {
            sm: string;
            base: string;
            md: string;
            lg: string;
            xl: string;
            "2xl": string;
        };
        breakpoints: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
            "2xl": string;
        };
        transitions: {
            fast: string;
            base: string;
            slow: string;
        };
        zIndex: {
            dropdown: number;
            sticky: number;
            fixed: number;
            modal: number;
            popover: number;
            tooltip: number;
        };
    }
}
