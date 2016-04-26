const r = require('rethinkdb');

module.exports = {
  establishConnection: async() => {
    return await r.connect({host: 'localhost', port: 28015});
  },

  init: async({name, tables}, conn) => {
    let db;
    const dbName = name || process.env.NODE_ENV;
    try {
      db = await r.dbCreate(dbName).run(conn);
      for (let table of tables) {
        await r.db(dbName).tableCreate(table).run(conn);
      }
    } catch (err) {
      throw(err);
    }
    return db;
  },

  drop: async(name, conn) => {
    await r.dbDrop(name).run(conn);
  },

  closeConnection: async(conn) => {
    await conn.close();
  }
};
