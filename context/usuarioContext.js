import { createContext, useContext } from "react";
import { useState } from "react";
import { v4 as uuid } from 'uuid'

export const UsuarioContext = createContext();

export const useUsuario = () => {
    return useContext(UsuarioContext);
}

export const UsuarioProvider = ({ children }) => {

    const [usuario, setUsuario] = useState([
            
       ]
    );

    
    const createUsuario = (id) => {
        setUsuario([...usuario, {id:1}])
    }

    const deleteUsuario = (id) =>
        setUsuario([...usuario.filter((usuario) => usuario.id !== id)]);

    return (
        <UsuarioContext.Provider value={{ usuario, createUsuario, deleteUsuario}}>{children}
        </UsuarioContext.Provider>
    );
}