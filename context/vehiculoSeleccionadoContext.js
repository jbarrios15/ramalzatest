import { createContext, useContext } from "react";
import { useState } from "react";
import { v4 as uuid } from 'uuid'

export const VehiculosSelectContext = createContext();

export const useVehiculoSelect = () => {
    return useContext(VehiculosSelectContext);
}

export const VehiculosSelectProvider = ({ children }) => {

    const [vehiculosSelect, setSelectVehiculos] = useState([
        
       ]
    );

    const createSelectVehiculo = (id,usuario,tipo,carroceria,marca,modelo,año,transmision,combustible,traccion,cilindraje) => {
        setSelectVehiculos([...vehiculosSelect, {id,usuario,tipo,carroceria,marca,modelo,año,transmision,combustible,traccion,cilindraje}])
    }

    const deleteSelectVehiculo = (id) =>
        setSelectVehiculos([...vehiculosSelect.filter((vehiculosSelect) => vehiculosSelect.id !== id)]);


    return (
        <VehiculosSelectContext.Provider value={{ vehiculosSelect, createSelectVehiculo, deleteSelectVehiculo}}>{children}
        </VehiculosSelectContext.Provider>
    );
}