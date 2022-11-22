import '../styles/globals.css';
import { VehiculosProvider } from "../context/vehiculosContext";
import { UsuarioProvider } from "../context/usuarioContext";
import {VehiculosSelectProvider} from  "../context/vehiculoSeleccionadoContext";
import {VehiculosRadioProvider} from "../context/vehiculosRadioContext";
function MyApp({ Component, pageProps}) {
  return (
    <VehiculosProvider>
      <UsuarioProvider>
        <VehiculosSelectProvider>
          <VehiculosRadioProvider>
      <Component {...pageProps} />
      </VehiculosRadioProvider>
      </VehiculosSelectProvider>
      </UsuarioProvider>
    </VehiculosProvider>
  )
}

export default MyApp
