import styled from "@emotion/styled";

const ListContainer = styled.div`
    padding: clamp(1.32rem, 5.28vw, 1.98rem);

    @media (max-width: 480px) {
        font-size: 1.32em;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: clamp(2rem, 5vw, 3rem);
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.32rem;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 0 0.5rem;
    gap: 1.5rem;

    @media (max-width: 575px) {
        grid-template-columns: 1fr;
    }

    @media (min-width: 576px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 992px) {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    @media (min-width: 1200px) {
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem);
    color: ${props => props.theme.colors.textSecondary};
    transition: color 0.3s ease;
`;

const EmptyIcon = styled.div`
    font-size: clamp(2.5rem, 8vw, 4rem);
    margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
    font-size: clamp(1.25rem, 4vw, 1.5rem);
    margin-bottom: 0.5rem;
    color: #495057;
`;

const EmptyDescription = styled.p`
    font-size: clamp(0.875rem, 3vw, 1rem);
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 1rem;
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
