import { useState } from "react";
import { useLoadingStatus } from "./useLoadingStatus";


const useKctc = () => {
    const { changeLoadingStatus, startLoading, loadingStatus } = useLoadingStatus();

    const doRedistribution = async () => {

    }

    const deleteAllData = async () => {
        startLoading();
        const response = await fetch('localhost:8080/kctc/all', {
            method: 'DELETE'
        });
        changeLoadingStatus(response.status, () => { alert("deleted all data") });
    }

    return { doRedistribution, deleteAllData, loadingStatus }

}