// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {pool} from '../../config/db';

export default async function handler(req, res) {

  const [rows] = await pool.query('SELECT * from carrocerias');

  console.log(rows[1]['nombre'])

  return res.status(200).json(rows);
}
