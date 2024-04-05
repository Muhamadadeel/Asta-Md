let randomeFunfacts = require("../lib")
let options = {
  bot_: "assets JSON DEFAULT '{}' ",
  sck1: "rank JSON DEFAULT '{}' ",
  sck: "disables TEXT[] DEFAULT ARRAY[]::TEXT[] ",
  tempdb: "creator TEXT DEFAULT 'Asta-SER'",
};
let optJson = {
  bot_: {},
  sck1: {
    rank: {},
  },
  sck: {},
  tempdb: {},
};
const { sck1 } = require(__dirname + "/database/user");
const { sck } = require(__dirname + "/database/group");
const { alive } = require(__dirname + "/database/alive");
const { dbtemp } = require(__dirname + "/database/tempdb");
const { Pool } = require("pg");
let pg = {};
const fs = require("fs");
let pgtables = {
  bot_: `CREATE TABLE IF NOT EXISTS bot_ (
id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'Asta-Md',
alive_text TEXT DEFAULT '&user *I am alive and have this for you:* &quotes',
alive_url VARCHAR(255) DEFAULT '',
alive_image BOOLEAN DEFAULT false,
alive_video BOOLEAN DEFAULT false,
permit BOOLEAN DEFAULT false,
permit_values VARCHAR(255) DEFAULT '212',
chatbot VARCHAR(255) DEFAULT 'false',
bgm BOOLEAN DEFAULT false,
bgmarray JSON DEFAULT '{}',
plugins JSON DEFAULT '{}',
notes JSON DEFAULT '{}',
antiviewonce VARCHAR(255) DEFAULT 'true',
antidelete VARCHAR(255) DEFAULT 'true',
autobio VARCHAR(255) DEFAULT 'false',
levelup VARCHAR(255) DEFAULT 'true',
autoreaction VARCHAR(255) DEFAULT 'true',
anticall VARCHAR(255) DEFAULT 'true',
mention JSON DEFAULT '{}',
filter JSON DEFAULT '{}',
afk JSON DEFAULT '{}',
rent JSON DEFAULT '{}',
\n);`,
  sck1: `CREATE TABLE IF NOT EXISTS sck1 (
id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'Asta-Md',
name VARCHAR(255) DEFAULT 'Unknown',
times INTEGER DEFAULT 0,
permit VARCHAR(255) DEFAULT 'false',
ban VARCHAR(255) DEFAULT 'false',
afk VARCHAR(255) DEFAULT 'false',
afktime INTEGER DEFAULT 0,
bot BOOLEAN DEFAULT false,
msg JSON DEFAULT '{}',
warn JSON DEFAULT '{}' 
\n);`,
  sck: `CREATE TABLE IF NOT EXISTS Sck (
id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'Asta_Md',
events VARCHAR(255) DEFAULT 'false',
nsfw VARCHAR(255) DEFAULT 'false',
pdm VARCHAR(255) DEFAULT 'false',
antipromote VARCHAR(255) DEFAULT 'false',
antidemote VARCHAR(255) DEFAULT 'false',
welcome VARCHAR(255) DEFAULT 'false',
goodbye VARCHAR(255) DEFAULT 'false',
welcometext TEXT DEFAULT '*@user @pp Welcome to @gname',
goodbyetext TEXT DEFAULT '@user @pp left @gname',
botenable VARCHAR(255) DEFAULT 'true',
antilink VARCHAR(255) DEFAULT 'false',
antiword JSON DEFAULT '{}',
antifake VARCHAR(255) DEFAULT 'false',
antispam VARCHAR(255) DEFAULT 'false',
antitag VARCHAR(255) DEFAULT 'false',
antibot VARCHAR(255) DEFAULT 'false',
onlyadmin VARCHAR(255) DEFAULT 'false',
economy VARCHAR(255) DEFAULT 'false',
disablecmds VARCHAR(255) DEFAULT 'false',
chatbot VARCHAR(255) DEFAULT 'false',
mute VARCHAR(255) DEFAULT 'false',
unmute VARCHAR(255) DEFAULT 'false'" + (options.sck ? ",\n " + options.sck : "") + " \n  );`,
  tempdb: `CREATE TABLE IF NOT EXISTS tempdb (
   id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'Asta-MD',
   data JSON DEFAULT '{}'" + (options.tempdb ? ",
" + options.tempdb : "") + " \n  );`,
};
global.DATABASE_URL =
  global.DATABASE_URL || global.DATABASE_URI || process.env.DATABASE_URL;
