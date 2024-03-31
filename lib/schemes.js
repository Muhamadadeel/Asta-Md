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
    bot_: "\n        CREATE TABLE IF NOT EXISTS bot_ (\n          id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'Suhail-MD',\n          alive_text VARCHAR(255) DEFAULT 'Some text',\n          alive_get VARCHAR(255) DEFAULT '',\n          alive_url VARCHAR(255) DEFAULT '',\n          alive_image BOOLEAN DEFAULT false,\n          alive_video BOOLEAN DEFAULT false,\n          permit BOOLEAN DEFAULT false,\n          permit_values VARCHAR(255) DEFAULT 'all',\n          chatbot VARCHAR(255) DEFAULT 'false',\n          bgm BOOLEAN DEFAULT false,\n          bgmarray JSON DEFAULT '{}',\n          plugins JSON DEFAULT '{}',\n          notes JSON DEFAULT '{}',\n          antiviewonce VARCHAR(255) DEFAULT 'false',\n          antidelete VARCHAR(255) DEFAULT 'false',\n          autobio VARCHAR(255) DEFAULT 'false',\n          levelup VARCHAR(255) DEFAULT 'false',\n          autoreaction VARCHAR(255) DEFAULT 'false',\n          anticall VARCHAR(255) DEFAULT 'false'\n        );",
    sck1: "\n  CREATE TABLE IF NOT EXISTS sck1 (\n    id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'Suhail-MD',\n    name VARCHAR(255) DEFAULT 'Unknown',\n    times INTEGER DEFAULT 0,\n    permit VARCHAR(255) DEFAULT 'false',\n    ban VARCHAR(255) DEFAULT 'false',\n    afk VARCHAR(255) DEFAULT 'false',\n    afktime INTEGER DEFAULT 0,\n    bot BOOLEAN DEFAULT false,\n    msg JSON DEFAULT '{}',\n    warn JSON DEFAULT '{}'\n  );",
    sck: "CREATE TABLE IF NOT EXISTS Sck (\n    id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'Asta_Md',\n    events VARCHAR(255) DEFAULT 'false',\n    nsfw VARCHAR(255) DEFAULT 'false',\n    pdm VARCHAR(255) DEFAULT 'false',\n    antipromote VARCHAR(255) DEFAULT 'false',\n    antidemote VARCHAR(255) DEFAULT 'false',\n    welcome VARCHAR(255) DEFAULT 'false',\n    goodbye VARCHAR(255) DEFAULT 'false',\n    welcometext TEXT DEFAULT '@user @pp Welcome Bruhhh In @gname.....!!!!!😊👇🏻♥️\n\n_GROUP DESCRIPTION_\n@desc\n\n\n______________\nSupport us by Subscribing\nYoutube.com/suhailtechinfo',\n    goodbyetext TEXT DEFAULT '@user @pp Left From @gname.....!!!!!😒👆🏻♥️\n\n_GROUP DESCRIPTION_\n@desc\n\n\n______________\nSupport us by Subscribing\nYoutube.com/suhailtechinfo',\n    botenable VARCHAR(255) DEFAULT 'true',\n    antilink VARCHAR(255) DEFAULT 'false',\n    antiword JSON DEFAULT '{}',\n    antifake VARCHAR(255) DEFAULT 'false',\n    antispam VARCHAR(255) DEFAULT 'false',\n    antitag VARCHAR(255) DEFAULT 'false',\n    antibot VARCHAR(255) DEFAULT 'false',\n    onlyadmin VARCHAR(255) DEFAULT 'false',\n    economy VARCHAR(255) DEFAULT 'false',\n    disablecmds VARCHAR(255) DEFAULT 'false',\n    chatbot VARCHAR(255) DEFAULT 'false',\n    mute VARCHAR(255) DEFAULT 'false',\n    unmute VARCHAR(255) DEFAULT 'false'\n);"
  };
  let cacheTable = {};
  pg.ConnectPostgreSQL = () => {
    cacheTable.ConnectPostgreSQL = true;
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
    pool.on("error", _0x5af646 => {
      console.error("PostgreSQL database error :", _0x5af646);
      sqldb = false;
      return sqldb;
    });
  };
  pg.createTable = async _0x5dfdc1 => {
    if (!sqldb && !cacheTable.ConnectPostgreSQL) {
      let _0x25db8d = await pg.ConnectPostgreSQL();
      if (!_0x25db8d) {
        return false;
      }
    }
    if (cacheTable[_0x5dfdc1]) {
      return true;
    }
    const _0x33a638 = await pool.connect();
    try {
      await _0x33a638.query("BEGIN");
      await _0x33a638.query(pgtables[_0x5dfdc1]);
      await _0x33a638.query("COMMIT");
      console.log("PostgreSQL " + _0x5dfdc1 + " Table created in Database.");
      cacheTable[_0x5dfdc1] = true;
      return cacheTable[_0x5dfdc1];
    } catch (_0x5488aa) {
      await _0x33a638.query("ROLLBACK");
      console.error("Error creating PostgreSQL " + _0x5dfdc1 + " Table:", _0x5488aa);
      return false;
    } finally {
      _0x33a638.release();
    }
  };
  pg.countDocuments = async _0x1327ae => {
    if (!(await pg.createTable(_0x1327ae))) {
      return 0;
    }
    const _0x48ee3d = await pool.connect();
    try {
      const _0x59b0d5 = await _0x48ee3d.query("SELECT COUNT(*) FROM " + _0x1327ae);
      return parseInt(_0x59b0d5.rows[0].count);
    } catch (_0x415df1) {
      return 0;
    } finally {
      _0x48ee3d.release();
    }
  };
  pg.new = async (_0x15ca05, _0xb5035b) => {
    if (!(await pg.createTable(_0x15ca05))) {
      return false;
    }
    const _0x15e717 = await pool.connect();
    try {
      await _0x15e717.query("BEGIN");
      if (await pg.findOne(_0x15ca05, _0xb5035b)) {
        return await pg.updateOne(_0x15ca05, {
          id: _0xb5035b?.id
        }, _0xb5035b);
      }
      const _0x41d33a = "\n      INSERT INTO " + _0x15ca05 + " (" + Object.keys(_0xb5035b).join(", ") + ")\n      VALUES (" + Object.keys(_0xb5035b).map((_0xfc4351, _0x2a41ca) => "$" + (_0x2a41ca + 1)).join(", ") + ")\n      ON CONFLICT (id) DO NOTHING\n      RETURNING *;\n    ";
      const _0x55f749 = Object.values(_0xb5035b);
      const _0x41581b = await _0x15e717.query(_0x41d33a, _0x55f749);
      await _0x15e717.query("COMMIT");
      return _0x41581b.rows[0];
    } catch (_0x2869c2) {
      await _0x15e717.query("ROLLBACK");
      console.error("Error inserting new row into " + _0x15ca05 + "\n", _0x2869c2);
      return false;
    } finally {
      _0x15e717.release();
    }
  };
  pg.findOne = async (_0x176dab, _0x4359f7) => {
    if (!(await pg.createTable(_0x176dab))) {
      return false;
    }
    const _0x39a4d6 = await pool.connect();
    try {
      const _0x303fe9 = await _0x39a4d6.query("SELECT * FROM " + _0x176dab + " WHERE id = $1", [_0x4359f7?.id]);
      return _0x303fe9.rows[0];
    } catch (_0x517af8) {
      console.error("Error while finding " + _0x176dab + " document by Id: " + _0x4359f7?.id + "\n", _0x517af8);
      return false;
    } finally {
      _0x39a4d6.release();
    }
  };
  pg.find = async (_0x14d621, _0x4139b8 = {}) => {
    if (!(await pg.createTable(_0x14d621))) {
      return [];
    }
    const _0x591f7d = await pool.connect();
    try {
      let _0x4d2516 = Object.values(_0x4139b8);
      if (!_0x4d2516 || !_0x4d2516[0]) {
        return (await _0x591f7d.query("SELECT * FROM " + _0x14d621))?.rows || [];
      } else if (_0x4139b8?.id) {
        return [{
          ...(await pg.findOne(_0x14d621, _0x4139b8))
        }] || [];
      }
    } catch (_0x211cc6) {
      console.error("Error while find " + _0x14d621 + " documents", _0x211cc6);
      return [];
    } finally {
      _0x591f7d.release();
    }
  };
  pg.updateOne = async (_0x2927af, _0x175765, _0x5a5e51 = {}) => {
    if (!(await pg.createTable(_0x2927af))) {
      return false;
    }
    const _0x4935c5 = await pool.connect();
    try {
      await _0x4935c5.query("BEGIN");
      const _0x5776e0 = "SELECT * FROM " + _0x2927af + " WHERE id = $1 FOR UPDATE";
      const _0xf2cc11 = await _0x4935c5.query(_0x5776e0, [_0x175765?.id]);
      if (_0xf2cc11.rows[0]) {
        const _0x379868 = "UPDATE " + _0x2927af + " SET " + Object.keys(_0x5a5e51).map((_0x2d47f1, _0x4d208f) => _0x2d47f1 + " = $" + (_0x4d208f + 2)).join(", ") + " WHERE id = $1 RETURNING *;";
        const _0x51c520 = [_0x175765.id, ...Object.values(_0x5a5e51)];
        const _0x3bc3f2 = await _0x4935c5.query(_0x379868, _0x51c520);
        await _0x4935c5.query("COMMIT");
        return _0x3bc3f2.rows[0];
      } else {
        return await pg.new(_0x2927af, {
          ..._0x175765,
          ..._0x5a5e51
        });
      }
    } catch (_0x1a610c) {
      await _0x4935c5.query("ROLLBACK");
      console.error("Error while finding and updating " + _0x2927af + " document by Id: " + _0x175765?.id + "\n", _0x1a610c);
      return [];
    } finally {
      _0x4935c5.release();
    }
  };
  pg.findOneAndDelete = async (_0x1fc2bd, _0x5cba98) => {
    if (!(await pg.createTable(_0x1fc2bd))) {
      return false;
    }
    const _0x4702e4 = await pool.connect();
    try {
      await _0x4702e4.query("BEGIN");
      const _0x3fe673 = await _0x4702e4.query("SELECT * FROM " + _0x1fc2bd + " WHERE id = $1 FOR UPDATE", [_0x5cba98?.id]);
      if (_0x3fe673.rows[0]) {
        const _0x2f274e = await _0x4702e4.query("DELETE FROM " + _0x1fc2bd + " WHERE id = $1 RETURNING *", [_0x5cba98.id]);
        await _0x4702e4.query("COMMIT");
        return _0x2f274e.rows[0];
      } else {
        return true;
      }
    } catch (_0x4c62d8) {
      await _0x4702e4.query("ROLLBACK");
      console.error("Error while finding and deleting " + _0x1fc2bd + " document by Id: " + _0x5cba98?.id + "\n", _0x4c62d8);
      return false;
    } finally {
      _0x4702e4.release();
    }
  };
  pg.collection = {
    drop: async _0x39fc2f => {
      if (!(await pg.createTable(_0x39fc2f))) {
        return false;
      }
      const _0x49d941 = await pool.connect();
      try {
        await _0x49d941.query("BEGIN");
        await _0x49d941.query("DROP TABLE IF EXISTS " + _0x39fc2f);
        await _0x49d941.query("COMMIT");
        return true;
      } catch (_0x34f363) {
        await _0x49d941.query("ROLLBACK");
        console.error("Error while dropping " + _0x39fc2f + " table\n", _0x34f363);
        return false;
      } finally {
        _0x49d941.release();
      }
    }
  };
  let dbs = {
    newtables: {
      bot_: {
        id: "Asta_Md",
        alive_text: "*ι αм σηℓιηє нσω ¢αη ι нєℓρ уσυ* \n\n_ι αм ᴍυℓтι ԃєνιᴄє ωнαтѕαρρ вσт_ \n_Cʀєαtєd вყ : ѕυнαιℓ tєᴄʜ info_\n_If any query : wa.me/2348039607375_\n\n\n*_Update Alive Message by adding text with Alive_* \n*Eg: _.alive Your_Alive_Message_*",
        alive_get: "you did'nt set alive message yet\nType [.alive info] to get alive info",
        alive_url: "",
        alive_image: false,
        alive_video: false,
        permit: false,
        permit_values: "all",
        chatbot: "false",
        antiviewonce: "false",
        antidelete: "false",
        autobio: "false",
        levelup: "false",
        anticall: "false",
        autoreaction: "false",
        bgm: false,
        bgmarray: {},
        plugins: {},
        notes: {},
        warn: {}
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
        welcometext: "*@user @pp Welcome Bruhhh In @gname.....!!!!!😊👇🏻♥️* \n\n*_GROUP DESCRIPTION_*\n@desc\n\n\n *______________*\n   *Support us by Subscribing*\n*Youtube.com/suhailtechinfo*",
        goodbyetext: "*@user @pp Left From @gname.....!!!!!😒👆🏻♥️* \n\n*_GROUP DESCRIPTION_*\n@desc\n\n\n *______________*\n   *Support us by Subscribing*\n*Youtube.com/suhailtechinfo*",
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
        unmute: "false"
      },
      sck1: {
        id: "chatid",
        name: "Unknown",
        times: 0,
        permit: "false",
        ban: "false",
        warn: {}
      }
    }
  };
  dbs.loadGroupData = async _0x10b36e => {
    try {
      if (fs.existsSync(__dirname + "/" + _0x10b36e + ".json")) {
        return await JSON.parse(fs.readFileSync(__dirname + "/" + _0x10b36e + ".json", "utf8"));
      } else {
        await fs.writeFileSync(__dirname + "/" + _0x10b36e + ".json", JSON.stringify({}, null, 2), "utf8");
        return {};
      }
    } catch (_0x1e9fd6) {
      console.error("Error loading user data:", _0x1e9fd6);
      return {};
    }
  };
  dbs.saveGroupData = async (_0x2064e4, _0x3810a6 = {}) => {
    await fs.writeFileSync(__dirname + "/" + _0x2064e4 + ".json", JSON.stringify(_0x3810a6, null, 2), "utf8");
  };
  dbs.countDocuments = async _0x29560c => {
    try {
      let _0xc6b42f = await dbs.loadGroupData(_0x29560c);
      let _0x515b32 = Object.keys(_0xc6b42f);
      return _0x515b32.length;
    } catch (_0x37d29d) {
      console.log("Error while countDocuments of " + _0x29560c + " in database,\n", _0x37d29d);
      return 0;
    }
  };
  dbs.new = async (_0x4ba331, _0x13a8cd) => {
    try {
      let _0x2f04bf = await dbs.loadGroupData(_0x4ba331);
      if (!_0x2f04bf[_0x13a8cd.id]) {
        _0x2f04bf[_0x13a8cd.id] = {
          ...dbs.newtables[_0x4ba331],
          ..._0x13a8cd
        };
        await dbs.saveGroupData(_0x4ba331, _0x2f04bf);
        return _0x2f04bf[_0x13a8cd.id];
      } else {
        return _0x2f04bf[_0x13a8cd.id];
      }
    } catch (_0x425b9d) {
      console.log("Error while Creating new " + _0x4ba331 + " in database,\n", _0x425b9d);
      return {};
    }
  };
  dbs.findOne = async (_0x4489a7, _0x3a1b67) => {
    try {
      let _0x5f12d2 = await dbs.loadGroupData(_0x4489a7);
      if (_0x5f12d2[_0x3a1b67.id]) {
        return _0x5f12d2[_0x3a1b67.id];
      } else {
        return;
      }
    } catch (_0x4881e2) {
      console.log("Error while findOne " + _0x4489a7 + " in database,\n", _0x4881e2);
      return;
    }
  };
  dbs.find = async (_0x4a5fbd, _0x4ffdf5 = {}) => {
    try {
      let _0x596028 = Object.values(_0x4ffdf5);
      let _0x544041 = await dbs.loadGroupData(_0x4a5fbd);
      if (_0x544041[_0x4ffdf5.id]) {
        return [{
          ..._0x544041[_0x4ffdf5.id]
        }];
      } else if (!_0x596028[0]) {
        return Object.values(_0x544041);
      }
      return [];
    } catch (_0x29be6b) {
      console.log("Error while finding  " + _0x4a5fbd + "(s) in database,\n", _0x29be6b);
      return [];
    }
  };
  dbs.updateOne = async (_0x333b3e, _0x3cccbe, _0x2b5cfa = {}) => {
    try {
      let _0x5977bd = await dbs.loadGroupData(_0x333b3e);
      if (_0x5977bd[_0x3cccbe.id]) {
        _0x5977bd[_0x3cccbe.id] = {
          ..._0x5977bd[_0x3cccbe.id],
          ..._0x2b5cfa
        };
        await dbs.saveGroupData(_0x333b3e, _0x5977bd);
        return _0x5977bd[_0x3cccbe.id];
      } else {
        return await dbs.new(_0x333b3e, {
          ..._0x3cccbe,
          ..._0x2b5cfa
        });
      }
    } catch (_0x7caaa4) {
      console.log("Error while updateOne " + _0x333b3e + " in database,\n", _0x7caaa4);
      return {};
    }
  };
  dbs.findOneAndDelete = async (_0x236c58, _0x5e4302) => {
    try {
      let _0x1fda42 = await dbs.loadGroupData(_0x236c58);
      delete _0x1fda42[_0x5e4302.id];
      await dbs.saveGroupData(_0x236c58, _0x1fda42);
      return true;
    } catch (_0x20f643) {
      console.log("Error while findOneAndDelete " + _0x236c58 + " in database,\n", _0x20f643);
      return null;
    }
  };
  dbs.delete = dbs.findOneAndDelete;
  dbs.collection = {
    drop: async _0x7147f9 => {
      try {
        let _0x5a9071 = await dbs.loadGroupData(_0x7147f9);
        Object.keys(_0x5a9071).forEach(_0x1bb47f => delete _0x5a9071[_0x1bb47f]);
        await dbs.saveGroupData(_0x7147f9, _0x5a9071);
        return true;
      } catch (_0x8d7209) {
        console.log("Error while collection.drop all user in database,\n", _0x8d7209);
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
    } catch (_0x56cfb8) {
      console.log("Error while Creating user in database,\n", _0x56cfb8);
      return 0;
    }
  };
  groupdb.new = async _0xb7f2c0 => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        let _0x4901b8 = (await sck.findOne({
          id: _0xb7f2c0.id
        })) || (await new sck({
          id: _0xb7f2c0.id,
          ..._0xb7f2c0
        }).save());
        return _0x4901b8;
      } else if (sqldb && pg) {
        var _0x58e5f1 = (await pg.findOne("sck", {
          id: _0xb7f2c0.id
        })) || (await pg.new("sck", _0xb7f2c0));
        return _0x58e5f1;
      } else {
        var _0x58e5f1 = (await dbs.findOne("sck", {
          id: _0xb7f2c0.id
        })) || (await dbs.new("sck", _0xb7f2c0));
        return _0x58e5f1;
      }
    } catch (_0x3cac77) {
      console.log("Error while Creating user in database,\n", _0x3cac77);
      return {};
    }
  };
  groupdb.findOne = async _0x2f04cc => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        return await sck.findOne({
          id: _0x2f04cc.id
        });
      } else if (sqldb && pg) {
        return await pg.findOne("sck", _0x2f04cc);
      } else {
        var _0x5d3f23 = await dbs.findOne("sck", {
          id: _0x2f04cc.id
        });
        return _0x5d3f23;
      }
    } catch (_0x35521c) {
      console.log("Error while finding user in database,\n", _0x35521c);
      return;
    }
  };
  groupdb.find = async _0x56a8bd => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        let _0x2fb46a = await sck.find(_0x56a8bd);
        return _0x2fb46a;
      } else if (sqldb && pg) {
        return await pg.find("sck", _0x56a8bd);
      } else {
        return await dbs.find("sck", _0x56a8bd);
      }
    } catch (_0x5837f7) {
      console.log("Error while finding user in database,\n", _0x5837f7);
      return [];
    }
  };
  groupdb.updateOne = async (_0x3cd1d8, _0x34298f = {}) => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (!_0x3cd1d8.id) {
        return {};
      }
      if (isMongodb) {
        return await sck.updateOne({
          id: _0x3cd1d8.id
        }, {
          ..._0x34298f
        });
      } else if (sqldb && pg) {
        return await pg.updateOne("sck", {
          id: _0x3cd1d8.id
        }, _0x34298f);
      } else {
        return await dbs.updateOne("sck", _0x3cd1d8, _0x34298f);
      }
    } catch (_0x3a12b8) {
      console.log("Error while updateOne user in database,\n", _0x3a12b8);
      return {};
    }
  };
  groupdb.findOneAndDelete = async _0x53cdd2 => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (!_0x53cdd2.id) {
        return [];
      }
      if (isMongodb) {
        return await sck.findOneAndDelete({
          id: _0x53cdd2.id
        });
      } else if (sqldb && pg) {
        return await pg.findOneAndDelete("sck", _0x53cdd2);
      } else {
        return await dbs.findOneAndDelete("sck", _0x53cdd2);
      }
    } catch (_0x5215d6) {
      console.log("Error while findOneAndDelete user in database,\n", _0x5215d6);
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
      } catch (_0x2437ed) {
        console.log("Error while collection.drop all user in database,\n", _0x2437ed);
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
    } catch (_0x2e26ba) {
      console.log("Error from userdb.countDocuments() in user database,\n", _0x2e26ba);
      return 0;
    }
  };
  userdb.new = async _0x3b43ed => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        let _0x3cf322 = (await sck1.findOne({
          id: _0x3b43ed.id
        })) || (await new sck1({
          id: _0x3b43ed.id,
          ..._0x3b43ed
        }).save());
        return _0x3cf322;
      } else if (sqldb && pg) {
        var _0x1143fe = (await pg.findOne("sck1", {
          id: _0x3b43ed.id
        })) || (await pg.new("sck1", _0x3b43ed));
        return _0x1143fe;
      } else {
        var _0x1143fe = (await dbs.findOne("sck1", {
          id: _0x3b43ed.id
        })) || (await dbs.new("sck1", _0x3b43ed));
        return _0x1143fe;
      }
    } catch (_0x14beca) {
      console.log("Error userdb.new() in user database,\n", _0x14beca);
      return {};
    }
  };
  userdb.findOne = async _0xf8946d => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        return await sck1.findOne({
          id: _0xf8946d.id
        });
      } else if (sqldb && pg) {
        return await pg.findOne("sck1", _0xf8946d);
      } else {
        var _0x5a7258 = await dbs.findOne("sck1", {
          id: _0xf8946d.id
        });
        return _0x5a7258;
      }
    } catch (_0x5bcab2) {
      console.log("Error userdb.findOne() in user database,\n", _0x5bcab2);
      return;
    }
  };
  userdb.find = async _0x50ccb3 => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        let _0x6db70e = await sck1.find(_0x50ccb3);
        return _0x6db70e;
      } else if (sqldb && pg) {
        return await pg.find("sck1", _0x50ccb3);
      } else {
        return await dbs.find("sck1", _0x50ccb3);
      }
    } catch (_0x1f4784) {
      console.log("Error userdb.find() in user database,\n", _0x1f4784);
      return [];
    }
  };
  userdb.updateOne = async (_0x54a60b, _0x576135 = {}) => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (!_0x54a60b.id) {
        return {};
      }
      if (isMongodb) {
        return await sck1.updateOne({
          id: _0x54a60b.id
        }, {
          ..._0x576135
        });
      } else if (sqldb && pg) {
        return await pg.updateOne("sck1", {
          id: _0x54a60b.id
        }, _0x576135);
      } else {
        return await dbs.updateOne("sck1", _0x54a60b, _0x576135);
      }
    } catch (_0x42c560) {
      console.log("Error userdb.updateOne() in user database,\n", _0x42c560);
      return {};
    }
  };
  userdb.findOneAndDelete = async _0x1af5bd => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (!_0x1af5bd.id) {
        return [];
      }
      if (isMongodb) {
        return await sck1.findOneAndDelete({
          id: _0x1af5bd.id
        });
      } else if (sqldb && pg) {
        return await pg.findOneAndDelete("sck1", _0x1af5bd);
      } else {
        return await dbs.findOneAndDelete("sck1", _0x1af5bd);
      }
    } catch (_0x1bc3ec) {
      console.log("Error userdb.findOneAndDelete() in user database,\n", _0x1bc3ec);
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
      } catch (_0xe0fd3c) {
        console.log("Error userdb.collection.drop() in user database,\n", _0xe0fd3c);
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
    } catch (_0x464365) {
      console.log("Error while Creating user in database,\n", _0x464365);
      return 0;
    }
  };
  alivedb.new = async _0xf4e7a0 => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        let _0x53fb49 = (await alive.findOne({
          id: _0xf4e7a0.id
        })) || (await new alive({
          id: _0xf4e7a0.id,
          ..._0xf4e7a0
        }).save());
        return _0x53fb49;
      } else if (sqldb && pg) {
        var _0x34707e = (await pg.findOne("bot_", {
          id: _0xf4e7a0.id
        })) || (await pg.new("bot_", _0xf4e7a0));
        return _0x34707e;
      } else {
        var _0x34707e = (await dbs.findOne("bot_", {
          id: _0xf4e7a0.id
        })) || (await dbs.new("bot_", _0xf4e7a0));
        return _0x34707e;
      }
    } catch (_0x474046) {
      console.log("Error while Creating user in database,\n", _0x474046);
      return {};
    }
  };
  alivedb.findOne = async _0xca0973 => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        return await alive.findOne({
          id: _0xca0973.id
        });
      } else if (sqldb && pg) {
        return await pg.findOne("bot_", _0xca0973);
      } else {
        var _0x336de9 = await dbs.findOne("bot_", {
          id: _0xca0973.id
        });
        return _0x336de9;
      }
    } catch (_0x9839d1) {
      console.log("Error while finding user in database,\n", _0x9839d1);
      return;
    }
  };
  alivedb.find = async _0x32e35e => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (isMongodb) {
        let _0x57c281 = await alive.find(_0x32e35e);
        return _0x57c281;
      } else if (sqldb && pg) {
        return await pg.find("bot_", _0x32e35e);
      } else {
        return await dbs.find("bot_", _0x32e35e);
      }
    } catch (_0x333895) {
      console.log("Error while finding user in database,\n", _0x333895);
      return [];
    }
  };
  alivedb.updateOne = async (_0x5d457b, _0xcc9a6c = {}) => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (!_0x5d457b.id) {
        return {};
      }
      if (isMongodb) {
        return await alive.updateOne({
          id: _0x5d457b.id
        }, {
          ..._0xcc9a6c
        });
      } else if (sqldb && pg) {
        return await pg.updateOne("bot_", {
          id: _0x5d457b.id
        }, _0xcc9a6c);
      } else {
        return await dbs.updateOne("bot_", _0x5d457b, _0xcc9a6c);
      }
    } catch (_0xdd7d37) {
      console.log("Error while updateOne user in database,\n", _0xdd7d37);
      return {};
    }
  };
  alivedb.findOneAndDelete = async _0x56064c => {
    try {
      if (!global.SmdOfficial) {
        return;
      }
      if (!_0x56064c.id) {
        return [];
      }
      if (isMongodb) {
        return await alive.findOneAndDelete({
          id: _0x56064c.id
        });
      } else if (sqldb && pg) {
        return await pg.findOneAndDelete("bot_", _0x56064c);
      } else {
        return await dbs.findOneAndDelete("bot_", _0x56064c);
      }
    } catch (_0x28b8ea) {
      console.log("Error while findOneAndDelete user in database,\n", _0x28b8ea);
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
      } catch (_0xe324d3) {
        console.log("Error while collection.drop all user in database,\n", _0xe324d3);
        return null;
      }
    }
  };
  const bot_ = alivedb;
  module.exports = {
    pg: pg,
    dbs: dbs,
    groupdb: groupdb,
    userdb: userdb,
    alivedb: alivedb,
    bot_: bot_
  };