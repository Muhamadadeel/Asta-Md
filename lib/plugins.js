// Array to store all the commands
const commands = [];

/**
 * Function to create a new command
 *
 * @param {Object} commandObj - The command object
 * @param {Function} handler - The function handler for the command
 * @returns {Object} The created command object
 */
function cmd(commandObj, handler) {
  const command = commandObj;
  command.function = handler;

  // Set the pattern if cmdname is provided
  if (!command.pattern && commandObj.cmdname) {
    command.pattern = commandObj.cmdname;
  }

  // Initialize properties if not already set
  command.alias = command.alias || [];
  command.dontAddCommandList = command.dontAddCommandList || false;
  command.desc = command.desc || commandObj.info || "";
  command.fromMe = command.fromMe || false;
  command.isAdminCommand = command.isAdminCommand || false,
  command.category = command.category || commandObj.type || "misc";

  // Set additional properties
  command.info = command.desc;
  command.type = command.category;
  command.use = command.use || "";
  command.filename = command.filename || "Not Provided";

  // Add the command to the commands array
  commands.push(command);

  return command;
}

// Exports For Plugins
module.exports = {
  cmd,
  AddCommand: cmd,
  Function: cmd,
  UserFunction: cmd,
  SysFunction: cmd,
  AdminFunction: cmd,
  amd: cmd,
  smd: cmd,
  commands,
  bot: cmd,
};