let cacheTable = {};
global.pool = global.pool || false;
pg.connnectpg = () => {
  pool = new Pool({
    connectionString: global.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  pool.on("connect", () => {
    cacheTable.connnectpg = true;
    sqldb = true;
    return sqldb;
  });
  pool.on("error", (_0x18b37d) => {
    console.log("PostgreSQL database error:");
    setTimeout(pg.connnectpg, 1000);
  });
};
pg.createTable = async (tableName) => {
  if ((!sqldb && !cacheTable.connectpg) || (!pool && global.sqldb)) {
    const connectionResult = pg.connectpg();
    if (!connectionResult) {
      return false;
    }
  }
  if (cacheTable[tableName]) {
    return true;
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(pgtables[tableName]);
    await client.query("COMMIT");
    if (!cacheTable[tableName]) {
      console.log(`PostgreSQL ${tableName} Table created in Database.`);
    }
    cacheTable[tableName] = true;
    return true;
  } catch (error) {
    console.log(`Error creating PostgreSQL ${tableName} Table:`, error);
  } finally {
    client.release();
  }
};
pg.new = async (tableName, data) => {
  if (!(await pg.createTable(tableName))) {
    return false;
  }
  const client = await pool.connect();
  try {
    if (await pg.findOne(tableName, data)) {
      return await pg.updateOne(tableName, { id: data.id }, data);
    }
    await client.query("BEGIN");
    const query = `
      INSERT INTO ${tableName} (${Object.keys(data).join(", ")})
      VALUES (${Object.keys(data)
        .map((_, index) => `$${index + 1}`)
        .join(", ")})
      ON CONFLICT (id) DO NOTHING
      RETURNING *;
    `;
    const values = Object.values(data);
    const result = await client.query(query, values);
    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(`Error inserting new row into ${tableName}\n`, error);
  } finally {
    client.release();
  }
};
pg.countDocuments = async (tableName) => {
  if (!(await pg.createTable(tableName))) {
    return 0;
  }
  const client = await pool.connect();
  try {
    const result = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
    return parseInt(result.rows[0].count);
  } catch (error) {
    return 0;
  } finally {
    client.release();
  }
};
pg.findOne = async (tableName, data) => {
  if (!(await pg.createTable(tableName))) {
    return false;
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM ${tableName} WHERE id = $1`,
      [data.id]
    );
    return result.rows[0];
  } catch (error) {
    console.log(
      `Error while finding ${tableName} document by Id: ${data.id}\n`,
      error
    );
    return false;
  } finally {
    client.release();
  }
};
pg.find = async (tableName, query = {}) => {
  if (!(await pg.createTable(tableName))) {
    return [];
  }
  const client = await pool.connect();
  try {
    let values = Object.values(query);
    if (!values || !values[0]) {
      return (await client.query(`SELECT * FROM ${tableName}`)).rows || [];
    } else if (query.id) {
      return [{ ...(await pg.findOne(tableName, query)) }] || [];
    }
  } catch (error) {
    console.log(`Error while find ${tableName} documents`, error);
    return [];
  } finally {
    client.release();
  }
};
pg.updateOne = async (tableName, selector, update = {}) => {
  if (!(await pg.createTable(tableName))) {
    return false;
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const selectQuery = `SELECT * FROM ${tableName} WHERE id = $1 FOR UPDATE`;
    const selectResult = await client.query(selectQuery, [selector.id]);
    if (selectResult.rows[0]) {
      const updateQuery = `UPDATE ${tableName} SET ${Object.keys(update)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(", ")} WHERE id = $1 RETURNING *;`;
      const updateValues = [selector.id, ...Object.values(update)];
      const updateResult = await client.query(updateQuery, updateValues);
      await client.query("COMMIT");
      return updateResult.rows[0];
    } else {
      return await pg.new(tableName, { ...selector, ...update });
    }
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      `Error while finding and updating ${tableName} document by Id: ${selector.id}\n`,
      error
    );
    return [];
  } finally {
    client.release();
  }
};
pg.findOneAndDelete = async (tableName, selector) => {
  if (!(await pg.createTable(tableName))) {
    return false;
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const selectQuery = `SELECT * FROM ${tableName} WHERE id = $1 FOR UPDATE`;
    const selectResult = await client.query(selectQuery, [selector.id]);
    if (selectResult.rows[0]) {
      const deleteQuery = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`;
      const deleteResult = await client.query(deleteQuery, [selector.id]);
      await client.query("COMMIT");
      return deleteResult.rows[0];
    } else {
      return true;
    }
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      `Error while finding and deleting ${tableName} document by Id: ${selector.id}\n`,
      error
    );
    return false;
  } finally {
    client.release();
  }
};
pg.collection = {
  drop: async (tableName) => {
    if (!(await pg.createTable(tableName))) {
      return false;
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      await client.query(`DROP TABLE IF EXISTS ${tableName}`);
      await client.query("COMMIT");
      delete cacheTable[tableName];
      return true;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(`Error while dropping ${tableName} table\n`, error);
      return false;
    } finally {
      client.release();
    }
  },
};

