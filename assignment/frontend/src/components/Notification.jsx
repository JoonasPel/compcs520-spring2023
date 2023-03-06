// Notification that is show to user for 5 seconds after disappering. TODO

import { useDispatch, useSelector } from "react-redux";
import { dataTestIds } from "../tests/constants/components";


export const Notification = () => {
    const notification = useSelector((state) => state.notification);
    //const notification = {message: "dSIUJPODFSOIPfpoIFDOIPSoifDSiodfsiofds"}


    return notification.message ? (
        <div data-testid={dataTestIds.containerId.notification}>
            <p data-testid={dataTestIds.inputId.description}>
                {notification.message}
            </p>
        </div>
    ) : ( 
        <div data-testid="no-notification-container" />
    );
};
