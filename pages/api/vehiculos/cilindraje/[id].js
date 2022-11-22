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
const obtenerVehiculo = async (req, res) => {

    var ur = getNumbersInString(req.url);

    const [result] = await pool.query('SELECT * FROM cilindraje WHERE id_modelo = '+ur);

    return res.status(200).json(result);

}

