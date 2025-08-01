import styled from "@emotion/styled";

const ErrorContainer = styled.div`
    background: ${props => props.theme.colors.error + "20"};
    border: 2px solid ${props => props.theme.colors.error};
    color: ${props => props.theme.colors.error};
    padding: 0.35rem 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 4px solid ${props => props.theme.colors.error};
`;

const ErrorContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const ErrorIcon = styled.span`
    font-size: 1.25rem;
`;

const ErrorText = styled.span`
    font-weight: 500;
`;

const CloseButton = styled.button`
    background: #f1ced2ff;
    border: none;
    color: #721c24;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 100%;
    transition: background-color 0.2s ease;

    &:hover {
        background: rgba(114, 28, 36, 0.1);
    }
`;

export { ErrorContainer, ErrorContent, ErrorIcon, ErrorText, CloseButton };
