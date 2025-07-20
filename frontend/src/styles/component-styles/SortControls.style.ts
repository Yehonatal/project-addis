import styled from "@emotion/styled";

export const SortContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.3rem 10px;
    background: ${props => props.theme.colors.surface};
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.border};
    transition:
        background-color 0.3s ease,
        border-color 0.3s ease;
`;

export const SortLabel = styled.label`
    font-size: 0.9rem;
    font-weight: 500;
    color: ${props => props.theme.colors.textSecondary};
    transition: color 0.3s ease;
`;

export const SortSelect = styled.select`
    padding: 0.5rem;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 4px;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
    }
`;

export const SortButton = styled.button<{ active: boolean }>`
    padding: 0.5rem 0.75rem;
    border: 1px solid
        ${props =>
            props.active
                ? props.theme.colors.primary
                : props.theme.colors.border};
    border-radius: 4px;
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
    gap: 0.25rem;

    &:hover {
        background: ${props =>
            props.active
                ? props.theme.colors.primaryDark
                : props.theme.colors.surface};
    }
`;
