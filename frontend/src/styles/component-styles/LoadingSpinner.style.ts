import styled from "@emotion/styled";

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
`;

const Spinner = styled.div`
    width: 40px;
    height: 40px;
    border: 4px solid #f3f4f6;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const LoadingText = styled.p`
    margin-left: 1rem;
    color: #6c757d;
    font-size: 1rem;
    font-weight: 700;
`;

export { SpinnerContainer, Spinner, LoadingText };
