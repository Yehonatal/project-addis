import styled from "@emotion/styled";

export const AppContainer = styled.div`
    min-height: 100vh;
    max-width: 1200px;
    margin-inline: auto;
    padding: 20px;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition:
        background-color 0.3s ease,
        color 0.3s ease;
`;

export const Header = styled.header`
    text-align: left;
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.text};
`;

export const Title = styled.h1`
    font-size: 2rem;
    font-weight: 900;
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
`;

export const SubContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
`;

export const Subtitle = styled.h1`
    font-size: 0.75rem;
    font-weight: 500;
    color: ${props => props.theme.colors.textSecondary};
`;

export const Fun = styled.p`
    font-weight: 800;
    color: ${props => props.theme.colors.text};
`;
