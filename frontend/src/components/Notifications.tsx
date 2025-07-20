import {
    NotificationsContainer,
    Notification,
    NotificationContent,
    NotificationIcon,
    NotificationMessage,
    CloseButton,
} from "@/styles/component-styles/Notification.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { removeNotification } from "@/store/slices/uiSlice";
import { useEffect } from "react";
import AOS from "aos";
import { Notification as NotificationType } from "@app-types/types";

const getNotificationIcon = (
    type: "success" | "error" | "warning" | "info"
) => {
    switch (type) {
        case "success":
            return "✅";
        case "error":
            return "❌";
        case "warning":
            return "⚠️";
        default:
            return "ℹ️";
    }
};

function NotificationItem({
    notification,
}: {
    notification: NotificationType;
}) {
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeNotification({ id: notification.id }));
        }, notification.duration);

        return () => clearTimeout(timer);
    }, [dispatch, notification.id, notification.duration]);

    const handleClose = () => {
        dispatch(removeNotification({ id: notification.id }));
    };

    return (
        <Notification
            type={notification.type}
            data-aos="slide-left"
            data-aos-duration="500"
            data-aos-easing="ease-out-back"
            data-aos-anchor-placement="top-bottom"
        >
            <NotificationContent>
                <NotificationIcon>
                    {getNotificationIcon(notification.type)}
                </NotificationIcon>
                <NotificationMessage>
                    {notification.message}
                </NotificationMessage>
            </NotificationContent>
            <CloseButton onClick={handleClose} title="Close notification">
                ×
            </CloseButton>
        </Notification>
    );
}

const Notifications = () => {
    const notifications = useSelector(
        (state: RootState) => state.ui.notification
    );

    // Initialize AOS and refresh when notifications change
    useEffect(() => {
        // Initialize AOS on component mount
        AOS.init({
            duration: 500,
            easing: "ease-out-back",
            once: false,
            mirror: false,
        });

        // Refresh AOS when notifications change
        AOS.refresh();
    }, [notifications]);

    // Always render the container, even when empty
    return (
        <NotificationsContainer>
            {notifications.map(notification => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                />
            ))}
        </NotificationsContainer>
    );
};

export default Notifications;
