import styled from "@emotion/styled";

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    max-width: 400px;
    width: 100%;

    @media (max-width: 480px) {
        max-width: 100%;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: 8px;
    font-size: 1rem;
    background: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-bottom: 5px solid ${props => props.theme.colors.border};

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
    }

    &::placeholder {
        color: ${props => props.theme.colors.textSecondary};
    }

    @media (max-width: 400px) {
        font-size: 0.95rem;
        padding: 0.65rem 0.75rem 0.65rem 2rem;
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    left: 1rem;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 1.1rem;
    pointer-events: none;
    z-index: 1;
    transition: color 0.3s ease;

    @media (max-width: 400px) {
        font-size: 1rem;
        left: 0.75rem;
    }
`;

const ClearButton = styled.button`
    position: absolute;
    right: 0.75rem;
    background: none;
    border: none;
    color: ${props => props.theme.colors.textSecondary};
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    transition: all 0.2s ease;

    &:hover {
        background: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
    }

    @media (max-width: 400px) {
        right: 0.5rem;
    }
`;

export { SearchContainer, SearchInput, SearchIcon, ClearButton };
