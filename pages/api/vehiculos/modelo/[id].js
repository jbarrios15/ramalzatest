import { pool } from '../../../../config/db'


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

function getNumSlash(string,divisor,posicion) {
    let arr = string.split(divisor);
    return arr[posicion];
   
}
function getNumSlash2(string) {
    let arr = string.split('/');
   
    return arr[4];
   
}
function getNumSlash3(string) {
    let arr = string.split('-');
    return arr[0];
   
}
function getNumSlash4(string) {
    let arr = string.split('-');
    return arr[1];
   
}

const obtenerVehiculo = async (req, res) => {
    var urprin = getNumSlash2(req.url)
    var ir1 = getNumSlash3(urprin)
    var ir2 = getNumSlash4(urprin)

    const [result] = await pool.query('SELECT * FROM modelos_vehiculos WHERE id_marca = '+ir1+' AND tipo_carroceria='+ir2);

    return res.status(200).json(result);

}