let dbs = {
  newtables: {
    bot_: {
      id: "Asta_Md",
      alive_text: "&user i am online",
      alive_get:
        "you did'nt set alive message yet\nType [.alive info] to get alive info",
      alive_url: "",
      alive_image: false,
      alive_video: false,
      permit: false,
      permit_values: "all",
      chatbot: "false",
      antiviewonce: "true",
      antidelete: "true",
      autobio: "false",
      levelup: "false",
      anticall: "true",
      autoreaction: "true",
      bgm: false,
      bgmarray: {},
      plugins: {},
      notes: {},
      warn: {},
      afk: {},
      filter: {},
      mention: {},
      rent: {},
      ...(optJson.bot_ || {}),
    },
    sck: {
      id: "Asta_Md",
      events: "false",
      nsfw: "false",
      pdm: "false",
      antipromote: "false",
      antidemote: "false",
      welcome: "false",
      goodbye: "false",
      welcometext: "@user @pp Welcome to @gname",
      goodbyetext: "@user @pp left @gname",
      botenable: "true",
      antilink: "false",
      antiword: {},
      antifake: "false",
      antispam: "false",
      antitag: "false",
      antibot: "false",
      onlyadmin: "false",
      economy: "false",
      disablecmds: "false",
      chatbot: "false",
      mute: "false",
      unmute: "false",
      ...(optJson.sck || {}),
    },
    sck1: {
      id: "chatid",
      name: "Unknown",
      times: 0,
      permit: "false",
      ban: "false",
      warn: {},
      ...(optJson.sck1 || {}),
    },
    tempdb: {
      id: "chatid",
      data: {},
      ...(optJson.tempdb || {}),
    },
  },
};
dbs.loadGroupData = async (groupName) => {
  try {
    const filePath = `${__dirname}/${groupName}.json`;
    if (fs.existsSync(filePath)) {
      return await JSON.parse(fs.readFileSync(filePath, "utf8"));
    } else {
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2), "utf8");
      return {};
    }
  } catch (error) {
    console.error("Error loading group data:", error);
    return {};
  }
};
dbs.saveGroupData = async (groupName, data = {}) => {
  const filePath = `${__dirname}/${groupName}.json`;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};
