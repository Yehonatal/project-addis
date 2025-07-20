import styled from "@emotion/styled";

const NotificationsContainer = styled.div`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 350px;
    width: 350px;
    pointer-events: none;

    > * {
        pointer-events: auto;
    }

    @media (max-width: 768px) {
        right: 0.5rem;
        left: 0.5rem;
        max-width: none;
        width: auto;
    }
`;

const Notification = styled.div<{
    type: "success" | "error" | "warning" | "info";
}>`
    background: ${props => {
        switch (props.type) {
            case "success":
                return props.theme.colors.success + "20"; // 20% opacity
            case "error":
                return props.theme.colors.error + "20";
            case "warning":
                return props.theme.colors.warning + "20";
            default:
                return props.theme.colors.primary + "20";
        }
    }};
    border: 2px solid
        ${props => {
            switch (props.type) {
                case "success":
                    return props.theme.colors.success;
                case "error":
                    return props.theme.colors.error;
                case "warning":
                    return props.theme.colors.warning;
                default:
                    return props.theme.colors.primary;
            }
        }};
    color: ${props => {
        switch (props.type) {
            case "success":
                return props.theme.colors.success;
            case "error":
                return props.theme.colors.error;
            case "warning":
                return props.theme.colors.warning;
            default:
                return props.theme.colors.primary;
        }
    }};
    padding: 0.5rem 1.25rem;
    border-radius: 12px;
    box-shadow:
        0 8px 25px rgba(0, 0, 0, 0.15),
        0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;

    min-height: 60px;

    border-bottom: 4px solid
        ${props => {
            switch (props.type) {
                case "success":
                    return props.theme.colors.success;
                case "error":
                    return props.theme.colors.error;
                case "warning":
                    return props.theme.colors.warning;
                default:
                    return props.theme.colors.primary;
            }
        }};
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
`;

const NotificationContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
`;

const NotificationIcon = styled.span`
    font-size: 1.25rem;
`;

const NotificationMessage = styled.span`
    font-weight: 500;
    line-height: 1.4;
    font-size: 0.9rem;
`;

const CloseButton = styled.button`
    background: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: inherit;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s ease;
    margin-left: 1rem;
    font-size: 1rem;
    font-weight: bold;
    min-width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &:hover {
        background: rgba(0, 0, 0, 0.15);
        transform: scale(1.1);
        border-color: rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: 2px solid currentColor;
        outline-offset: 2px;
    }
`;

export {
    NotificationsContainer,
    Notification,
    NotificationContent,
    NotificationIcon,
    NotificationMessage,
    CloseButton,
};
