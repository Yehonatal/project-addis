import styled from "@emotion/styled";

const ListContainer = styled.div`
    padding: 1.5rem;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 3rem 1rem;
    color: ${props => props.theme.colors.textSecondary};
    transition: color 0.3s ease;
`;

const EmptyIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #495057;
`;

const EmptyDescription = styled.p`
    font-size: 1rem;
    line-height: 1.5;
`;

export {
    ListContainer,
    LoadingContainer,
    Grid,
    EmptyState,
    EmptyIcon,
    EmptyTitle,
    EmptyDescription,
};
