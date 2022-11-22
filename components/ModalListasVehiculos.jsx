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
import ModalMensaje from '../components/ModalMensaje'


export async function getStaticPaths(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return {
            data
        }
    } catch (error) {
        console.log(error)
    }
}

const eliminarVehiculoDB = (id) => {

    const res = axios.delete('http://localhost:3000/api/vehiculos/' + id)
    console.log(res)
}

const ModalListasVehiculos = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    const [showModal, setShowModal] = useState(false);

    const { usuario, createUsuario, deleteUsuario } = useUsuario()

    const [showModalMensaje, setShowModalMensaje] = useState(false);

    const { createVehiculo, vehiculos, deleteVehiculo, actVehiculo } = useVehiculo()

    const { vehiculosRadio, createRadioVehiculo, deleteRadioVehiculo,reemplazar } = useVehiculoRadio()

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

    const sacarIdSelect = e => {
        var id=0
        vehiculosRadio.map((vehiculo) => (
           id=vehiculo.id
            
        ))
        return id
    }

    return (
        <Fragment>

            <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
                <div className='rounded-lg bg-purple-50 w-[550px] flex flex-col'>
                    <div className='bg-purple-100 p-2 rounded'>

                        <button className='text-red text-xl place-self-end' onClick={() => {
                            if (vehiculos.length < 1) {
                                document.getElementById("botonagregarvehiculo").innerHTML = ('Agregar vehiculo')
                            }
                            onClose()
                        }


                        }>X</button>
                        <br></br>
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-xl font-bold leading-none text-blue-800 dark:text-white">Agrega tu vehiculo para filtrar tu busqueda</h5>

                        </div>
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3 sm:py-1">
                                    <div className='max-w p-3 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center mb-2">
                                                    <input id="default-radio-1" type="radio" value='nulo' name="radioselectvehiculo" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                   Buscar para cualquier vehiculo
                                                </p>
                                               
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                
                                            </div>
                                        </div>
                                    </div>



                                </li>
                                {
                                    vehiculosSelect.length === 0 ? (
                                        <li className="py-3 sm:py-4">
                                            <div className="flex items-center space-x-4">

                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-blue-600 truncate dark:text-white">
                                                        No tiene vehiculos registrados.
                                                    </p>

                                                </div>

                                            </div>
                                        </li>
                                    ) : (
                                        <div>
                                            {
                                                vehiculosSelect.map((vehiculo, i) => (
                                                    
                                                   
                                                    <div>

                                                        <li className="py-3 sm:py-1">
                                                            <div className='max-w p-3 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
                                                                <div className="flex items-center space-x-4">
                                                                    <div className="flex-shrink-0">
                                                                        <div className="flex items-center mb-2">
                                                                                {
                                                                                    sacarIdSelect()===vehiculo.id? (
                                                                                        <input checked id={vehiculo.id} type="radio" value={vehiculo.id} name="radioselectvehiculo" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                                    ):(
                                                                                        <input id={vehiculo.id} type="radio" value={vehiculo.id} name="radioselectvehiculo" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                                    )
                                                                                }
                                                                                
                                                                                
                                                                             
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                            {vehiculo.tipo},{vehiculo.marca},{vehiculo.modelo}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                                            {vehiculo.año},{vehiculo.cilindraje},{vehiculo.id}
                                                                        </p>
                                                                    </div>
                                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                                        <button className='hover:gb-red-600 px-3 py-1' onClick={(e) => {
                                                                           var opcion = confirm("Esta seguro que desea eliminarlo?");
                                                                           if (opcion == true) {
                                                                               e.stopPropagation();
                                                                               deleteVehiculo(vehiculo.id);
                                                                               deleteSelectVehiculo(vehiculo.id)
                                                                               eliminarVehiculoDB(vehiculo.id)
                                                                            }
                                                                            

                                                                        }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                                                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                                        

                                                        </li>
                                                                         
                                                    </div>
                                                    
                                                ))
                                            }

                                        </div>

                                    )

                                }
                                <li className="py-3 sm:py-1">
                                    <center>
                                        <a href='#' type='button' onClick={() => {

                                           if (usuario.length >= 1) {
                                                if (vehiculos.length < 3) {
                                                    setShowModal(true)
                                                   
                                                } else {
                                                    setShowModalMensaje(true)
                                                }

                                            } else {
                                                if (vehiculos.length < 1) {
                                                    setShowModal(true)
                                                } else {
                                                    setShowModalMensaje(true)
                                                }
                                            }
                                           

                                        }} className="block max-w p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                            <p className='space-x-4'>Agregar un nuevo vehiculo</p>

                                        </a>
                                    </center>
                                </li>
                                
                            </ul>


                            <div className="p-4 flow-root ">
                                <button className='float-right bg-blue-800 text-white px-3 py-2 font-bold rounded-full ' onClick={(e) => {
                                    if (vehiculos.length != 0) {
                                        if (!document.querySelector('input[name="radioselectvehiculo"]:checked')) {
                                            alert('Debes Seleccionar el vehiculo')
                                        } else {

                                            e.stopPropagation();
                                            var id_select = document.querySelector('input[name="radioselectvehiculo"]:checked').value;
                                            var urlami = 'http://localhost:3000/api/vehiculos/' + id_select

                                           

                                            const dataVeh = getStaticPaths(urlami);
                                            dataVeh.then((datos) => {
                                                var json = datos.data
                                               
                                                for (var i = 0; i < json.length; i++) {

                                                    document.getElementById("botonagregarvehiculo").innerHTML = (json[i].id_tipo + ',' + json[i].id_modelo + ',' + json[i].id_cilindraje);
                                                    deleteRadioVehiculo(json[i].id)

                                                }
                                                    //createRadioVehiculo(id_select); 
                                            })
                                            onClose()
                                        }

                                    } else {
                                        onClose()
                                    }


                                }}>Aceptar</button>
                            </div>




                        </div>

                    </div>
                </div>

            </div>
            
            <ModalVehiculos isVisible={showModal} onClose={() =>
                setShowModal(false)} />

            <ModalMensaje isVisible={showModalMensaje} onClose={() =>
                setShowModalMensaje(false)} />
        </Fragment>

    )

}

export default ModalListasVehiculos
