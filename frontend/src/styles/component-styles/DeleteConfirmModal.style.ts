import styled from "@emotion/styled";

const Content = styled.div`
    text-align: center;
    padding: 1rem 0;
`;

const Icon = styled.div`
    font-size: 3rem;
    margin-bottom: 1rem;
`;

const Title = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 0.5rem;
`;

const Message = styled.p`
    color: #6c757d;
    margin-bottom: 1.5rem;
    line-height: 1.5;
`;

const SongInfo = styled.div`
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    text-align: left;
`;

const SongTitle = styled.div`
    font-weight: 600;
    color: #212529;
    margin-bottom: 0.25rem;
`;

const SongDetails = styled.div`
    color: #6c757d;
    font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
`;

const Button = styled.button`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 100px;

    &.danger {
        background: #dc3545;
        color: white;

        &:hover {
            background: #c82333;
        }

        &:disabled {
            background: #adb5bd;
            cursor: not-allowed;
        }
    }

    &.secondary {
        background: #6c757d;
        color: white;

        &:hover {
            background: #5a6268;
        }
    }
`;

export {
    Content,
    Icon,
    Title,
    Message,
    SongInfo,
    SongDetails,
    SongTitle,
    ButtonGroup,
    Button,
};
