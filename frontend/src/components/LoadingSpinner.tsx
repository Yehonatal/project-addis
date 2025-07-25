import {
    SpinnerContainer,
    Spinner,
    LoadingText,
} from "@/styles/component-styles/LoadingSpinner.style";

const LoadingSpinner = () => {
    return (
        <SpinnerContainer>
            <Spinner />
            <LoadingText>
                Am getting your music (tenesh tebekeny)...
            </LoadingText>
        </SpinnerContainer>
    );
};

export default LoadingSpinner;
