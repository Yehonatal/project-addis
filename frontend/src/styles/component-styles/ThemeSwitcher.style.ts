import styled from "@emotion/styled";

export const ThemeButton = styled.button`
    padding: 0.25rem;
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: 50%;
    background: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;

    &:hover {
        background: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
    }

    &:active {
        transform: scale(0.95);
    }
`;
