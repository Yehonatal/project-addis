import styled from "@emotion/styled";

export const SortContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    background: ${props => props.theme.colors.surface};
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.border};
    flex-wrap: wrap;
    transition:
        background-color 0.3s ease,
        border-color 0.3s ease;

    @media (max-width: 768px) {
        gap: 0.75rem;
        padding: 0.5rem;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
    }
`;

export const SortLabel = styled.label`
    font-size: 0.9rem;
    font-weight: 500;
    color: ${props => props.theme.colors.textSecondary};
    transition: color 0.3s ease;

    @media (max-width: 768px) {
        font-size: 0.85rem;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
        text-align: center;
    }
`;

export const SortSelect = styled.select`
    padding: 0.5rem 0.75rem;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 6px;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 0.45rem 0.65rem;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const SortButton = styled.button<{ active: boolean }>`
    padding: 0.5rem 1rem;
    border: 1px solid
        ${props =>
            props.active
                ? props.theme.colors.primary
                : props.theme.colors.border};
    border-radius: 6px;
    background: ${props =>
        props.active
            ? props.theme.colors.primary
            : props.theme.colors.background};
    color: ${props =>
        props.active ? props.theme.colors.white : props.theme.colors.text};
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background: ${props =>
            props.active
                ? props.theme.colors.primaryDark
                : props.theme.colors.surface};
    }

    @media (max-width: 768px) {
        padding: 0.45rem 0.9rem;
        font-size: 0.85rem;
    }

    @media (max-width: 480px) {
        width: 100%;
        justify-content: center;
    }
`;