dbs.countDocuments = async (groupName) => {
  try {
    const groupData = await dbs.loadGroupData(groupName);
    const documentKeys = Object.keys(groupData);
    return documentKeys.length;
  } catch (error) {
    console.log(
      `Error while countDocuments of ${groupName} in database,\n`,
      error
    );
    return 0;
  }
};
dbs.new = async (groupName, data) => {
  try {
    const groupData = await dbs.loadGroupData(groupName);
    if (!groupData[data.id]) {
      groupData[data.id] = { ...dbs.newtables[groupName], ...data };
      await dbs.saveGroupData(groupName, groupData);
      return groupData[data.id];
    } else {
      return groupData[data.id];
    }
  } catch (error) {
    console.log(`Error while Creating new ${groupName} in database,\n`, error);
    return {};
  }
};
dbs.findOne = async (groupName, query) => {
  try {
    const groupData = await dbs.loadGroupData(groupName);
    if (groupData[query.id]) {
      return groupData[query.id];
    } else {
      return;
    }
  } catch (error) {
    console.log(`Error while findOne ${groupName} in database,\n`, error);
    return;
  }
};
dbs.find = async (groupName, query = {}) => {
  try {
    const queryValues = Object.values(query);
    const groupData = await dbs.loadGroupData(groupName);
    if (groupData[query.id]) {
      return [{ ...groupData[query.id] }];
    } else if (!queryValues[0]) {
      return Object.values(groupData);
    }
    return [];
  } catch (error) {
    console.log(`Error while finding ${groupName}(s) in database,\n`, error);
    return [];
  }
};
dbs.updateOne = async (groupName, selector, update = {}) => {
  try {
    const groupData = await dbs.loadGroupData(groupName);
    if (groupData[selector.id]) {
      groupData[selector.id] = { ...groupData[selector.id], ...update };
      await dbs.saveGroupData(groupName, groupData);
      return groupData[selector.id];
    } else {
      return await dbs.new(groupName, { ...selector, ...update });
    }
  } catch (error) {
    console.log(`Error while updateOne ${groupName} in database,\n`, error);
    return {};
  }
};
dbs.findOneAndDelete = async (groupName, selector) => {
  try {
    const groupData = await dbs.loadGroupData(groupName);
    delete groupData[selector.id];
    await dbs.saveGroupData(groupName, groupData);
    return true;
  } catch (error) {
    console.log(
      `Error while findOneAndDelete ${groupName} in database,\n`,
      error
    );
    return null;
  }
};
dbs.delete = dbs.findOneAndDelete;
dbs.collection = {
  drop: async (groupName) => {
    try {
      const groupData = await dbs.loadGroupData(groupName);
      const keys = Object.keys(groupData);
      keys.forEach((key) => delete groupData[key]);
      await dbs.saveGroupData(groupName, groupData);
      return true;
    } catch (error) {
      console.log(
        `Error while collection.drop all users in ${groupName} database,\n`,
        error
      );
      return null;
    }
  },
};
dbs.deleteAll = dbs.collection.drop;
let groupdb = {};
groupdb.countDocuments = async () => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      return await sck.countDocuments();
    } else if (sqldb && pg) {
      return await pg.countDocuments("sck");
    } else {
      return await dbs.countDocuments("sck");
    }
  } catch (error) {
    console.log("Error while counting documents in database,\n", error);
    return 0;
  }
};
groupdb.new = async (data) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      const existingData = await sck.findOne({ id: data.id });
      const newData =
        existingData || (await new sck({ id: data.id, ...data }).save());
      return newData;
    } else if (sqldb && pg) {
      const existingData = await pg.findOne("sck", { id: data.id });
      const newData = existingData || (await pg.new("sck", data));
      return newData;
    } else {
      const existingData = await dbs.findOne("sck", { id: data.id });
      const newData = existingData || (await dbs.new("sck", data));
      return newData;
    }
  } catch (error) {
    console.log("Error while creating new data in database,\n", error);
    return {};
  }
};
groupdb.findOne = async (query) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      return await sck.findOne({ id: query.id });
    } else if (sqldb && pg) {
      return await pg.findOne("sck", query);
    } else {
      const result = await dbs.findOne("sck", { id: query.id });
      return result;
    }
  } catch (error) {
    console.log("Error while finding data in database,\n", error);
    return;
  }
};
groupdb.find = async (query) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      const result = await sck.find(query);
      return result;
    } else if (sqldb && pg) {
      return await pg.find("sck", query);
    } else {
      return await dbs.find("sck", query);
    }
  } catch (error) {
    console.log("Error while finding data in database,\n", error);
    return [];
  }
};
groupdb.updateOne = async (selector, update = {}) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (!selector.id) {
      return {};
    }
    if (isMongodb) {
      return await sck.updateOne({ id: selector.id }, { ...update });
    } else if (sqldb && pg) {
      return await pg.updateOne("sck", { id: selector.id }, update);
    } else {
      return await dbs.updateOne("sck", selector, update);
    }
  } catch (error) {
    console.log("Error while updating data in database,\n", error);
    return {};
  }
};
groupdb.findOneAndDelete = async (selector) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (!selector.id) {
      return [];
    }
    if (isMongodb) {
      return await sck.findOneAndDelete({ id: selector.id });
    } else if (sqldb && pg) {
      return await pg.findOneAndDelete("sck", selector);
    } else {
      return await dbs.findOneAndDelete("sck", selector);
    }
  } catch (error) {
    console.log("Error while deleting data in database,\n", error);
    return null;
  }
};
groupdb.delete = groupdb.findOneAndDelete;
groupdb.collection = {
  drop: async () => {
    try {
      if (!global.AstaOfficial) {
        return;
      }
      if (isMongodb) {
        return await sck.collection.drop();
      } else if (sqldb && pg) {
        return await pg.collection.drop("sck");
      } else {
        return await dbs.collection.drop("sck");
      }
    } catch (_0x523825) {
      console.log(
        "Error while collection.drop all user in database,\n",
        _0x523825
      );
      return null;
    }
  },
};
let userdb = {};
userdb.countDocuments = async () => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      return await sck1.countDocuments();
    } else if (sqldb && pg) {
      return await pg.countDocuments("sck1");
    } else {
      return await dbs.countDocuments("sck1");
    }
  } catch (error) {
    console.log(
      "Error from userdb.countDocuments() in user database,\n",
      error
    );
    return 0;
  }
};
userdb.new = async (data) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      const existingData = await sck1.findOne({ id: data.id });
      const newData =
        existingData || (await new sck1({ id: data.id, ...data }).save());
      return newData;
    } else if (sqldb && pg) {
      const existingData = await pg.findOne("sck1", { id: data.id });
      const newData = existingData || (await pg.new("sck1", data));
      return newData;
    } else {
      const existingData = await dbs.findOne("sck1", { id: data.id });
      const newData = existingData || (await dbs.new("sck1", data));
      return newData;
    }
  } catch (error) {
    console.log("Error userdb.new() in user database,\n", error);
    return {};
  }
};
userdb.findOne = async (query) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      return await sck1.findOne({ id: query.id });
    } else if (sqldb && pg) {
      return await pg.findOne("sck1", query);
    } else {
      const result = await dbs.findOne("sck1", { id: query.id });
      return result;
    }
  } catch (error) {
    console.log("Error userdb.findOne() in user database,\n", error);
    return;
  }
};
userdb.find = async (query) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      const result = await sck1.find(query);
      return result;
    } else if (sqldb && pg) {
      return await pg.find("sck1", query);
    } else {
      return await dbs.find("sck1", query);
    }
  } catch (error) {
    console.log("Error userdb.find() in user database,\n", error);
    return [];
  }
};
userdb.updateOne = async (selector, update = {}) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (!selector.id) {
      return {};
    }
    if (isMongodb) {
      return await sck1.updateOne({ id: selector.id }, { ...update });
    } else if (sqldb && pg) {
      return await pg.updateOne("sck1", { id: selector.id }, update);
    } else {
      return await dbs.updateOne("sck1", selector, update);
    }
  } catch (error) {
    console.log("Error userdb.updateOne() in user database,\n", error);
    return {};
  }
};
userdb.findOneAndDelete = async (selector) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (!selector.id) {
      return [];
    }
    if (isMongodb) {
      return await sck1.findOneAndDelete({ id: selector.id });
    } else if (sqldb && pg) {
      return await pg.findOneAndDelete("sck1", selector);
    } else {
      return await dbs.findOneAndDelete("sck1", selector);
    }
  } catch (error) {
    console.log("Error userdb.findOneAndDelete() in user database,\n", error);
    return null;
  }
};
userdb.delete = userdb.findOneAndDelete;
userdb.collection = {
  drop: async () => {
    try {
      if (!global.AstaOfficial) {
        return;
      }
      if (isMongodb) {
        return await sck1.collection.drop();
      } else if (sqldb && pg) {
        return await pg.collection.drop("sck1");
      } else {
        return await dbs.collection.drop("sck1");
      }
    } catch (_0x2969c3) {
      console.log(
        "Error userdb.collection.drop() in user database,\n",
        _0x2969c3
      );
      return null;
    }
  },
};
let alivedb = {};
alivedb.countDocuments = async () => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      return await alive.countDocuments();
    } else if (sqldb && pg) {
      return await pg.countDocuments("bot_");
    } else {
      return await dbs.countDocuments("bot_");
    }
  } catch (error) {
    console.log("Error while counting documents in database,\n", error);
    return 0;
  }
};
alivedb.new = async (data) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      const existingData = await alive.findOne({ id: data.id });
      const newData =
        existingData || (await new alive({ id: data.id, ...data }).save());
      return newData;
    } else if (sqldb && pg) {
      const existingData = await pg.findOne("bot_", { id: data.id });
      const newData = existingData || (await pg.new("bot_", data));
      return newData;
    } else {
      const existingData = await dbs.findOne("bot_", { id: data.id });
      const newData = existingData || (await dbs.new("bot_", data));
      return newData;
    }
  } catch (error) {
    console.log("Error while creating BOT INFO in database,\n", error);
    return {};
  }
};
alivedb.findOne = async (query) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      return await alive.findOne({ id: query.id });
    } else if (sqldb && pg) {
      return await pg.findOne("bot_", query);
    } else {
      const result = await dbs.findOne("bot_", { id: query.id });
      return result;
    }
  } catch (error) {
    console.log("Error while finding data in database,\n", error);
    return;
  }
};
alivedb.find = async (query) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      const result = await alive.find(query);
      return result;
    } else if (sqldb && pg) {
      return await pg.find("bot_", query);
    } else {
      return await dbs.find("bot_", query);
    }
  } catch (error) {
    console.log("Error while finding data in database,\n", error);
    return [];
  }
};
alivedb.updateOne = async (selector, update = {}) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (!selector.id) {
      return {};
    }
    if (isMongodb) {
      return await alive.updateOne({ id: selector.id }, { ...update });
    } else if (sqldb && pg) {
      return await pg.updateOne("bot_", { id: selector.id }, update);
    } else {
      return await dbs.updateOne("bot_", selector, update);
    }
  } catch (error) {
    console.log("Error while updating data in database,\n", error);
    return {};
  }
};
alivedb.findOneAndDelete = async (selector) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (!selector.id) {
      return [];
    }
    if (isMongodb) {
      return await alive.findOneAndDelete({ id: selector.id });
    } else if (sqldb && pg) {
      return await pg.findOneAndDelete("bot_", selector);
    } else {
      return await dbs.findOneAndDelete("bot_", selector);
    }
  } catch (error) {
    console.log("Error while deleting data in database,\n", error);
    return null;
  }
};
alivedb.delete = alivedb.findOneAndDelete;
alivedb.collection = {
  drop: async () => {
    try {
      if (!global.AstaOfficial) {
        return;
      }
      if (isMongodb) {
        return await alive.collection.drop();
      } else if (sqldb && pg) {
        return await pg.collection.drop("bot_");
      } else {
        return await dbs.collection.drop("bot_");
      }
    } catch (error) {
      console.log(
        "Error while collection.drop all user in database,\n",
        error
      );
      return null;
    }
  },
};
let tempdb = {};
tempdb.countDocuments = async () => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      return await dbtemp.countDocuments();
    } else if (sqldb && pg) {
      return await pg.countDocuments("tempdb");
    } else {
      return await dbs.countDocuments("tempdb");
    }
  } catch (error) {
    console.log("Error while counting documents in database,\n", error);
    return 0;
  }
};
tempdb.new = async (data) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      const existingData = await dbtemp.findOne({ id: data.id });
      const newData =
        existingData || (await new dbtemp({ id: data.id, ...data }).save());
      return newData;
    } else if (sqldb && pg) {
      const existingData = await pg.findOne("tempdb", { id: data.id });
      const newData = existingData || (await pg.new("tempdb", data));
      return newData;
    } else {
      const existingData = await dbs.findOne("tempdb", { id: data.id });
      const newData = existingData || (await dbs.new("tempdb", data));
      return newData;
    }
  } catch (error) {
    console.log("Error while creating new data in database,\n", error);
    return {};
  }
};
tempdb.findOne = async (query) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      return await dbtemp.findOne({ id: query.id });
    } else if (sqldb && pg) {
      return await pg.findOne("tempdb", query);
    } else {
      const result = await dbs.findOne("tempdb", { id: query.id });
      return result;
    }
  } catch (error) {
    console.log("Error while finding data in database,\n", error);
    return;
  }
};
tempdb.find = async (query) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (isMongodb) {
      const result = await dbtemp.find(query);
      return result;
    } else if (sqldb && pg) {
      return await pg.find("tempdb", query);
    } else {
      return await dbs.find("tempdb", query);
    }
  } catch (error) {
    console.log("Error while finding data in database,\n", error);
    return [];
  }
};
tempdb.updateOne = async (selector, update = {}) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (!selector.id) {
      return {};
    }
    if (isMongodb) {
      return await dbtemp.updateOne({ id: selector.id }, { ...update });
    } else if (sqldb && pg) {
      return await pg.updateOne("tempdb", { id: selector.id }, update);
    } else {
      return await dbs.updateOne("tempdb", selector, update);
    }
  } catch (error) {
    console.log("Error while updating data in database,\n", error);
    return {};
  }
};
tempdb.findOneAndDelete = async (selector) => {
  try {
    if (!global.AstaOfficial) {
      return;
    }
    if (!selector.id) {
      return [];
    }
    if (isMongodb) {
      return await dbtemp.findOneAndDelete({ id: selector.id });
    } else if (sqldb && pg) {
      return await pg.findOneAndDelete("tempdb", selector);
    } else {
      return await dbs.findOneAndDelete("tempdb", selector);
    }
  } catch (error) {
    console.log("Error while deleting data in database,\n", error);
    return null;
  }
};
tempdb.delete = tempdb.findOneAndDelete;
tempdb.collection = {
  drop: async () => {
    try {
      if (!global.AstaOfficial) {
        return;
      }
      if (isMongodb) {
        return await dbtemp.collection.drop();
      } else if (sqldb && pg) {
        return await pg.collection.drop("tempdb");
      } else {
        return await dbs.collection.drop("tempdb");
      }
    } catch (_0x32ad2c) {
      console.log(
        "Error while collection.drop all user in database,\n",
        _0x32ad2c
      );
      return null;
    }
  },
};
module.exports = {
  tempdb: tempdb,
  pg: pg,
  dbs: dbs,
  groupdb: groupdb,
  userdb: userdb,
  alivedb: alivedb,
  bot_: alivedb,
};
