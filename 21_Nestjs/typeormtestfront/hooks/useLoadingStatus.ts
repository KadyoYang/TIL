import { Dispatch, SetStateAction, useState } from "react";


export type loadingStatusType = "IDLE" | "LOADING" | "SUCCESS" | "ERROR";



export const useLoadingStatus = () => {
    const [loadingStatus, setLoadingStatus] = useState<loadingStatusType>("IDLE");

    const startLoading = () => {
        setLoadingStatus("LOADING");
    }

    const changeLoadingStatus = (httpStatus: number, successCallback?: () => void) => {
        if (httpStatus / 100 === 2) {
            if (successCallback) {
                successCallback();
            }
            setLoadingStatus("SUCCESS");
        } else {
            setLoadingStatus("ERROR");
        }

    }

    return { loadingStatus, setLoadingStatus, changeLoadingStatus, startLoading };

}
