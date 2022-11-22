import { pool } from '../../../config/db'


export default async function handler(req, res) {

    switch (req.method) {
        case 'GET':

            return await obtenerVehiculo(req, res)

        case 'POST':

            return await guardarVehiculo(req, res)

            break;
        case 'DELETE':

            return await deleteVehiculo(req,res)
            
            break;
        default:
            return res.status(500).json({ succes: false, error: 'Falla de servidor' });
    }


}

const guardarVehiculo = async (req, res) => {
    const { name, descripcion, price } = req.body;

    const [result] = await pool.query('INSERT INTO productos SET ?', {
        name,
        descripcion,
        price
    });
    console.log(result);
    setpd([result])
    return res
        .status(200)
        .json({ name, price, descripcion, id: result.insertId });
}
function getNumbersInString(string) {
    var tmp = string.split("");
    var map = tmp.map(function (current) {
        if (!isNaN(parseInt(current))) {
            return current;
        }
    });

    var numbers = map.filter(function (value) {
        return value != undefined;
    });

    return numbers.join("");
}

function getNumSlash(string) {
    let arr = string.split('/');
    return arr[3];
    console.log(arr[3]); // "tipo"
}
const obtenerVehiculo = async (req, res) => {
   
    
    const [result] = await pool.query('SELECT v.id,v.id_usuario,tipo.nombre as id_tipo,carroceria.nombre as id_carroceria,modelo.modelo as id_modelo,marca.marca as id_marca,v.id_año,transmision.transmicion as id_transmision,combustible.combustible as id_combustible,traccion.traccion as id_traccion,cili.cilindraje as id_cilindraje FROM vehiculos_usuarios v LEFT JOIN tipo_vehiculos tipo ON tipo.id = v.id_tipo LEFT JOIN carrocerias carroceria ON carroceria.id = v.id_carroceria LEFT JOIN marcas_vehiculos marca ON marca.id = v.id_marca LEFT JOIN transmisiones_vehiculos transmision ON transmision.id = v.id_transmision LEFT JOIN combustibles combustible ON combustible.id = v.id_combustible LEFT JOIN tracciones traccion ON traccion.id = v.id_traccion LEFT JOIN cilindraje cili ON cili.id = v.id_cilindraje LEFT JOIN modelos_vehiculos modelo ON modelo.id = v.id_modelo  WHERE v.id = "'+getNumSlash(req.url)+'"');

    return res.status(200).json(result);

}
const deleteVehiculo = async (req,res) => {
    const [result] = await pool.query('DELETE FROM vehiculos_usuarios WHERE id = "'+getNumSlash(req.url)+'"');

    return res.status(200).json(result);
}

