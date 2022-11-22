import React from 'react'
import { Fragment, useState } from 'react'
import { useVehiculo } from '../context/vehiculosContext'
import { useUsuario } from '../context/usuarioContext'
import { useVehiculoSelect } from '../context/vehiculoSeleccionadoContext'
import { AiOutlinePlus } from 'react-icons/ai'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { useVehiculoRadio } from '../context/vehiculosRadioContext'

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
export async function deleteStaticPaths(url) {
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

const ModalVehiculos = ({ isVisible, onClose }) => {
    if (!isVisible) return null;


    const { createVehiculo, vehiculos, deleteVehiculo, actVehiculo } = useVehiculo()

    const { vehiculosSelect, createSelectVehiculo, deleteSelectVehiculo } = useVehiculoSelect()

    const { vehiculosRadio, createRadioVehiculo, deleteRadioVehiculo, reemplazar } = useVehiculoRadio()

    const [vehiculoo, setVehiculoo] = useState({
        id: '',
        usuario: '1',
        tipo: '',
        carroceria: '',
        marca: '',
        año: '',
        transmision: '',
        combustible: '',
        traccion: '',
        cilindraje: '',
        modelo: '',
    });
    const [vehiculoFalso, setVehiculoFalso] = useState({
        id: '',
        usuario: '1',
        tipo: '',
        carroceria: '',
        marca: '',
        año: '',
        transmision: '',
        combustible: '',
        traccion: '',
        cilindraje: '',
        modelo: '',
    });

    const obtenerdatosfalsos = (divid) => {
        var di = document.getElementById(divid);
        var divselect = di.options[di.selectedIndex].text;
        setVehiculoFalso({ ...vehiculoFalso, [divid]: divselect })
    }

    const registrarVehiculoDB = e => {

        let id_ale = uuid();
        createVehiculo(id_ale, 1, vehiculoo.tipo, vehiculoo.carroceria, vehiculoo.marca,
            vehiculoo.modelo, vehiculoo.año, vehiculoo.transmision,
            vehiculoo.combustible, vehiculoo.traccion, vehiculoo.cilindraje)

        createSelectVehiculo(id_ale, 1, vehiculoFalso.tipo, vehiculoFalso.carroceria, vehiculoFalso.marca,
            vehiculoFalso.modelo, vehiculoFalso.año, vehiculoFalso.transmision,
            vehiculoFalso.combustible, vehiculoFalso.traccion, vehiculoFalso.cilindraje)

        if (vehiculosRadio.length === 0) {
            createRadioVehiculo(id_ale)
        } else {

            reemplazar(id_ale)
            createRadioVehiculo(id_ale)
        }



        axios.post('http://localhost:3000/api/vehiculos', {
            id: id_ale,
            id_usuario: 1,
            id_tipo: vehiculoo.tipo,
            id_carroceria: vehiculoo.carroceria,
            id_marca: vehiculoo.marca,
            id_año: vehiculoo.año,
            id_transmision: vehiculoo.transmision,
            id_combustible: vehiculoo.combustible,
            id_traccion: vehiculoo.traccion,
            id_cilindraje: vehiculoo.cilindraje,
            id_modelo: vehiculoo.modelo,
        })

    }

    

    const handleSubmit = (e) => {
        e.preventDefault()



        if (vehiculoo.tipo === '' || vehiculoo.tipo === 'tipo') {
            alert('Ingrese el tipo de vehiculo')
        } else {
            if (vehiculoo.carroceria == '' || vehiculoo.carroceria == 'carroceria') {
                alert('Ingrese la carroceria')
            } else {
                if (vehiculoo.marca == '' || vehiculoo.marca == 'marca') {
                    alert('Ingrese la marca')
                } else {
                    if (vehiculoo.año == '' || vehiculoo.año == 'año') {
                        alert('Ingrese el año')
                    } else {
                        if (vehiculoo.modelo == '' || vehiculoo.modelo == 'modelo') {
                            alert('Ingrese el modelo')
                        } else {
                            if (vehiculoo.cilindraje == '' || vehiculoo.cilindraje == 'cilindraje') {
                                alert('Ingrese el cilindraje')
                            } else {
                                if (vehiculoo.combustible == '' || vehiculoo.combustible == 'combustible') {
                                    alert('Ingrese el combustible')
                                } else {
                                    if (vehiculoo.transmision == '' || vehiculoo.transmision == 'transmision') {
                                        alert('Ingrese la transmision')
                                    } else {
                                        if (vehiculoo.traccion == '' || vehiculoo.traccion == 'traccion') {
                                            alert('Ingrese la traccion')
                                        } else {

                                            registrarVehiculoDB();

                                            onClose()
                                            
                                            
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    }

    function añadirOption(element, name, value) {
        var aficiones = document.getElementById(element);
        var option = document.createElement("option");
        option.text = name;
        option.value = value;
        aficiones.add(option);
    }
    function eliminarDataOption(element, defaultName, defaultValue) {
        let aficiones = document.getElementById(element);

        for (let i = aficiones.options.length; i >= 0; i--) {
            aficiones.remove(i);
        }
        let option = document.createElement("option");
        option.text = defaultName;
        option.value = defaultValue;
        aficiones.add(option);
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        obtenerdatosfalsos(name);
        if (name === 'tipo') {

            switch (value) {
                case '2':
                    //carro
                    const DataCarroceria = getStaticPaths('http://localhost:3000/api/vehiculos/carroceria/2');
                    DataCarroceria.then((datos) => {
                        var json = datos.data
                        eliminarDataOption('carroceria', 'Carroceria', 'carroceria');
                        for (var i = 0; i < json.length; i++) {
                            añadirOption('carroceria', json[i].nombre, json[i].id);
                        }
                    }
                    )
                    eliminarDataOption('transmision', 'Transmision', 'transmision')
                    añadirOption('transmision', 'Mecanica', '1');
                    añadirOption('transmision', 'Automatica', '2');
                    añadirOption('transmision', 'Semiautomatica', '3');
                    añadirOption('transmision', 'Manumaticas', '4');

                    eliminarDataOption('traccion', 'Traccion', 'traccion')
                    añadirOption('traccion', 'FWD', '1');
                    añadirOption('traccion', 'RWD', '2');
                    añadirOption('traccion', 'AWD', '3');
                    añadirOption('traccion', '4x4', '4');


                    

                    break;
                case '1':
                    eliminarDataOption('cilindraje', 'Cilindraje', 'cilindraje');
                    eliminarDataOption('traccion', 'Traccion', 'traccion')
                    añadirOption('traccion', 'NO APLICA', '5')
                    
                    const DataCarroceriaMoto = getStaticPaths('http://localhost:3000/api/vehiculos/carroceria/1');
                    DataCarroceriaMoto.then((datos) => {
                        var json = datos.data
                        eliminarDataOption('carroceria', 'Carroceria', 'carroceria');
                        for (var i = 0; i < json.length; i++) {
                            añadirOption('carroceria', json[i].nombre, json[i].id);
                        }
                    }
                    )
                    

                    

                    break;
                case 'electrico':
                    añadirOption('transmision', 'NO APLICA', '5');
                    break
                case '3':
                    eliminarDataOption('carroceria', 'Carroceria', 'carroceria');

                    eliminarDataOption('transmision', 'Transmision', 'transmision')
                    añadirOption('transmision', 'Mecanica', '1');
                    añadirOption('transmision', 'Automatica', '2');
                    añadirOption('transmision', 'Semiautomatica', '3');
                    añadirOption('transmision', 'Manumaticas', '4');

                    eliminarDataOption('traccion', 'Traccion', 'traccion')
                    añadirOption('traccion', 'FWD', '1');
                    añadirOption('traccion', 'RWD', '2');
                    añadirOption('traccion', 'AWD', '3');
                    añadirOption('traccion', '4x4', '4');

                    eliminarDataOption('cilindraje', 'Cilindraje', 'cilindraje');
                    eliminarDataOption('marca', 'Marca', 'marca');
                    eliminarDataOption('modelo', 'Modelo', 'modelo');

                  break;      
                default:

                    eliminarDataOption('transmision', 'Transmision', 'transmision')
                    eliminarDataOption('traccion', 'Traccion', 'traccion')


                    


                    break;
            }
        } else {
            if (name === 'marca') {
                eliminarDataOption('cilindraje', 'Cilindraje', 'cilindraje');
                eliminarDataOption('modelo', 'Modelo', 'modelo');
                try {
                    const dataModelo = getStaticPaths('http://localhost:3000/api/vehiculos/modelo/' + value + '-' + vehiculoo.carroceria);
                    dataModelo.then((datos) => {
                        var json = datos.data
                        for (var i = 0; i < json.length; i++) {
                            añadirOption('modelo', json[i].modelo, json[i].id);
                        }
                    }
                    )
                } catch (error) {

                }


            } else {
                if (name === 'modelo') {
                    if (value != 'modelo') {
                        eliminarDataOption('cilindraje', 'Cilindraje', 'cilindraje');
                        const dataCilindraje = getStaticPaths('http://localhost:3000/api/vehiculos/cilindraje/' + value);
                        dataCilindraje.then((datos) => {
                            var json = datos.data
                            for (var i = 0; i < json.length; i++) {
                                añadirOption('cilindraje', json[i].cilindraje, json[i].id);
                            }
                        }
                        )
                    } else {
                        eliminarDataOption('cilindraje', 'Cilindraje', 'cilindraje');
                    }
                } else {
                    if (name === 'combustible') {
                        if (value === '3') {
                            eliminarDataOption('transmision', 'Transmision', 'transmision');
                            añadirOption('transmision', 'NO APLICA', '5');
                        } else {
                            eliminarDataOption('transmision', 'Transmision', 'transmision');
                            añadirOption('transmision', 'Mecanico', '1');
                            añadirOption('transmision', 'Automatica', '2');
                            añadirOption('transmision', 'Semiautomatica', '3');
                            añadirOption('transmision', 'Manumáticas', '4');

                        }

                    } else {
                        if (name === 'carroceria') {
                            eliminarDataOption('modelo', 'Modelo', 'modelo');
                            eliminarDataOption('cilindraje', 'Cilindraje', 'cilindraje');
                            

                            const dataMarcaEnCarroceria = getStaticPaths('http://localhost:3000/api/vehiculos/marca/'+vehiculoo.tipo);

                            dataMarcaEnCarroceria.then((datos) => {
                                var json = datos.data
                                eliminarDataOption('marca', 'Marca', 'marca');
                                for (var i = 0; i < json.length; i++) {
                                    añadirOption('marca', json[i].marca, json[i].id);
                                }
                            }
                            )
                        }
                    }
                }
            }
        }
        setVehiculoo({ ...vehiculoo, [name]: value })
    }

    return (
        <div>
            <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
                <div className='rounded-lg bg-purple-50 w-[550px] flex flex-col'>
                    <div className=' p-2 rounded'>
                        <button className='text-red text-xl place-self-end' onClick={() => {
                            if (vehiculos.length < 1) {
                                document.getElementById("botonagregarvehiculo").innerHTML = ('+ Agregar vehiculo')
                            }
                            onClose()
                        }


                        }>X</button>
                        <center>
                            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                                <div class="flex flex-wrap -mx-3 mb-2">
                                    <h5 class="text-xl font-bold leading-none text-blue-800 dark:text-white">Agrega tu vehiculo para filtrar tu busqueda</h5>
                                </div>
                                <br></br>

                                <div className="flex flex-wrap -mx-3 mb-2">
                                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                            Tipo de vehiculo
                                        </label>
                                        <div class="relative">

                                            <select name='tipo' id='tipo' onChange={handleChange} className="rounded-full block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8  leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                <option value="tipo">Tipo vehiculo</option>
                                                <option value="1" >Moto</option>
                                                <option value="2">Carro</option>
                                                <option value="3">Buses</option>
                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                            Carroceria
                                        </label>
                                        <div class="relative">

                                            <select name='carroceria' id='carroceria' onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                <option value="carroceria">Carroceria</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                            Marca
                                        </label>
                                        <div class="relative">

                                            <select name='marca' id='marca' onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                <option value="marca">Marca</option>
                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-2">
                                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                            año
                                        </label>
                                        <div class="relative">
                                            <select name='año' id='año' onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                <option value="año">Año</option>
                                                <option value="2011">2011</option>
                                                <option value="2012">2012</option>
                                                <option value="2013">2013</option>
                                                <option value="2014">2014</option>
                                                <option value="2015">2015</option>
                                                <option value="2016">2016</option>
                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                            Modelo
                                        </label>
                                        <div class="relative">
                                            <select name='modelo' id='modelo' onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                <option value="modelo">Modelo</option>
                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                            Cilindraje
                                        </label>
                                        <div class="relative">
                                            <select name='cilindraje' id='cilindraje' onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                <option value="cilindraje">Cilindraje</option>
                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-2">
                                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                            Combustible
                                        </label>
                                        <div class="relative">
                                            <select name='combustible' id='combustible' onChange={handleChange} className="rounded-full block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                <option value="combustible">Combustible</option>
                                                <option value="1">Gasolina</option>
                                                <option value="2">Disel</option>
                                                <option value="3">Electrico</option>
                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                            Transmision
                                        </label>
                                        <div class="relative">
                                            <select name='transmision' id='transmision' onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                <option value="transmision">Transmision</option>
                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                            Traccion
                                        </label>
                                        <div class="relative">
                                            <select name='traccion' id='traccion' onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                <option value="traccion">Traccion</option>

                                            </select>
                                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='rounded-full bg-blue-800 text-white hover:bg-skay-600 px-4 py-2'>Agregar</button>
                            </form>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalVehiculos

