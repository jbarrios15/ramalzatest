import React from 'react'
import { Fragment, useState } from 'react'
import { useVehiculo } from '../context/vehiculosContext'
import { useUsuario } from '../context/usuarioContext'
import { useVehiculoSelect } from '../context/vehiculoSeleccionadoContext'
import ModalVehiculos from '../components/modalVehiculos'
import { useVehiculoRadio } from '../context/vehiculosRadioContext'
import { AiOutlinePlus } from 'react-icons/ai'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { info } from 'autoprefixer'


const ModalMensaje = ({ isVisible, onClose, marca, año, modelo, cilindraje, combustible, transmision, id }) => {
    if (!isVisible) return null;

    const [showModal, setShowModal] = useState(false);

    const { createVehiculo, vehiculos, deleteVehiculo, actVehiculo } = useVehiculo()

    const { vehiculosRadio, createRadioVehiculo, deleteRadioVehiculo, reemplazar } = useVehiculoRadio()

    const { vehiculosSelect, createSelectVehiculo, deleteSelectVehiculo } = useVehiculoSelect()

    const cargarvehiculos = e => {
        e.preventDefault()


        const div = document.querySelector(".info");
        div.textContent;  // "Hola amigos"

        cargarvehiculos.then((datos) => {
            var json = datos.data

            const app = document.createElement("div"); // <div></div>
            app.id = "app";       // <div id="app"></div>
            for (var i = 0; i < json.length; i++) {

            }
        }
        )
    }



    return (
        <Fragment>

            <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
                <div className='rounded-lg bg-purple-50 w-[550px] flex flex-col'>
                    <div className='bg-purple-100 p-2 rounded'>

                        <button className='text-red text-xl place-self-end' onClick={() => {

                            onClose()
                        }


                        }>X</button>
                        <br></br>
                        <div class="flex items-center justify-between mb-4">
                            <h5 class="text-xl font-bold leading-none text-blue-800 dark:text-white">Debes eliminar por lo menos un vehiculo para agregar uno nuevo.</h5>

                        </div>
                        <div class="flow-root">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">

                                <div>
                                    {

                                        <div>

                                            <li class="py-3 sm:py-1">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Haz llegado al maximo de vehiculos que puedes agregar.
                                                </p>


                                            </li>

                                        </div>

                                    }

                                </div>

                            </ul>


                            <div class="p-4 flow-root ">
                                <button className='float-right bg-blue-800 text-white px-3 py-2 font-bold rounded-full' onClick={() => {

                                    onClose()

                                }}>Aceptar</button>
                            </div>

                        </div>

                    </div>
                </div>

            </div>


        </Fragment>

    )

}



export default ModalMensaje
