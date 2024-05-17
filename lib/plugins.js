const commands = [];

function cmd(cmdObject, cmdFunction) {
  const command = cmdObject;
  command.function = cmdFunction;

  if (!command.pattern && cmdObject.cmdname) {
    command.pattern = cmdObject.cmdname;
  }

  if (!command.alias) {
    command.alias = [];
  }

  if (!command.dontAddCommandList) {
    command.dontAddCommandList = false;
  }

  if (!command.desc) {
    command.desc = cmdObject.info ? cmdObject.info : "";
  }

  if (!command.fromMe) {
    command.fromMe = false;
  }

  if (!command.category) {
    command.category = cmdObject.type ? cmdObject.type : "misc";
  }

  command.info = command.desc;
  command.type = command.category;

  if (!command.use) {
    command.use = "";
  }

  if (!command.filename) {
    command.filename = "Not Provided";
  }

  commands.push(command);
  return command;
}
const FunctionAsta = { export: cmd };
const Amd = { export: cmd };
module.exports = {
  cmd,
  AddCommand: cmd,
  Amd: Amd,
  FunctionAsta: FunctionAsta,
  smd: cmd,
  amd: cmd,
  commands,
  bot: cmd,
};
