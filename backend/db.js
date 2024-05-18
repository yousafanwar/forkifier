import pg from 'pg';
const  Pool  = pg.Pool;
 
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'Forkify',
  user: 'postgres',
  password: 'Blackwind@007',
})

export default pool;