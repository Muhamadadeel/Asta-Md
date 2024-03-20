let options = {
  bot_: "temp JSON DEFAULT '{}' ",
  sck1: "rank JSON DEFAULT '{}' ",
  sck: "disables TEXT[] DEFAULT ARRAY[]::TEXT[] ",
  tempdb: ""
};
let optJson = {
  bot_: {},
  sck1: {
    rank: {}
  },
  sck: {},
  tempdb: {}
};
const {
  sck1
} = require(__dirname + "/database/user");
const {
  sck
} = require(__dirname + "/database/group");
const {
  alive
} = require(__dirname + "/database/alive");
const {
  dbtemp
} = require(__dirname + "/database/tempdb");
const {
  Pool
} = require("pg");
let pool = new Pool({
  connectionString: global.DATABASE_URI,
  ssl: {
    rejectUnauthorized: false
  }
});
let pg = {};
const fs = require("fs");
let pgtables = {
  bot_: " \n      CREATE TABLE IF NOT EXISTS bot_ (\n        id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'Suhail-MD',\n        alive_text TEXT DEFAULT '*HEY &user* \n*ι αм σηℓιηє нσω ¢αη ι нєℓρ уσυ*',\n        alive_get TEXT DEFAULT 'you didnt set alive message yet',\n        alive_url VARCHAR(255) DEFAULT '',\n        alive_image BOOLEAN DEFAULT false,\n        alive_video BOOLEAN DEFAULT false,\n        permit BOOLEAN DEFAULT false,\n        permit_values VARCHAR(255) DEFAULT 'all',\n        chatbot VARCHAR(255) DEFAULT 'false',\n        bgm BOOLEAN DEFAULT false,\n        bgmarray JSON DEFAULT '{}',\n        plugins JSON DEFAULT '{}',\n        notes JSON DEFAULT '{}',\n        antiviewonce VARCHAR(255) DEFAULT 'true',\n        antidelete VARCHAR(255) DEFAULT 'true',\n        autobio VARCHAR(255) DEFAULT 'false',\n        levelup VARCHAR(255) DEFAULT 'true',\n        autoreaction VARCHAR(255) DEFAULT 'true',\n        anticall VARCHAR(255) DEFAULT 'true',\n        mention JSON DEFAULT '{}',\n        filter JSON DEFAULT '{}',\n        afk JSON DEFAULT '{}',\n        rent JSON DEFAULT '{}'" + (options.bot_ ? ",\n " + options.bot_ : "") + "          \n      );",
  sck1: "\nCREATE TABLE IF NOT EXISTS sck1 (\n  id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'ASTA-MD',\n  name VARCHAR(255) DEFAULT 'Unknown',\n  times INTEGER DEFAULT 0,\n  permit VARCHAR(255) DEFAULT 'false',\n  ban VARCHAR(255) DEFAULT 'false',\n  afk VARCHAR(255) DEFAULT 'false',\n  afktime INTEGER DEFAULT 0,\n  bot BOOLEAN DEFAULT false,\n  msg JSON DEFAULT '{}',\n  warn JSON DEFAULT '{}'" + (options.sck1 ? ",\n " + options.sck1 : "") + " \n);",
  sck: "CREATE TABLE IF NOT EXISTS Sck (\n  id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'Asta_Md',\n  events VARCHAR(255) DEFAULT 'false',\n  nsfw VARCHAR(255) DEFAULT 'false',\n  pdm VARCHAR(255) DEFAULT 'false',\n  antipromote VARCHAR(255) DEFAULT 'false',\n  antidemote VARCHAR(255) DEFAULT 'false',\n  welcome VARCHAR(255) DEFAULT 'false',\n  goodbye VARCHAR(255) DEFAULT 'false',\n  welcometext TEXT DEFAULT '*@user @pp Welcome to @gname',\n  goodbyetext TEXT DEFAULT '@user @pp left @gname\',\n  botenable VARCHAR(255) DEFAULT 'true',\n  antilink VARCHAR(255) DEFAULT 'false',\n  antiword JSON DEFAULT '{}',\n  antifake VARCHAR(255) DEFAULT 'false',\n  antispam VARCHAR(255) DEFAULT 'false',\n  antitag VARCHAR(255) DEFAULT 'false',\n  antibot VARCHAR(255) DEFAULT 'false',\n  onlyadmin VARCHAR(255) DEFAULT 'false',\n  economy VARCHAR(255) DEFAULT 'false',\n  disablecmds VARCHAR(255) DEFAULT 'false',\n  chatbot VARCHAR(255) DEFAULT 'false',\n  mute VARCHAR(255) DEFAULT 'false',\n  unmute VARCHAR(255) DEFAULT 'false'" + (options.sck ? ",\n " + options.sck : "") + " \n);",
  tempdb: "\nCREATE TABLE IF NOT EXISTS tempdb (\n  id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'Asta',\n  data JSON DEFAULT '{}'" + (options.tempdb ? ",\n " + options.tempdb : "") + " \n);"
};
let cacheTable = {};
pg.ConnectToSQL = () => {
  cacheTable.ConnectToSQL = true;
  pool = new Pool({
    connectionString: global.DATABASE_URI,
    ssl: {
      rejectUnauthorized: false
    }
  });
  pool.on("connect", () => {
    console.log("Connected to the PostgreSQL database.");
    sqldb = true;
    return sqldb;
  });
  pool.on("error", _0x1096c3 => {
    console.error("PostgreSQL database error :", _0x1096c3);
    sqldb = false;
    return sqldb;
  });
};
pg.createTable = async _0xd1bcc9 => {
  if (!sqldb && !cacheTable.ConnectToSQL) {
    let _0x322ca8 = pg.ConnectToSQL();
    if (!_0x322ca8) {
      return false;
    }
  }
  if (cacheTable[_0xd1bcc9]) {
    return true;
  }
  const _0x544f7f = await pool.connect();
  try {
    await _0x544f7f.query("BEGIN");
    await _0x544f7f.query(pgtables[_0xd1bcc9]);
    await _0x544f7f.query("COMMIT");
    if (!cacheTable[_0xd1bcc9]) {
      console.log("PostgreSQL " + _0xd1bcc9 + " Table created in Database.");
    }
    cacheTable[_0xd1bcc9] = true;
    return cacheTable[_0xd1bcc9];
  } catch (_0x3350a5) {
    await _0x544f7f.query("ROLLBACK");
    console.error("Error creating PostgreSQL " + _0xd1bcc9 + " Table:", _0x3350a5);
    return false;
  } finally {
    _0x544f7f.release();
  }
};
pg.countDocuments = async _0x3c22af => {
  if (!(await pg.createTable(_0x3c22af))) {
    return 0;
  }
  const _0x196d58 = await pool.connect();
  try {
    const _0x45c353 = await _0x196d58.query("SELECT COUNT(*) FROM " + _0x3c22af);
    return parseInt(_0x45c353.rows[0].count);
  } catch (_0x2b0ad8) {
    return 0;
  } finally {
    _0x196d58.release();
  }
};
pg.new = async (_0x2cb90b, _0x1bf674) => {
  if (!(await pg.createTable(_0x2cb90b))) {
    return false;
  }
  const _0x59294c = await pool.connect();
  try {
    await _0x59294c.query("BEGIN");
    if (await pg.findOne(_0x2cb90b, _0x1bf674)) {
      return await pg.updateOne(_0x2cb90b, {
        id: _0x1bf674?.id
      }, _0x1bf674);
    }
    const _0xae0b0d = "\n    INSERT INTO " + _0x2cb90b + " (" + Object.keys(_0x1bf674).join(", ") + ")\n    VALUES (" + Object.keys(_0x1bf674).map((_0x30d519, _0x246858) => "$" + (_0x246858 + 1)).join(", ") + ")\n    ON CONFLICT (id) DO NOTHING\n    RETURNING *;\n  ";
    const _0x53b9ca = Object.values(_0x1bf674);
    const _0x37ee76 = await _0x59294c.query(_0xae0b0d, _0x53b9ca);
    await _0x59294c.query("COMMIT");
    return _0x37ee76.rows[0];
  } catch (_0x5eaea9) {
    await _0x59294c.query("ROLLBACK");
    console.error("Error inserting new row into " + _0x2cb90b + "\n", _0x5eaea9);
    return false;
  } finally {
    _0x59294c.release();
  }
};
pg.findOne = async (_0x3febaf, _0x21aa89) => {
  if (!(await pg.createTable(_0x3febaf))) {
    return false;
  }
  const _0x979a41 = await pool.connect();
  try {
    const _0x14353f = await _0x979a41.query("SELECT * FROM " + _0x3febaf + " WHERE id = $1", [_0x21aa89?.id]);
    return _0x14353f.rows[0];
  } catch (_0xef73f) {
    console.error("Error while finding " + _0x3febaf + " document by Id: " + _0x21aa89?.id + "\n", _0xef73f);
    return false;
  } finally {
    _0x979a41.release();
  }
};
pg.find = async (_0x423e23, _0x464519 = {}) => {
  if (!(await pg.createTable(_0x423e23))) {
    return [];
  }
  const _0x357608 = await pool.connect();
  try {
    let _0x31d5e0 = Object.values(_0x464519);
    if (!_0x31d5e0 || !_0x31d5e0[0]) {
      return (await _0x357608.query("SELECT * FROM " + _0x423e23))?.rows || [];
    } else if (_0x464519?.id) {
      return [{
        ...(await pg.findOne(_0x423e23, _0x464519))
      }] || [];
    }
  } catch (_0x2aa9fd) {
    console.error("Error while find " + _0x423e23 + " documents", _0x2aa9fd);
    return [];
  } finally {
    _0x357608.release();
  }
};
pg.updateOne = async (_0x1d3ceb, _0x313a49, _0x32965a = {}) => {
  if (!(await pg.createTable(_0x1d3ceb))) {
    return false;
  }
  const _0x1f7a6e = await pool.connect();
  try {
    await _0x1f7a6e.query("BEGIN");
    const _0x17cb13 = "SELECT * FROM " + _0x1d3ceb + " WHERE id = $1 FOR UPDATE";
    const _0x10a871 = await _0x1f7a6e.query(_0x17cb13, [_0x313a49?.id]);
    if (_0x10a871.rows[0]) {
      const _0x3f631b = "UPDATE " + _0x1d3ceb + " SET " + Object.keys(_0x32965a).map((_0xa04ec3, _0x2c0864) => _0xa04ec3 + " = $" + (_0x2c0864 + 2)).join(", ") + " WHERE id = $1 RETURNING *;";
      const _0x5260a8 = [_0x313a49.id, ...Object.values(_0x32965a)];
      const _0x5cf099 = await _0x1f7a6e.query(_0x3f631b, _0x5260a8);
      await _0x1f7a6e.query("COMMIT");
      return _0x5cf099.rows[0];
    } else {
      return await pg.new(_0x1d3ceb, {
        ..._0x313a49,
        ..._0x32965a
      });
    }
  } catch (_0x4eda68) {
    await _0x1f7a6e.query("ROLLBACK");
    console.error("Error while finding and updating " + _0x1d3ceb + " document by Id: " + _0x313a49?.id + "\n", _0x4eda68);
    return [];
  } finally {
    _0x1f7a6e.release();
  }
};
pg.findOneAndDelete = async (_0x9e8ed2, _0x480c60) => {
  if (!(await pg.createTable(_0x9e8ed2))) {
    return false;
  }
  const _0x4e9349 = await pool.connect();
  try {
    await _0x4e9349.query("BEGIN");
    const _0x3c4870 = await _0x4e9349.query("SELECT * FROM " + _0x9e8ed2 + " WHERE id = $1 FOR UPDATE", [_0x480c60?.id]);
    if (_0x3c4870.rows[0]) {
      const _0x126663 = await _0x4e9349.query("DELETE FROM " + _0x9e8ed2 + " WHERE id = $1 RETURNING *", [_0x480c60.id]);
      await _0x4e9349.query("COMMIT");
      return _0x126663.rows[0];
    } else {
      return true;
    }
  } catch (_0x2895d2) {
    await _0x4e9349.query("ROLLBACK");
    console.error("Error while finding and deleting " + _0x9e8ed2 + " document by Id: " + _0x480c60?.id + "\n", _0x2895d2);
    return false;
  } finally {
    _0x4e9349.release();
  }
};
pg.collection = {
  drop: async _0x3e73a5 => {
    if (!(await pg.createTable(_0x3e73a5))) {
      return false;
    }
    const _0x3ddd8e = await pool.connect();
    try {
      await _0x3ddd8e.query("BEGIN");
      await _0x3ddd8e.query("DROP TABLE IF EXISTS " + _0x3e73a5);
      await _0x3ddd8e.query("COMMIT");
      delete cacheTable[_0x3e73a5];
      return true;
    } catch (_0x29156a) {
      await _0x3ddd8e.query("ROLLBACK");
      console.error("Error while dropping " + _0x3e73a5 + " table\n", _0x29156a);
      return false;
    } finally {
      _0x3ddd8e.release();
    }
  }
};
let dbs = {
  newtables: {
    bot_: {
      id: "Asta_Md",
      alive_text: "`ι αм σηℓιηє нσω ¢αη ι нєℓρ уσυ* \n\n_ι αм ᴍυℓтι ԃєνιᴄє ωнαтѕαρρ вσт`",
      alive_get: "you did'nt set alive message yet\nType [.alive info] to get alive info",
      alive_url: "",
      alive_image: false,
      alive_video: false,
      permit: false,
      permit_values: "all",
      chatbot: "false",
      antiviewonce: "true",
      antidelete: "true",
      autobio: "false",
      levelup: "true",
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
      ...optJson.bot_
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
      welcometext: "`@user @pp Welcome to @gname`",
      goodbyetext: "`@user @pp left @gname`",
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
      ...optJson.sck
    },
    sck1: {
      id: "chatid",
      name: "Unknown",
      times: 0,
      permit: "false",
      ban: "false",
      warn: {},
      ...optJson.sck1
    },
    tempdb: {
      id: "chatid",
      data: {},
      ...optJson.tempdb
    }
  }
};
dbs.loadGroupData = async _0x454841 => {
  try {
    if (fs.existsSync(__dirname + "/" + _0x454841 + ".json")) {
      return await JSON.parse(fs.readFileSync(__dirname + "/" + _0x454841 + ".json", "utf8"));
    } else {
      await fs.writeFileSync(__dirname + "/" + _0x454841 + ".json", JSON.stringify({}, null, 2), "utf8");
      return {};
    }
  } catch (_0x3a947d) {
    console.error("Error loading user data:", _0x3a947d);
    return {};
  }
};
dbs.saveGroupData = async (_0xe258b3, _0x35d38a = {}) => {
  await fs.writeFileSync(__dirname + "/" + _0xe258b3 + ".json", JSON.stringify(_0x35d38a, null, 2), "utf8");
};
dbs.countDocuments = async _0x5df56d => {
  try {
    let _0x4e855b = await dbs.loadGroupData(_0x5df56d);
    let _0x565007 = Object.keys(_0x4e855b);
    return _0x565007.length;
  } catch (_0x7f991e) {
    console.log("Error while countDocuments of " + _0x5df56d + " in database,\n", _0x7f991e);
    return 0;
  }
};
dbs.new = async (_0x598fa, _0x1455fb) => {
  try {
    let _0x39c3ca = await dbs.loadGroupData(_0x598fa);
    if (!_0x39c3ca[_0x1455fb.id]) {
      _0x39c3ca[_0x1455fb.id] = {
        ...dbs.newtables[_0x598fa],
        ..._0x1455fb
      };
      await dbs.saveGroupData(_0x598fa, _0x39c3ca);
      return _0x39c3ca[_0x1455fb.id];
    } else {
      return _0x39c3ca[_0x1455fb.id];
    }
  } catch (_0x1d770b) {
    console.log("Error while Creating new " + _0x598fa + " in database,\n", _0x1d770b);
    return {};
  }
};
dbs.findOne = async (_0x508f24, _0x37386d) => {
  try {
    let _0x4a56a4 = await dbs.loadGroupData(_0x508f24);
    if (_0x4a56a4[_0x37386d.id]) {
      return _0x4a56a4[_0x37386d.id];
    } else {
      return;
    }
  } catch (_0x1f409d) {
    console.log("Error while findOne " + _0x508f24 + " in database,\n", _0x1f409d);
    return;
  }
};
dbs.find = async (_0x4a619a, _0x44bffc = {}) => {
  try {
    let _0x353811 = Object.values(_0x44bffc);
    let _0x6ad616 = await dbs.loadGroupData(_0x4a619a);
    if (_0x6ad616[_0x44bffc.id]) {
      return [{
        ..._0x6ad616[_0x44bffc.id]
      }];
    } else if (!_0x353811[0]) {
      return Object.values(_0x6ad616);
    }
    return [];
  } catch (_0x663112) {
    console.log("Error while finding  " + _0x4a619a + "(s) in database,\n", _0x663112);
    return [];
  }
};
dbs.updateOne = async (_0x45a190, _0x180eaf, _0x2b0b65 = {}) => {
  try {
    let _0x21e198 = await dbs.loadGroupData(_0x45a190);
    if (_0x21e198[_0x180eaf.id]) {
      _0x21e198[_0x180eaf.id] = {
        ..._0x21e198[_0x180eaf.id],
        ..._0x2b0b65
      };
      await dbs.saveGroupData(_0x45a190, _0x21e198);
      return _0x21e198[_0x180eaf.id];
    } else {
      return await dbs.new(_0x45a190, {
        ..._0x180eaf,
        ..._0x2b0b65
      });
    }
  } catch (_0x246d11) {
    console.log("Error while updateOne " + _0x45a190 + " in database,\n", _0x246d11);
    return {};
  }
};
dbs.findOneAndDelete = async (_0x3b32bb, _0x23ccc5) => {
  try {
    let _0x3b48c5 = await dbs.loadGroupData(_0x3b32bb);
    delete _0x3b48c5[_0x23ccc5.id];
    await dbs.saveGroupData(_0x3b32bb, _0x3b48c5);
    return true;
  } catch (_0x42f576) {
    console.log("Error while findOneAndDelete " + _0x3b32bb + " in database,\n", _0x42f576);
    return null;
  }
};
dbs.delete = dbs.findOneAndDelete;
dbs.collection = {
  drop: async _0x4b06e5 => {
    try {
      let _0x5c916c = await dbs.loadGroupData(_0x4b06e5);
      Object.keys(_0x5c916c).forEach(_0x1de32c => delete _0x5c916c[_0x1de32c]);
      await dbs.saveGroupData(_0x4b06e5, _0x5c916c);
      return true;
    } catch (_0x1a2834) {
      console.log("Error while collection.drop all user in database,\n", _0x1a2834);
      return null;
    }
  }
};
dbs.deleteAll = dbs.collection.drop;
let groupdb = {};
groupdb.countDocuments = async () => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      return await sck.countDocuments();
    } else if (sqldb && pg) {
      return await pg.countDocuments("sck");
    } else {
      return await dbs.countDocuments("sck");
    }
  } catch (_0x5f488b) {
    console.log("Error while Creating user in database,\n", _0x5f488b);
    return 0;
  }
};
groupdb.new = async _0x4dc281 => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      let _0x129c50 = (await sck.findOne({
        id: _0x4dc281.id
      })) || (await new sck({
        id: _0x4dc281.id,
        ..._0x4dc281
      }).save());
      return _0x129c50;
    } else if (sqldb && pg) {
      var _0x13540b = (await pg.findOne("sck", {
        id: _0x4dc281.id
      })) || (await pg.new("sck", _0x4dc281));
      return _0x13540b;
    } else {
      var _0x13540b = (await dbs.findOne("sck", {
        id: _0x4dc281.id
      })) || (await dbs.new("sck", _0x4dc281));
      return _0x13540b;
    }
  } catch (_0x2968e5) {
    console.log("Error while Creating user in database,\n", _0x2968e5);
    return {};
  }
};
groupdb.findOne = async _0x8b0d9a => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      return await sck.findOne({
        id: _0x8b0d9a.id
      });
    } else if (sqldb && pg) {
      return await pg.findOne("sck", _0x8b0d9a);
    } else {
      var _0x2875f9 = await dbs.findOne("sck", {
        id: _0x8b0d9a.id
      });
      return _0x2875f9;
    }
  } catch (_0x44223d) {
    console.log("Error while finding user in database,\n", _0x44223d);
    return;
  }
};
groupdb.find = async _0x37a464 => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      let _0x2d693a = await sck.find(_0x37a464);
      return _0x2d693a;
    } else if (sqldb && pg) {
      return await pg.find("sck", _0x37a464);
    } else {
      return await dbs.find("sck", _0x37a464);
    }
  } catch (_0x437dae) {
    console.log("Error while finding user in database,\n", _0x437dae);
    return [];
  }
};
groupdb.updateOne = async (_0x414a80, _0x2e8e46 = {}) => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (!_0x414a80.id) {
      return {};
    }
    if (isMongodb) {
      return await sck.updateOne({
        id: _0x414a80.id
      }, {
        ..._0x2e8e46
      });
    } else if (sqldb && pg) {
      return await pg.updateOne("sck", {
        id: _0x414a80.id
      }, _0x2e8e46);
    } else {
      return await dbs.updateOne("sck", _0x414a80, _0x2e8e46);
    }
  } catch (_0x59865f) {
    console.log("Error while updateOne user in database,\n", _0x59865f);
    return {};
  }
};
groupdb.findOneAndDelete = async _0x580e59 => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (!_0x580e59.id) {
      return [];
    }
    if (isMongodb) {
      return await sck.findOneAndDelete({
        id: _0x580e59.id
      });
    } else if (sqldb && pg) {
      return await pg.findOneAndDelete("sck", _0x580e59);
    } else {
      return await dbs.findOneAndDelete("sck", _0x580e59);
    }
  } catch (_0x577c7e) {
    console.log("Error while findOneAndDelete user in database,\n", _0x577c7e);
    return null;
  }
};
groupdb.delete = groupdb.findOneAndDelete;
groupdb.collection = {
  drop: async () => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        return await sck.collection.drop();
      } else if (sqldb && pg) {
        return await pg.collection.drop("sck");
      } else {
        return await dbs.collection.drop("sck");
      }
    } catch (_0x3a905c) {
      console.log("Error while collection.drop all user in database,\n", _0x3a905c);
      return null;
    }
  }
};
let userdb = {};
userdb.countDocuments = async () => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      return await sck1.countDocuments();
    } else if (sqldb && pg) {
      return await pg.countDocuments("sck1");
    } else {
      return await dbs.countDocuments("sck1");
    }
  } catch (_0x5f2370) {
    console.log("Error from userdb.countDocuments() in user database,\n", _0x5f2370);
    return 0;
  }
};
userdb.new = async _0x29e7f3 => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      let _0x4dfda7 = (await sck1.findOne({
        id: _0x29e7f3.id
      })) || (await new sck1({
        id: _0x29e7f3.id,
        ..._0x29e7f3
      }).save());
      return _0x4dfda7;
    } else if (sqldb && pg) {
      var _0x1208b9 = (await pg.findOne("sck1", {
        id: _0x29e7f3.id
      })) || (await pg.new("sck1", _0x29e7f3));
      return _0x1208b9;
    } else {
      var _0x1208b9 = (await dbs.findOne("sck1", {
        id: _0x29e7f3.id
      })) || (await dbs.new("sck1", _0x29e7f3));
      return _0x1208b9;
    }
  } catch (_0x4f0839) {
    console.log("Error userdb.new() in user database,\n", _0x4f0839);
    return {};
  }
};
userdb.findOne = async _0x2de186 => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      return await sck1.findOne({
        id: _0x2de186.id
      });
    } else if (sqldb && pg) {
      return await pg.findOne("sck1", _0x2de186);
    } else {
      var _0x406a28 = await dbs.findOne("sck1", {
        id: _0x2de186.id
      });
      return _0x406a28;
    }
  } catch (_0x5ca85b) {
    console.log("Error userdb.findOne() in user database,\n", _0x5ca85b);
    return;
  }
};
userdb.find = async _0x455591 => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      let _0x10bd5f = await sck1.find(_0x455591);
      return _0x10bd5f;
    } else if (sqldb && pg) {
      return await pg.find("sck1", _0x455591);
    } else {
      return await dbs.find("sck1", _0x455591);
    }
  } catch (_0x13d700) {
    console.log("Error userdb.find() in user database,\n", _0x13d700);
    return [];
  }
};
userdb.updateOne = async (_0x5a8e82, _0x38b1cd = {}) => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (!_0x5a8e82.id) {
      return {};
    }
    if (isMongodb) {
      return await sck1.updateOne({
        id: _0x5a8e82.id
      }, {
        ..._0x38b1cd
      });
    } else if (sqldb && pg) {
      return await pg.updateOne("sck1", {
        id: _0x5a8e82.id
      }, _0x38b1cd);
    } else {
      return await dbs.updateOne("sck1", _0x5a8e82, _0x38b1cd);
    }
  } catch (_0x17d495) {
    console.log("Error userdb.updateOne() in user database,\n", _0x17d495);
    return {};
  }
};
userdb.findOneAndDelete = async _0x51d67d => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (!_0x51d67d.id) {
      return [];
    }
    if (isMongodb) {
      return await sck1.findOneAndDelete({
        id: _0x51d67d.id
      });
    } else if (sqldb && pg) {
      return await pg.findOneAndDelete("sck1", _0x51d67d);
    } else {
      return await dbs.findOneAndDelete("sck1", _0x51d67d);
    }
  } catch (_0x5b0ab7) {
    console.log("Error userdb.findOneAndDelete() in user database,\n", _0x5b0ab7);
    return null;
  }
};
userdb.delete = userdb.findOneAndDelete;
userdb.collection = {
  drop: async () => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        return await sck1.collection.drop();
      } else if (sqldb && pg) {
        return await pg.collection.drop("sck1");
      } else {
        return await dbs.collection.drop("sck1");
      }
    } catch (_0x566165) {
      console.log("Error userdb.collection.drop() in user database,\n", _0x566165);
      return null;
    }
  }
};
let alivedb = {};
alivedb.countDocuments = async () => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      return await alive.countDocuments();
    } else if (sqldb && pg) {
      return await pg.countDocuments("bot_");
    } else {
      return await dbs.countDocuments("bot_");
    }
  } catch (_0x5ba840) {
    console.log("Error while Creating user in database,\n", _0x5ba840);
    return 0;
  }
};
alivedb.new = async _0x285d1a => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      let _0xaf7fa6 = (await alive.findOne({
        id: _0x285d1a.id
      })) || (await new alive({
        id: _0x285d1a.id,
        ..._0x285d1a
      }).save());
      return _0xaf7fa6;
    } else if (sqldb && pg) {
      var _0x27b479 = (await pg.findOne("bot_", {
        id: _0x285d1a.id
      })) || (await pg.new("bot_", _0x285d1a));
      return _0x27b479;
    } else {
      var _0x27b479 = (await dbs.findOne("bot_", {
        id: _0x285d1a.id
      })) || (await dbs.new("bot_", _0x285d1a));
      return _0x27b479;
    }
  } catch (_0x38c655) {
    console.log("Error while Creating user in database,\n", _0x38c655);
    return {};
  }
};
alivedb.findOne = async _0x57c60c => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      return await alive.findOne({
        id: _0x57c60c.id
      });
    } else if (sqldb && pg) {
      return await pg.findOne("bot_", _0x57c60c);
    } else {
      var _0x3a403c = await dbs.findOne("bot_", {
        id: _0x57c60c.id
      });
      return _0x3a403c;
    }
  } catch (_0x2996ab) {
    console.log("Error while finding user in database,\n", _0x2996ab);
    return;
  }
};
alivedb.find = async _0x3a47bf => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      let _0x51a028 = await alive.find(_0x3a47bf);
      return _0x51a028;
    } else if (sqldb && pg) {
      return await pg.find("bot_", _0x3a47bf);
    } else {
      return await dbs.find("bot_", _0x3a47bf);
    }
  } catch (_0x88cace) {
    console.log("Error while finding user in database,\n", _0x88cace);
    return [];
  }
};
alivedb.updateOne = async (_0xf130e6, _0x19fdb9 = {}) => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (!_0xf130e6.id) {
      return {};
    }
    if (isMongodb) {
      return await alive.updateOne({
        id: _0xf130e6.id
      }, {
        ..._0x19fdb9
      });
    } else if (sqldb && pg) {
      return await pg.updateOne("bot_", {
        id: _0xf130e6.id
      }, _0x19fdb9);
    } else {
      return await dbs.updateOne("bot_", _0xf130e6, _0x19fdb9);
    }
  } catch (_0x3f77f8) {
    console.log("Error while updateOne user in database,\n", _0x3f77f8);
    return {};
  }
};
alivedb.findOneAndDelete = async _0x2a822e => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (!_0x2a822e.id) {
      return [];
    }
    if (isMongodb) {
      return await alive.findOneAndDelete({
        id: _0x2a822e.id
      });
    } else if (sqldb && pg) {
      return await pg.findOneAndDelete("bot_", _0x2a822e);
    } else {
      return await dbs.findOneAndDelete("bot_", _0x2a822e);
    }
  } catch (_0x59926f) {
    console.log("Error while findOneAndDelete user in database,\n", _0x59926f);
    return null;
  }
};
alivedb.delete = alivedb.findOneAndDelete;
alivedb.collection = {
  drop: async () => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        return await alive.collection.drop();
      } else if (sqldb && pg) {
        return await pg.collection.drop("bot_");
      } else {
        return await dbs.collection.drop("bot_");
      }
    } catch (_0xc08f83) {
      console.log("Error while collection.drop all user in database,\n", _0xc08f83);
      return null;
    }
  }
};
let tempdb = {};
tempdb.countDocuments = async () => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      return await dbtemp.countDocuments();
    } else if (sqldb && pg) {
      return await pg.countDocuments("tempdb");
    } else {
      return await dbs.countDocuments("tempdb");
    }
  } catch (_0x54e6f1) {
    console.log("Error while Creating user in database,\n", _0x54e6f1);
    return 0;
  }
};
tempdb.new = async _0x291f6c => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      let _0x419542 = (await dbtemp.findOne({
        id: _0x291f6c.id
      })) || (await new dbtemp({
        id: _0x291f6c.id,
        ..._0x291f6c
      }).save());
      return _0x419542;
    } else if (sqldb && pg) {
      var _0x3eca0b = (await pg.findOne("tempdb", {
        id: _0x291f6c.id
      })) || (await pg.new("tempdb", _0x291f6c));
      return _0x3eca0b;
    } else {
      var _0x3eca0b = (await dbs.findOne("tempdb", {
        id: _0x291f6c.id
      })) || (await dbs.new("tempdb", _0x291f6c));
      return _0x3eca0b;
    }
  } catch (_0x93ec22) {
    console.log("Error while Creating user in database,\n", _0x93ec22);
    return {};
  }
};
tempdb.findOne = async _0x4d6ba6 => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      return await dbtemp.findOne({
        id: _0x4d6ba6.id
      });
    } else if (sqldb && pg) {
      return await pg.findOne("tempdb", _0x4d6ba6);
    } else {
      var _0x50f984 = await dbs.findOne("tempdb", {
        id: _0x4d6ba6.id
      });
      return _0x50f984;
    }
  } catch (_0x52b9d5) {
    console.log("Error while finding user in database,\n", _0x52b9d5);
    return;
  }
};
tempdb.find = async _0xe322df => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (isMongodb) {
      let _0x1e93db = await dbtemp.find(_0xe322df);
      return _0x1e93db;
    } else if (sqldb && pg) {
      return await pg.find("tempdb", _0xe322df);
    } else {
      return await dbs.find("tempdb", _0xe322df);
    }
  } catch (_0x3b7e05) {
    console.log("Error while finding user in database,\n", _0x3b7e05);
    return [];
  }
};
tempdb.updateOne = async (_0x357bf9, _0x3ea3ee = {}) => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (!_0x357bf9.id) {
      return {};
    }
    if (isMongodb) {
      return await dbtemp.updateOne({
        id: _0x357bf9.id
      }, {
        ..._0x3ea3ee
      });
    } else if (sqldb && pg) {
      return await pg.updateOne("tempdb", {
        id: _0x357bf9.id
      }, _0x3ea3ee);
    } else {
      return await dbs.updateOne("tempdb", _0x357bf9, _0x3ea3ee);
    }
  } catch (_0x47e31a) {
    console.log("Error while updateOne user in database,\n", _0x47e31a);
    return {};
  }
};
tempdb.findOneAndDelete = async _0x33e9b0 => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    if (!_0x33e9b0.id) {
      return [];
    }
    if (isMongodb) {
      return await dbtemp.findOneAndDelete({
        id: _0x33e9b0.id
      });
    } else if (sqldb && pg) {
      return await pg.findOneAndDelete("tempdb", _0x33e9b0);
    } else {
      return await dbs.findOneAndDelete("tempdb", _0x33e9b0);
    }
  } catch (_0x338e95) {
    console.log("Error while findOneAndDelete user in database,\n", _0x338e95);
    return null;
  }
};
tempdb.delete = tempdb.findOneAndDelete;
tempdb.collection = {
  drop: async () => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        return await dbtemp.collection.drop();
      } else if (sqldb && pg) {
        return await pg.collection.drop("tempdb");
      } else {
        return await dbs.collection.drop("tempdb");
      }
    } catch (_0x194394) {
      console.log("Error while collection.drop all user in database,\n", _0x194394);
      return null;
    }
  }
};
const bot_ = alivedb;
module.exports = {
  tempdb: tempdb,
  pg: pg,
  dbs: dbs,
  groupdb: groupdb,
  userdb: userdb,
  alivedb: alivedb,
  bot_: bot_
};