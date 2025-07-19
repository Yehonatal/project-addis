import styled from "@emotion/styled";

const ErrorContainer = styled.div`
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #131314;
    border-bottom: 5px solid #131314;
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
    background: none;
    border: none;
    color: #721c24;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: background-color 0.2s ease;

    &:hover {
        background: rgba(114, 28, 36, 0.1);
    }
`;

export { ErrorContainer, ErrorContent, ErrorIcon, ErrorText, CloseButton };
