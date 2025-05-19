const mysql = require('mysql2/promise');

// Tietokantayhteyden asetukset
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'tododb'
};

// Luo yhteyden tietokantaan
const getConnection = async () => {
  try {
    return await mysql.createConnection(dbConfig);
  } catch (error) {
    console.error('Database connection failed:', error);
    // Yritetään uudelleen 5 sekunnin päästä, jos tietokanta ei ole vielä valmis
    console.log('Retrying in 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    return getConnection();
  }
};

// Alustaa tietokannan
const init = async () => {
  try {
    const connection = await getConnection();
    console.log('Connected to database successfully!');
    
    // Luodaan todos-taulu, jos sitä ei ole
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database initialized successfully');
    connection.end();
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

// Hakee kaikki tehtävät
const getAllTodos = async () => {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM todos ORDER BY created_at DESC');
  connection.end();
  return rows;
};

// Lisää uuden tehtävän
const addTodo = async (task) => {
  const connection = await getConnection();
  const [result] = await connection.execute('INSERT INTO todos (task) VALUES (?)', [task]);
  connection.end();
  return result;
};

// Poistaa tehtävän
const deleteTodo = async (id) => {
  const connection = await getConnection();
  await connection.execute('DELETE FROM todos WHERE id = ?', [id]);
  connection.end();
};

module.exports = {
  init,
  getAllTodos,
  addTodo,
  deleteTodo
};