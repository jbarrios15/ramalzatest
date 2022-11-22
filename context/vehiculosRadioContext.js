import { createContext, useContext } from "react";
import { useState } from "react";
import { v4 as uuid } from 'uuid'

export const VehiculosRadioContext = createContext();

export const useVehiculoRadio = () => {
    return useContext(VehiculosRadioContext);
}

export const VehiculosRadioProvider = ({ children }) => {

    const [vehiculosRadio, setvehiculosRadio] = useState([
        
       ]
    );

    const createRadioVehiculo = (id) => {
        setvehiculosRadio([...vehiculosRadio, {id}])
    }

    const deleteRadioVehiculo = (id) =>
    setvehiculosRadio([...vehiculosRadio.filter((vehiculosRadio) => vehiculosRadio.id == id)]);

    const reemplazar = (id) =>
    setvehiculosRadio([...vehiculosRadio.filter((vehiculosRadio) => vehiculosRadio.id == id)]);


    return (
        <VehiculosRadioContext.Provider value={{ vehiculosRadio, createRadioVehiculo, deleteRadioVehiculo,reemplazar}}>{children}
        </VehiculosRadioContext.Provider>
    );
}