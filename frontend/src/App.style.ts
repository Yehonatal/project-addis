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
    padding: 0 16px;
    color: ${props => props.theme.colors.text};
`;

export const Title = styled.h1`
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: 900;
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
    line-height: 1.2;
    word-break: break-word;

    @media (max-width: 480px) {
        font-size: 1.98rem;
    }
`;

export const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    width: 100%;
    max-width: 100%;
    overflow: hidden;

    @media (min-width: 600px) {
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
`;

export const Subtitle = styled.h2`
    font-size: 0.75rem;
    font-weight: 500;
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
`;

export const Fun = styled.p`
    font-weight: 800;
    color: ${props => props.theme.colors.text};
`;
