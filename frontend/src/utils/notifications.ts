import { Notification } from "@app-types/types";

export default function showNotification(notification: Notification) {
    return {
        type: "ADD_NOTIFICATION",
        payload: notification,
    };
}
