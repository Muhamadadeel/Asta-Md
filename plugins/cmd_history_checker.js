let { smd } = require("../lib");
const Config = require("../config");
let commandHistory = [];
smd(
  {
    on: "main",
  },
  async (_0x297aaa, _0x35b575, { icmd: _0x5e5446 }) => {
    try {
      if (_0x5e5446 && _0x297aaa.cmd) {
        commandHistory.push({
          user: _0x297aaa.sender,
          command: _0x297aaa.cmd,
          timestamp: new Date(),
        });
      }
    } catch (_0x4bf40a) {
      await _0x297aaa.error(
        _0x4bf40a + "\n\ncommand : listmessage",
        _0x4bf40a,
        "*ERROR!*",
      );
    }
  },
);
smd(
  {
    cmdname: "commandhistory",
    alias: ["cmds","usage"],
    desc: "Counts the commands used by users after starting bot?",
    category: "tools",
    filename: __filename,
  },
  async (_0x297641) => {
    try {
      let _0x38bc51 = [];
      const _0x2dd06e = {};
      commandHistory.forEach(({ user: _0x530cb4, command: _0x1c35dd }) => {
        if (!_0x2dd06e[_0x530cb4]) {
          _0x2dd06e[_0x530cb4] = {
            commands: {},
            count: 0,
          };
          _0x38bc51.push(_0x530cb4);
        }
        if (!_0x2dd06e[_0x530cb4].commands[_0x1c35dd]) {
          _0x2dd06e[_0x530cb4].commands[_0x1c35dd] = 1;
        } else {
          _0x2dd06e[_0x530cb4].commands[_0x1c35dd]++;
        }
        _0x2dd06e[_0x530cb4].count++;
      });
      const _0x5513e2 = _0x38bc51
        .map((_0x4cd261, _0xf43b6c) => {
          const _0x24712d = _0x2dd06e[_0x4cd261].commands;
          const _0x48255c = Object.entries(_0x24712d)
            .map(
              ([_0x4d2ffd, _0x534145]) =>
                _0x4d2ffd + " " + (_0x534145 <= 1 ? "" : "(" + _0x534145 + ")"),
            )
            .join(", ");
          return (
            "*" +
            (_0xf43b6c + 1) +
            " -- @" +
            _0x4cd261.split("@")[0] +
            "'s ➪ " +
            _0x2dd06e[_0x4cd261].count +
            "*  \n *LIST ➪*  _" +
            _0x48255c.trim() +
            "_"
          );
        })
        .join("\n\n");
      var _0x17ca33 = (
        "*LIST OF COMMANDS USED TODAY!*\n_Note: Data will be reset when bot restart!_\n\n*Total Users: _" +
        _0x38bc51.length +
        "_*\n*Total Command Used: _" +
        commandHistory.length +
        "_*\n\n" +
        _0x5513e2 +
        "\n\n" +
        Config.caption
      ).trim();
      await _0x297641.send(
        _0x17ca33,
        {
          contextInfo: {
            ...(await _0x297641.bot.contextInfo("HISTORY")),
          },
          mentions: [..._0x38bc51],
        },
        "asta",
        _0x297641,
      );
    } catch (_0x48863b) {
      await _0x297641.error(
        _0x48863b + "\n\ncommand : cmdused",
        _0x48863b,
        "*ERROR!*",
      );
    }
  },
);