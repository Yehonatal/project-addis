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

export const AuthButton = styled.button`
    font-weight: bold;
    cursor: pointer;
    padding: 0.25rem 0.5rem; /* px-2 py-1 */
    font-size: 0.875rem; /* text-sm */
    color: white;
    border: 2px dashed #047857; /* border-green-700 */
    border-radius: 0.5rem; /* rounded-lg */
    background-color: #22c55e; /* bg-green-500 */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); /* shadow-md */

    transition:
        all 0.3s ease,
        transform 0.1s ease;

    &:hover {
        background-color: #4ade80; /* hover:bg-green-400 */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* hover:shadow-lg */
    }

    &:active {
        background-color: #16a34a; /* active:bg-green-600 */
        transform: scale(0.95); /* active:scale-95 */
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #86efac; /* focus:ring-2 focus:ring-green-300 */
    }
`;

export const ProfileCircle = styled.div`
    font-weight: bold;
    cursor: pointer;
    padding: 0.25rem 0.65rem; /* px-2 py-1 */
    font-size: 0.875rem; /* text-sm */
    color: white;
    border: 2px dashed #047857; /* border-green-700 */
    border-radius: 100%; /* rounded-lg */
    background-color: #22c55e; /* bg-green-500 */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); /* shadow-md */
    text-decoration: none

    transition:
        all 0.3s ease,
        transform 0.1s ease;

    &:hover {
        background-color: #4ade80; /* hover:bg-green-400 */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* hover:shadow-lg */
    }

    &:active {
        background-color: #16a34a; /* active:bg-green-600 */
        transform: scale(0.95); /* active:scale-95 */
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #86efac; /* focus:ring-2 focus:ring-green-300 */
    }
`;
