const postgresHost = process.env.mode === 'docker' ? 'db' : 'localhost';
const mongoHost = process.env.mode === 'docker' ? 'mongodb://dbmongo:27017' : 'mongodb://localhost:27017';

export default {
  postgresHost, mongoHost
}
