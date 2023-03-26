import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dataTestIds } from "../tests/constants/components";


export const Notification = () => {
    const notification = useSelector((state) => state.notification);
    const [showMessage, setShowMessage] = useState(false);
    const [timeoutID, setTimeoutID] = useState();

    // Called every time notification changes. Clears current timeout
    // and then adds a new one so every notification has same lifespan.
    const timeout = () => {
        clearTimeout(timeoutID);
        setShowMessage(true);
        let id = setTimeout(() => {
            setShowMessage(false);
        }, 5000);
        setTimeoutID(id);
    };

    useEffect(() => {timeout()}, [notification]);

    return (notification.message && showMessage) ? (
        <div data-testid={dataTestIds.containerId.notification}>
            <p data-testid={dataTestIds.valueId.description}>
                {notification.message}
            </p>
        </div>
    ) : ( 
        <div data-testid="no-notification-container" />
    );
};
