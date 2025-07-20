import styled from "@emotion/styled";

const Card = styled.div`
    background: ${props => props.theme.colors.surface};
    border-radius: 0.75rem;
    padding: 0.75rem;
    border: 2px solid ${props => props.theme.colors.border};
    border-bottom: 4px solid ${props => props.theme.colors.border};
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        background-color 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &:hover {
        transform: translateY(-1.5px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    }
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const SongInfo = styled.div`
    flex: 1;
    overflow: hidden;
`;

const Title = styled.h3`
    font-size: 0.95rem;
    font-weight: 700;
    color: ${props => props.theme.colors.text};
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

    button {
        background: none;
        border: none;
        padding: 0.3rem;
        font-size: 1rem;
        cursor: pointer;
        transition: 0.2s ease;
        border-radius: 4px;

        &:hover {
            background: ${props => props.theme.colors.background};
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
