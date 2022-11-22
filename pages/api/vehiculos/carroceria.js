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
            return res.status(500).json({succes:false,error: 'Falla de servidor'});
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

const obtenerVehiculo = async (req, res) => {
       

        const [result] = await pool.query('SELECT * FROM carrocerias');
        
        return res.status(200).json(result);
    
}

