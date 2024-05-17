const fs = require("fs");
const Config = require("../config");
const cron = require("node-cron");
var cronStart = false;
let { prefix, smd } = require("../lib");
const util = require("util");
const astro_patch = require("../lib/plugins");
const events = astro_patch;
function _0x213c(_0x345a66, _0x1f74b8) {
  const _0x593b05 = _0x593b();
  _0x213c = function (_0x213cbe, _0x58c23c) {
    _0x213cbe = _0x213cbe - 353;
    let _0x3d37ed = _0x593b05[_0x213cbe];
    return _0x3d37ed;
  };
  return _0x213c(_0x345a66, _0x1f74b8);
}
function _0x593b() {
  const _0x579036 = [
    "6522QmnZgz",
    "readdir",
    "toFixed",
    "unlink",
    "*/15 * * * *",
    "category",
    "reply_message",
    "trim",
    "startsWith",
    "COMMANDS*",
    "forEach",
    "```\n\n",
    "toLowerCase",
    "help",
    "```",
    "57304VUSDcZ",
    "276864ouXpfJ",
    "7659558aRJrDI",
    "66413FlbkYf",
    "from",
    "includes",
    "sendUi",
    "28JDktra",
    "isPublic",
    "desc",
    "length",
    "replace",
    "use",
    "dontAddCommandList",
    "\n*🧩Info:* ```",
    "schedule",
    "_COMMANDS*  \n┗━━━━━━━━━━━━━━━━━━━━━━━\n\n\n",
    "text",
    "┏━━━━━━━━━━━━━━━━━━━━━━━\n┃\t*ASTA-MD_",
    "2716190HSgAcg",
    "info",
    "endsWith",
    "find",
    "send",
    "1072iiXGaj",
    "pattern",
    "split",
    "../lib",
    "toUpperCase",
    "MENU*",
    "19523750lqZXVD",
    "ERROR : ",
    "826LaJjSA",
  ];
  _0x593b = function () {
    return _0x579036;
  };
  return _0x593b();
}
(function (_0x58691b, _0x4712be) {
  const _0x49221f = _0x213c;
  const _0x3831e3 = _0x58691b();
  while (true) {
    try {
      const _0x27411c =
        (parseInt(_0x49221f(360)) / 1) * (parseInt(_0x49221f(364)) / 2) +
        (-parseInt(_0x49221f(390)) / 3) * (-parseInt(_0x49221f(381)) / 4) +
        -parseInt(_0x49221f(376)) / 5 +
        -parseInt(_0x49221f(358)) / 6 +
        (parseInt(_0x49221f(389)) / 7) * (parseInt(_0x49221f(357)) / 8) +
        parseInt(_0x49221f(359)) / 9 +
        -parseInt(_0x49221f(387)) / 10;
      if (_0x27411c === _0x4712be) {
        break;
      } else {
        _0x3831e3.push(_0x3831e3.shift());
      }
    } catch (_0x41bdec) {
      _0x3831e3.push(_0x3831e3.shift());
    }
  }
})(_0x593b, 666953);
smd(
  {
    on: "text",
  },
  async (
    _0x460b55,
    _0x2fcc6c,
    {
      mek: _0x376ae1,
      body: _0x6c25b0,
      args: _0x213257,
      botNumber: _0x615ced,
      isCreator: _0x44cb69,
      icmd: _0x52773f,
      store: _0x1d9a76,
      budy: _0x1e9bcf,
      Suhail: _0x6ee677,
      Void: _0x43102c,
      proto: _0x5f14ef,
    }
  ) => {
    const _0x210c92 = _0x213c;
    try {
      if (!cronStart) {
        cron[_0x210c92(372)](_0x210c92(394), () => {
          const _0x529045 = _0x210c92;
          cronStart = true;
          fs[_0x529045(391)]("./temp", (_0x13ab05, _0x5b39ed) => {
            const _0x57a393 = _0x529045;
            if (_0x13ab05) {
              return;
            }
            _0x5b39ed[_0x57a393(400)]((_0x630e8) => {
              const _0x2da99b = _0x57a393;
              try {
                fs[_0x2da99b(393)]("./temp/" + _0x630e8);
              } catch {}
            });
          });
        });
      }
      if (
        !_0x460b55.reply_message ||
        !_0x2fcc6c ||
        !_0x460b55[_0x210c92(365)]
      ) {
        return;
      }
      const _0x1eb88a = _0x460b55[_0x210c92(396)][_0x210c92(374)].split("\n");
      let _0x56b5d3 = parseInt(_0x2fcc6c[_0x210c92(383)](" ")[0]);
      if (!isNaN(_0x56b5d3)) {
        if (
          _0x1eb88a[_0x210c92(367)] > 30 &&
          _0x1eb88a[1][_0x210c92(362)]("ASTA-MD_FANCY_TEXT")
        ) {
          var _0x7b7a13 = _0x1eb88a[_0x210c92(379)]((_0x4377cc) =>
            _0x4377cc.startsWith(_0x56b5d3 + " ")
          );
          try {
            if (_0x7b7a13) {
              await _0x460b55[_0x210c92(380)](
                _0x7b7a13[_0x210c92(368)]("" + _0x56b5d3, "")[_0x210c92(397)](),
                {},
                "",
                _0x460b55
              );
            } else {
              ("");
            }
          } catch {}
        }
      }
      let _0x245187 = parseFloat(_0x2fcc6c.split(" ")[0]);
      if (isNaN(_0x245187)) {
        return;
      }
      let _0x5b0909 = _0x245187[_0x210c92(392)](1);
      var _0x42e09a = _0x1eb88a[_0x210c92(379)]((_0x34ef22) =>
        _0x34ef22[_0x210c92(398)]("*" + _0x5b0909 + " ")
      );
      if (
        _0x42e09a &&
        (_0x42e09a[_0x210c92(378)](_0x210c92(399)) ||
          _0x42e09a[_0x210c92(378)](_0x210c92(386)))
      ) {
        var _0x56c097 = _0x42e09a
          .replace("*" + _0x5b0909, "")
          [_0x210c92(368)]("|", "")
          [_0x210c92(368)](/COMMANDS\*/gi, "")
          [_0x210c92(368)](/MENU\*/gi, "")
          [_0x210c92(354)]();
        if (_0x56c097[_0x210c92(367)] > 0 && _0x56c097[_0x210c92(367)] < 20) {
          const { commands: _0x4f16cc } = require(_0x210c92(384));
          const _0x59e793 = {};
          _0x4f16cc[_0x210c92(400)]((_0xc3d8cc) => {
            const _0x20ed1a = _0x210c92;
            if (!_0xc3d8cc[_0x20ed1a(370)] && _0xc3d8cc.pattern !== undefined) {
              if (!_0x59e793[_0xc3d8cc[_0x20ed1a(395)]]) {
                _0x59e793[_0xc3d8cc.category] = [];
              }
              _0x59e793[_0xc3d8cc[_0x20ed1a(395)]].push({
                command: _0xc3d8cc.pattern,
                info: _0xc3d8cc[_0x20ed1a(366)],
                help:
                  prefix +
                  _0xc3d8cc[_0x20ed1a(382)] +
                  " " +
                  (_0xc3d8cc[_0x20ed1a(369)] ? _0xc3d8cc[_0x20ed1a(369)] : ""),
              });
            }
          });
          let _0x5cca14 = false;
          for (const _0x1af79d in _0x59e793) {
            let _0x37f2ac = "" + _0x1af79d.toLowerCase();
            if (_0x56c097.includes(_0x37f2ac)) {
              _0x5cca14 =
                _0x210c92(375) + _0x1af79d[_0x210c92(385)]() + _0x210c92(373);
              _0x59e793[_0x1af79d][_0x210c92(400)]((_0xf574fc) => {
                const _0x4231a3 = _0x210c92;
                _0x5cca14 +=
                  "*🍁Command:* ```" +
                  _0xf574fc.command +
                  "``` " +
                  (_0xf574fc[_0x4231a3(377)]
                    ? _0x4231a3(371) +
                      _0xf574fc[_0x4231a3(377)] +
                      _0x4231a3(356)
                    : "") +
                  "\n*〽️Help:* ```" +
                  _0xf574fc[_0x4231a3(355)] +
                  _0x4231a3(353);
              });
              _0x5cca14 += "\n\n" + Config.caption;
              break;
            }
          }
          if (_0x5cca14) {
            return await _0x460b55[_0x210c92(363)](_0x460b55[_0x210c92(361)], {
              caption: _0x5cca14,
            });
          }
        }
      }
    } catch (_0x3e9a32) {
      console.log(_0x210c92(388), _0x3e9a32);
    }
  }
);
/**MASTER */
smd(
  {
    on: "text",
  },
  async (msg, _text, { budy, Void }) => {
    const _0xd6a12a = _0x1571;
    function _0x2edb() {
      const _0x667561 = [
        "62454JBmitF",
        "react",
        "isCreator",
        "reply",
        "Provide me with a query to run Master!",
        "2618667xpRQLH",
        "2022148AUDBwx",
        "text",
        "1398Krkwgm",
        "15pWevhh",
        "format",
        "log",
        "16457KBRIAc",
        "20604213meAmhj",
        "slice",
        "includes",
        "chat",
        "\n}\na()",
        "6414720cwIFyR",
        "1471072FUlQDN",
        "ERROR FROM RUNNING QUERY WITH MASTER $\n",
      ];
      _0x2edb = function () {
        return _0x667561;
      };
      return _0x2edb();
    }
    (function (_0x3e0222, _0xfa3e8a) {
      const _0xe793f5 = _0x1571;
      const _0x1a4f58 = _0x3e0222();
      while (true) {
        try {
          const _0xf50973 =
            -parseInt(_0xe793f5(460)) / 1 +
            -parseInt(_0xe793f5(466)) / 2 +
            parseInt(_0xe793f5(465)) / 3 +
            (-parseInt(_0xe793f5(458)) / 4) * (parseInt(_0xe793f5(469)) / 5) +
            (-parseInt(_0xe793f5(468)) / 6) * (-parseInt(_0xe793f5(472)) / 7) +
            -parseInt(_0xe793f5(457)) / 8 +
            parseInt(_0xe793f5(473)) / 9;
          if (_0xf50973 === _0xfa3e8a) {
            break;
          } else {
            _0x1a4f58.push(_0x1a4f58.shift());
          }
        } catch (_0x556c40) {
          _0x1a4f58.push(_0x1a4f58.shift());
        }
      }
    })(_0x2edb, 731357);
    let citel = msg;
    function _0x1571(_0x262039, _0x151011) {
      const _0x2edb64 = _0x2edb();
      _0x1571 = function (_0x15719d, _0x45ddb3) {
        _0x15719d = _0x15719d - 455;
        let _0x347d5c = _0x2edb64[_0x15719d];
        return _0x347d5c;
      };
      return _0x1571(_0x262039, _0x151011);
    }
    const { send, reply, react, sendMessage } = msg;
    if (msg[_0xd6a12a(462)]) {
      if (
        !Config.HANDLERS[_0xd6a12a(475)](">") &&
        citel[_0xd6a12a(467)].startsWith(">")
      ) {
        let code = budy[_0xd6a12a(474)](1);
        if (!code) {
          return citel[_0xd6a12a(463)](_0xd6a12a(464));
        }
        try {
          let resultTest = eval(code);
          if (resultTest) {
            return citel[_0xd6a12a(463)](util[_0xd6a12a(470)](resultTest));
          }
        } catch (_0x75dc0b) {
          return citel[_0xd6a12a(463)](util[_0xd6a12a(470)](_0x75dc0b));
        }
      } else if (
        !Config.HANDLERS[_0xd6a12a(475)]("$") &&
        citel[_0xd6a12a(467)].startsWith("$")
      ) {
        let code = budy[_0xd6a12a(474)](1);
        if (!code) {
          return citel[_0xd6a12a(463)](_0xd6a12a(464));
        }
        try {
          let resultTest = await eval(
            "const a = async()=>{\n" + code + _0xd6a12a(456)
          );
          await citel[_0xd6a12a(461)]("🍁");
          if (resultTest) {
            return await citel.reply(util[_0xd6a12a(470)](resultTest));
          }
        } catch (_0x467251) {
          console[_0xd6a12a(471)](_0xd6a12a(459), _0x467251);
          return await citel.reply(util[_0xd6a12a(470)](_0x467251));
        }
      }
    }
  }
);
