
import { useVehiculo } from '../context/vehiculosContext'
import { useUsuario } from '../context/usuarioContext'
import { Fragment, useState } from 'react'
import ModalVehiculos from '../components/modalVehiculos'
import { AiOutlinePlus } from 'react-icons/ai'
import { useVehiculoSelect } from '../context/vehiculoSeleccionadoContext'
import ModalListasVehiculos from '../components/ModalListasVehiculos'
import Image from 'next/image'

const Home = ({ data }) => {



  const [vehiculoo, setVehiculoo] = useState({
    tipo_vehiculo: '',
    carroceria: '',
  });

  const { createVehiculo, vehiculos, deleteVehiculo, actVehiculo } = useVehiculo();

  const { usuario, createUsuario, deleteUsuario } = useUsuario()

  const { vehiculosSelect, createSelectVehiculo, deleteSelectVehiculo } = useUsuario()

  const act = e => {
    e.preventDefault()
    actVehiculo(data)
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'reg') {
      if (value === 'si') {
        if (usuario.length === 1) {

        }
        createUsuario(1)
      } else {
        if (value === 'no') {
          deleteUsuario(1)
        }
      }
    }
  }
  const [showModal, setShowModal] = useState(false);
  const [showModalListar, setShowModalListar] = useState(false);

  return (
    <Fragment>

      <div className='h-screen bg-white text-white'>


        <header className="bg-white">
          <div className="container mx-auto px-4 py-8 flex items-center">


            <div className="mr-auto md:w-48 flex-shrink-0">
              <Image className="h-8 md:h-10" src="/images/LogoMercadoRepuest.png" width={130} height={100} />
            </div>


            <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden xl:flex items-center">
              

              <button id='botonagregarvehiculo' className='text-blue-600 bg-transparent font-bold text-sm p-4 mr-4' onClick={() => {
                //actVehiculo(data)
                setShowModalListar(true)

              }}>
               
                Agregar vehiculo
                </button>
              
              <input className="border-l w-96 text-slate-900 border-gray-300 bg-transparent font-semibold text-sm pl-4" type="text" placeholder="Busca el producto para tu vehiculo" />
              <svg class="ml-auto h-5 px-4 text-gray-500" aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-search fa-w-16 fa-9x"><path fill="currentColor" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"></path></svg>
            </div>


          </div>

          <hr />
        </header>

        <hr />
        <div className='px-28'>
          <div>

            <select name='reg' id='reg' onChange={handleChange} className="bg-sky-800 focus:text-black focus:outline-none py-3 px-4 mb-5">
              <option value="usuario registrado">Usuario registrado</option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>

          </div>
        </div>

      </div>

      <ModalListasVehiculos isVisible={showModalListar} onClose={() =>
        setShowModalListar(false)} />

      <ModalVehiculos isVisible={showModal} onClose={() =>
        setShowModal(false)} />

    </Fragment>

  )
}
export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:3000/api/vehiculos')
    const data = await res.json()
    return {
      props: {
        data
      }
    }
  } catch (error) {
    console.log(error)
  }
}
export default Home
