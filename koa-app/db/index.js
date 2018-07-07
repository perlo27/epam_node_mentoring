const Sequelize = require('sequelize');

export default new Sequelize('postgres', 'postgres', null, {
  host: 'db',
  dialect: 'postgres',


  pool: {
    max: 5,
    min: 0
  }
});
// export default new Sequelize('postgres://nmp:nmp@postgres/nmpdb');
//name nmp-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres