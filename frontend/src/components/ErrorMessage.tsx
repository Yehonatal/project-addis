import {
    ErrorContainer,
    ErrorContent,
    ErrorIcon,
    ErrorText,
    CloseButton,
} from "@/styles/component-styles/ErrorMessage.style";
import { useDispatch } from "react-redux";
import { clearError } from "@store/slices/songsSlice";

const ErrorMessage = ({ message }: { message: string }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(clearError());
    };

    if (!message) return null;

    return (
        <ErrorContainer>
            <ErrorContent>
                <ErrorIcon>⚠️</ErrorIcon>
                <ErrorText>{message}</ErrorText>
            </ErrorContent>
            <CloseButton onClick={handleClose}>×</CloseButton>
        </ErrorContainer>
    );
};

export default ErrorMessage;
