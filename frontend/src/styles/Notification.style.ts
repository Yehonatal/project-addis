import styled from "@emotion/styled";

const NotificationsContainer = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1050;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 400px;
`;

const Notification = styled.div`
    background: ${props => {
        switch (props.type) {
            case "success":
                return "#d1e7dd";
            case "error":
                return "#f8d7da";
            case "warning":
                return "#fff3cd";
            default:
                return "#d1ecf1";
        }
    }};
    border: 1px solid
        ${props => {
            switch (props.type) {
                case "success":
                    return "#badbcc ";
                case "error":
                    return "#f5c6cb";
                case "warning":
                    return "#ffeaa7";
                default:
                    return "#bee5eb";
            }
        }};
    color: ${props => {
        switch (props.type) {
            case "success":
                return "#0f5132";
            case "error":
                return "#721c24";
            case "warning":
                return "#856404";
            default:
                return "#055160";
        }
    }};
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: slideIn 0.3s ease-out;
    border: 2px solid #131314;
    border-bottom: 5px solid #131314;

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
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
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    margin-left: 1rem;

    &:hover {
        background: rgba(0, 0, 0, 0.1);
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
