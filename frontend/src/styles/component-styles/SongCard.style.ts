import styled from "@emotion/styled";

const Card = styled.div`
    background: ${props => props.theme.colors.surface};
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 2px solid ${props => props.theme.colors.border};
    border-bottom: 4px solid ${props => props.theme.colors.border};
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    height: 100%;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 576px) {
        padding: 0.99rem;
        gap: 0.66rem;
        font-size: 1.32em;
    }
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
    width: 100%;

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.55rem;
    }
`;

const SongInfo = styled.div`
    flex: 1;
    overflow: hidden;
    min-width: 0;
    width: 100%;

    /* Ensure text doesn't overflow */
    * {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const Title = styled.h3`
    margin: 0 0 0.25rem 0;
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;

    @media (max-width: 576px) {
        font-size: 1rem;
    }
    transition: color 0.3s ease;
`;

const Meta = styled.p`
    font-size: 0.75rem;
    color: ${props => props.theme.colors.textSecondary};
    margin: 0.25rem 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.3s ease;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 0.4rem;
    flex-shrink: 0;

    button {
        background: ${props => props.theme.colors.border + "10"};
        border: none;
        padding: 0.3rem;
        font-size: 1rem;
        cursor: pointer;
        transition: 0.2s ease;
        border-radius: 8px;

        &:hover {
            border: 1px solid ${props => props.theme.colors.border};

            background: ${props => props.theme.colors.surface};
        }

        &.edit {
            color: ${props => props.theme.colors.primary};
        }

        &.delete {
            color: ${props => props.theme.colors.error};
        }
    }
`;

const CardBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    gap: 0.5rem;
    flex-wrap: wrap;

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const Detail = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 60px;
`;

const Label = styled.span`
    font-size: 0.65rem;
    color: ${props => props.theme.colors.textSecondary};
    text-transform: uppercase;
    margin-bottom: 0.1rem;
    transition: color 0.3s ease;
`;

const Value = styled.span`
    color: ${props => props.theme.colors.text};
    font-weight: 600;
    transition: color 0.3s ease;
`;

const GenreBadge = styled.span`
    background: ${props => props.theme.colors.success};
    color: ${props => props.theme.colors.white};
    padding: 0.25rem 0.75rem;
    font-size: 0.65rem;
    font-weight: 600;
    border-radius: 999px;
    border: 2px solid ${props => props.theme.colors.border};
    border-bottom: 4px solid ${props => props.theme.colors.border};
    transition: background-color 0.3s ease;
    max-width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export {
    Card,
    CardHeader,
    SongInfo,
    Title,
    Meta,
    ActionButtons,
    CardBottom,
    Detail,
    Label,
    Value,
    GenreBadge,
};
