/*

The cmd() function takes two arguments: info and func. The info argument is an object that contains metadata about the command, such as its name, description, category, etc. The func argument is the function that will be executed when the command is called.

The cmd() function sets some default values for the info object, such as dontAddCommandList to false, desc to an empty string, fromMe to false, category to 'misc', and filename to "Not Provided". It then adds the info object to the commands array and returns it.

The commands array is used to store all the commands that have been added using the cmd() function.

The amd variable is assigned the same value as the cmd variable, which means that all the methods and properties of cmd are also available through amd.

*/


var config = require("../config");
var commands = [];


function cmd(info, func) {
    var data = info;
    data.function = func;
    if (!data.dontAddCommandList) data.dontAddCommandList = false;
    if (!info.desc) info.desc = '';
    if (!data.fromMe) data.fromMe = false;
    if (!info.category) data.category = 'misc';
    if (!info.filename) data.filename = "Not Provided";
    commands.push(data);
    return data;
}
module.exports = {
    cmd,
    cmd: cmd,
    AddCommand:cmd,
    smd:cmd,
    amd:cmd,
    Function:cmd,
    Module:cmd,
    commands,
};