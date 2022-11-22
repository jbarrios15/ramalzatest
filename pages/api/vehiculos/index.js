import { pool } from '../../../config/db'


export default async function handler(req, res) {

    switch (req.method) {
        case 'GET':

            return await obtenerVehiculo(req, res)

        case 'POST':

            return await guardarVehiculo(req, res)

            break;
        case 'DELETE':

            break;
        default:
            return res.status(500).json({ succes: false, error: 'Falla de servidor' });
    }


}

const guardarVehiculo = async (req, res) => {
    const { id, id_usuario, id_tipo, id_carroceria, id_marca, id_año, id_transmision, id_combustible, id_traccion, id_cilindraje, id_modelo } = req.body;

    const [result] = await pool.query('INSERT INTO vehiculos_usuarios SET ?', {
        id,
        id_usuario,
        id_tipo,
        id_carroceria,
        id_marca,
        id_año,
        id_transmision,
        id_combustible,
        id_traccion,
        id_cilindraje,
        id_modelo,
    });
    console.log(result);
    return res
        .status(200)
        .json({
            id, id_usuario, id_carroceria, id_marca, id_año, id_transmision, id_combustible, id_traccion
            , id_traccion, id_cilindraje, id_modelo
        });
}

const obtenerVehiculo = async (req, res) => {

    const [result] = await pool.query('SELECT * FROM vehiculos_usuarios');

    return res.status(200).json(result);

}

