import styled from "@emotion/styled";

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    border-top: 1px solid ${props => props.theme.colors.border};
    background: ${props => props.theme.colors.background};
    transition: background-color 0.3s ease;
`;

const PaginationList = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 0.5rem;
`;

const PaginationItem = styled.li`
    display: flex;
`;

const PageInfo = styled.span`
    margin: 0 1rem;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9rem;
    white-space: nowrap;
    transition: color 0.3s ease;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    padding: 0.5rem;
    border: 2px solid ${props => props.theme.colors.border};
    border-bottom: 5px solid ${props => props.theme.colors.border};
    background: ${props =>
        props.active ? props.theme.colors.primary : props.theme.colors.surface};
    color: ${props =>
        props.active ? props.theme.colors.white : props.theme.colors.text};
    border-radius: 6px;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
    transition: all 0.2s ease;
    font-weight: ${props => (props.active ? "600" : "400")};
    opacity: ${props => (props.disabled ? "0.5" : "1")};

    &:hover:not(:disabled) {
        background: ${props =>
            props.active
                ? props.theme.colors.primaryDark
                : props.theme.colors.background};
        border-color: ${props => props.theme.colors.primary};
    }

    &:disabled {
        pointer-events: none;
    }
`;
export {
    PaginationContainer,
    PaginationList,
    PaginationItem,
    PageInfo,
    PaginationButton,
};
