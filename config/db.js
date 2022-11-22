import {createPool} from 'mysql2/promise';

const pool = createPool({
    host: '149.62.37.204',
    user: 'u236294718_adminre',
    password: 'Erpsiesa2018*',
    port: '3306',
    database: 'u236294718_ramalza'
})

export {pool};