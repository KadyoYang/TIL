import { useState } from "react";
import { useLoadingStatus } from "./useLoadingStatus";

export type AmmoType =
    "5.56mm" |
    "7.62mm" |
    "6mm" |
    "12mm" |
    "etc";

export type Ammo = {
    id: number;
    ammoType: AmmoType;
    totalQuantity: number;
    availableQuantity: number;
    takenQuantity: number;
}


const useAmmo = () => {
    const { changeLoadingStatus, startLoading, loadingStatus } = useLoadingStatus();

    const [quantity, setQuantity] = useState<number>(0);
    const [ammoType, setAmmoType] = useState<AmmoType>("etc");
    const [ammoList, setAmmoList] = useState<Ammo[]>([]);

    const getAmmo = async () => {
        startLoading();
        const response = await fetch('localhost:8080/kctc/ammo', {
            method: 'GET'
        });
        changeLoadingStatus(response.status, async () => { setAmmoList(await response.json()) });

    }


    const addAmmo = async () => {
        startLoading();
        const response = await fetch('localhost:8080/kctc/ammo', {
            method: 'POST',
            body: JSON.stringify({
                "ammoType": ammoType,
                "quantity": quantity
            })
        });
        changeLoadingStatus(response.status);
    }

    return { quantity, setQuantity, ammoType, setAmmoType, ammoList, loadingStatus, getAmmo, addAmmo };
}

export default useAmmo;