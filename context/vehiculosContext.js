import { createContext, useContext } from "react";
import { useState } from "react";
import { v4 as uuid } from 'uuid'

export const VehiculosContext = createContext();

export const useVehiculo = () => {
    return useContext(VehiculosContext);
}

export const VehiculosProvider = ({ children }) => {

    const [vehiculos, setVehiculos] = useState([
        
       ]
    );

    const actVehiculo = (json) => {
        setVehiculos(vehiculos.concat(json)) // Opción 2
    }

    const createVehiculo = (id,usuario,tipo,carroceria,marca,modelo,año,transmision,combustible,traccion,cilindraje) => {
        setVehiculos([...vehiculos, {id,usuario,tipo,carroceria,marca,modelo,año,transmision,combustible,traccion,cilindraje}])
    }

    const deleteVehiculo = (id) =>
        setVehiculos([...vehiculos.filter((vehiculo) => vehiculo.id !== id)]);

    
    return (
        <VehiculosContext.Provider value={{ vehiculos, createVehiculo, deleteVehiculo,actVehiculo }}>{children}
        </VehiculosContext.Provider>
    );
}