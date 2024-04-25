const config = require("../config");
const commands = [];

function cmd(commandObject, commandFunction) {
  const cmdData = commandObject;
  cmdData.function = commandFunction;

  if (!cmdData.pattern && commandObject.cmdname) {
    cmdData.pattern = commandObject.cmdname;
  }

  if (!cmdData.alias) {
    cmdData.alias = [];
  }

  if (!cmdData.dontAddCommandList) {
    cmdData.dontAddCommandList = false;
  }

  if (!cmdData.desc) {
    cmdData.desc = commandObject.info ? commandObject.info : "";
  }

  if (!cmdData.fromMe) {
    cmdData.fromMe = false;
  }

  if (!cmdData.category) {
    cmdData.category = commandObject.type ? commandObject.type : "misc";
  }

  cmdData.info = cmdData.desc;
  cmdData.type = cmdData.category;

  if (!cmdData.use) {
    cmdData.use = "";
  }

  if (!cmdData.filename) {
    cmdData.filename = "Not Provided";
  }

  commands.push(cmdData);
  return cmdData;
}

const Module = {
  export: cmd
};

module.exports = {
  cmd: cmd,
  AddCommand: cmd,
  Function: cmd,
  Module: Module,
  smd: cmd,
  commands: commands,
  bot: cmd
};
