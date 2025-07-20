import styled from "@emotion/styled";

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
`;

const HeaderRight = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const AddButton = styled.button`
    background: ${props => props.theme.colors.success};
    color: ${props => props.theme.colors.white};
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid ${props => props.theme.colors.border};
    border-bottom: 5px solid ${props => props.theme.colors.border};
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        background: ${props => props.theme.colors.primary};
    }

    &:active {
        transform: translateY(0);
        outline: none;
    }
`;

const ContentArea = styled.div`
    background: ${props => props.theme.colors.surface};
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 1px solid ${props => props.theme.colors.border};
    transition: background-color 0.3s ease;
`;

const StatsBar = styled.div`
    background: ${props => props.theme.colors.background};
    padding: 1rem 1.5rem;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textSecondary};
    transition:
        background-color 0.3s ease,
        color 0.3s ease;
`;
export {
    Container,
    Header,
    HeaderLeft,
    HeaderRight,
    AddButton,
    ContentArea,
    StatsBar,
};
