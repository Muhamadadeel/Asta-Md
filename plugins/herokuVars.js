const Config = require("../config");
let { prefix, smd } = require("../lib");
const axios = require("axios");
const appName = Config.HEROKU_APP_NAME
  ? Config.HEROKU_APP_NAME.toLowerCase()
  : "";
const authToken = Config.HEROKU_API_KEY;
const HEROKU = authToken && appName ? true : false;
const fetch = require("node-fetch");
const updateConfig = () => {
  try {
    const configPath = "../config";
    delete require.cache[configPath];
    require(configPath);
    return true;
  } catch (error) {
    console.log(error);
  }
};

const heroku = {};

// Add a new variable to the Heroku app
heroku.addvar = async (variableName, variableValue) => {
  try {
    const headers = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `https://api.heroku.com/apps/${appName}/config-vars`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          [variableName]: variableValue,
        }),
      },
    );

    const data = await response.json();
    return {
      status: true,
      data,
    };
  } catch (error) {
    return {
      status: false,
      data: error,
    };
  }
};

// Get all variables from the Heroku app
heroku.getallvar = async () => {
  try {
    const headers = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
    };

    const response = await fetch(
      `https://api.heroku.com/apps/${appName}/config-vars`,
      {
        headers,
      },
    );

    const data = await response.json();
    let varsOutput = `   『 *${appName} VARS* 』 \n*________________________________________*\n`;
    Object.keys(data).forEach((variableName) => {
      varsOutput += `*${variableName} :*  ${data[variableName] ? `\`\`\`${data[variableName]}\`\`\`` : ""} \n`;
    });

    return {
      status: true,
      data: varsOutput,
    };
  } catch (error) {
    return {
      status: false,
      data: error.message || error,
    };
  }
};

// Get a specific variable from the Heroku app
heroku.getvar = async (variableName) => {
  try {
    const headers = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
    };

    const response = await fetch(
      `https://api.heroku.com/apps/${appName}/config-vars`,
      {
        headers,
      },
    );

    const data = await response.json();
    return {
      status: true,
      data: data[variableName],
    };
  } catch (error) {
    return {
      status: false,
      data: error.message || error,
    };
  }
};

// Set a new variable or update an existing one in the Heroku app
heroku.setvar = async (variableName, variableValue) => {
  try {
    const headers = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `https://api.heroku.com/apps/${appName}/config-vars`,
      {
        method: "GET",
        headers,
      },
    );

    if (!response.ok) {
      return {
        status: false,
        data: "Variable not found in heroku app",
      };
    }

    const data = await response.json();
    if (data.hasOwnProperty(variableName)) {
      const updatedData = { ...data };
      updatedData[variableName] = variableValue;

      const updateResponse = await fetch(
        `https://api.heroku.com/apps/${appName}/config-vars`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(updatedData),
        },
      );

      if (updateResponse.ok) {
        return {
          status: true,
          data: updateResponse,
        };
      } else {
        return {
          status: false,
          data: `Failed to update app variable. Status: ${updateResponse.status}`,
        };
      }
    } else {
      return {
        status: false,
        data: "Variable not found in app",
      };
    }
  } catch (error) {
    return {
      status: false,
      data: error.message || error,
    };
  }
};
// Get the list of sudo users
smd(
  {
    cmdname: "getsudo",
    alias: ["mods", "gsudo"],
    info: "get sudo users list.",
    fromMe: true,
    type: "tools",
    filename: __filename,
  },
  async (message) => {
    let sudoUsers = global.sudo
      .split(",")
      .filter((user) => user && user !== "null")
      .map((user) => user.trim());
    let sudoUsersList = sudoUsers
      .map((user, index) => `  ${index + 1} 〄 @${user}\n\n`)
      .join("");
    let mentionedUsers = [
      message.sender,
      ...sudoUsers.map((user) => `${user}@s.whatsapp.net`),
    ];

    if (!sudoUsersList || !sudoUsers || !sudoUsers[0]) {
      return await message.reply("*There's no mods/sudo added for your bot!*");
    }

    let sudoUsersCaption =
      `\n   👤 *${Config.botname || "ASTA-MD "} MODS* 👤\n   \n${sudoUsersList}`.trim();
    return await message.reply(
      "https://telegra.ph/file/5fd51597b0270b8cff15b.png",
      {
        caption: sudoUsersCaption,
        mentions: mentionedUsers,
      },
      "img",
      message,
    );
  },
);

// Add a new sudo user
smd(
  {
    pattern: "setsudo",
    alias: ["ssudo", "setmod"],
    fromMe: true,
    desc: "Make sudo to a user",
    category: "tools",
    filename: __filename,
  },
  async (message) => {
    try {
      let userToAdd = message.reply_message
        ? message.reply_message.sender
        : message.mentionedJid[0]
          ? message.mentionedJid[0]
          : "";
      if (!userToAdd || !userToAdd.includes("@s.whatsapp.net")) {
        return await message.reply("*Uhh dear, reply/mention an User*");
      }

      let userId = userToAdd.split("@")[0];
      if (global.sudo.includes(userId)) {
        return message.reply("*Number Already Exist In Sudo!*");
      }

      global.sudo += `,${userId}`;
      let herokuResponse = HEROKU
        ? await heroku.addvar("SUDO", global.sudo)
        : { status: false };

      if (herokuResponse && herokuResponse.status) {
        return message.reply(
          `*${userId} Added Succesfully.*\nSudo Numbers : \`\`\`${global.sudo}\`\`\``,
        );
      } else if (!herokuResponse || !herokuResponse?.status) {
        if (HEROKU) {
          await message.reply(
            "*_Request terminated due to error!_*\n\n  There's no responce from _HEROKU_, \n  please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_",
          );
        }
        await message.reply("*User temporary added in sudo.*");
      }
    } catch (error) {
      await message.error(`${error}\n\ncommand: setsudo`, error);
    }
  },
);

// Remove a sudo user
smd(
  {
    pattern: "delsudo",
    alias: ["dsudo", "delmod"],
    fromMe: true,
    desc: "delete sudo user.",
    category: "tools",
    filename: __filename,
  },
  async (message) => {
    try {
      let userToRemove = message.reply_message
        ? message.reply_message.sender
        : message.mentionedJid[0]
          ? message.mentionedJid[0]
          : "";
      if (!userToRemove || !userToRemove.includes("@s.whatsapp.net")) {
        return await message.reply("*Uhh dear, reply/mention an User*");
      }

      let userId = userToRemove.split("@")[0];
      let userIdToRemove = `,${userId}`;

      if (global.sudo.includes(userIdToRemove)) {
        global.sudo = global.sudo.replace(userIdToRemove, "");
      } else {
        return await message.reply("*_User not found in the Sudo List!_*");
      }

      let herokuResponse = HEROKU
        ? await heroku.addvar("SUDO", global.sudo)
        : { status: false };

      if (herokuResponse && herokuResponse.status) {
        return message.reply(
          `*${userId} Deleted Succesfully.*\nSudo Numbers : \`\`\`${global.sudo}\`\`\``,
        );
      } else if (!herokuResponse || !herokuResponse?.status) {
        if (HEROKU) {
          await message.reply(
            "*_Request terminated due to error!_*\n\n  There's no responce from _HEROKU_, \n  please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_",
          );
        }
        await message.reply("*User removed from sudo.*");
      }
    } catch (error) {
      await message.error(`${error}\n\ncommand: delsudo`, error);
    }
  },
);

// Get all Heroku environment variables
smd(
  {
    pattern: "allvar",
    alias: ["getallvar", "allvars"],
    desc: "To get All  Heroku Vars",
    fromMe: true,
    category: "tools",
    filename: __filename,
  },
  async (message) => {
    try {
      let result = await heroku.getallvar();
      console.log({ result });

      if (result.status) {
        return message.send(result.data);
      } else {
        console.error(result.data);
        message.reply(
          "*_There's no responce from HEROKU_*, \n  please check that you put valid\n  _HEROKU_APP_NAME_ & _HEROKU_API_KEY_\n``` See Console to check whats the err```",
        );
      }
    } catch (error) {
      await message.error(`${error}\n\ncommand: allvar`, error);
    }
  },
);
// Add a new environment variable or update an existing one
smd(
  {
    pattern: "newvar",
    alias: ["addvar", "avar"],
    desc: "To Set Heroku Vars",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (message, varStr, { cmdName }) => {
    try {
      if (!varStr) {
        return message.reply(`*Use ${prefix}${cmdName} VARIABLE_NAME:VALUE*`);
      }

      const colonIndex = varStr.indexOf(":");
      const variableName = varStr.slice(0, colonIndex).toUpperCase().trim();
      const variableValue = varStr.slice(colonIndex + 1).trim();

      process.env[variableName] = variableValue;
      updateConfig();

      if (!variableValue) {
        return message.reply(
          `*Uhh Please, Provide Value After ':' !*\n*Example : ${prefix}${cmdName} AUTO_SAVE_STATUS:true*`,
        );
      }

      let result = await heroku.addvar(variableName, variableValue);

      if (result && result.status) {
        return message.reply(
          `*${variableName}:* [ ${variableValue} ] *Added successfully.*`,
        );
      } else if (!result || !result.status) {
        console.error(result.data);
        await message.reply(
          `*_Can't add ${cmdName} due to error!_*\n\n _please check that you put valid_\n _*HEROKU_APP_NAME* and *HEROKU_API_KEY*_`,
        );
      }
    } catch (error) {
      await message.error(`${error}\n\ncommand: ${cmdName}`, error);
    }
  },
);

// Get the value of an environment variable
smd(
  {
    pattern: "getvar",
    desc: "To Get A Heroku Var",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (message, varName, { cmdName }) => {
    try {
      if (!varName) {
        return message.reply(
          `*Please give me Variable Name*\n*Example : ${prefix}${cmdName} VARIABLE_NAME*`,
        );
      }

      const variableName = varName.split(" ")[0].toUpperCase();
      let result = await heroku.getvar(variableName);

      if (result.status) {
        if (result.data) {
          return message.reply(`*${variableName} :* ${result.data}`);
        } else {
          return message.reply(
            `*${variableName}* does not exist in Heroku *${appName}* app.`,
          );
        }
      } else if (!result || !result.status) {
        console.error(result.data);
        await message.reply(
          `*_There's no responce from HEROKU_*, \n _please check that you put valid_\n _*HEROKU_APP_NAME* & *HEROKU_API_KEY*_`,
        );
      }
    } catch (error) {
      await message.error(`${error}\n\ncommand: ${cmdName}`, error);
    }
  },
);

// Update the value of an environment variable
smd(
  {
    pattern: "setvar",
    desc: "To Set Heroku Vars",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (message, varStr, { cmdName }) => {
    try {
      if (!varStr) {
        return message.reply(
          `*Uhh dear, Give me variable name*\n*Example : ${prefix}${cmdName} VARIABLE_NAME:VALUE*`,
        );
      }

      const colonIndex = varStr.indexOf(":");
      const variableName = varStr.slice(0, colonIndex).toUpperCase().trim();
      const variableValue = varStr.slice(colonIndex + 1).trim();

      if (!variableValue) {
        return message.reply(
          `*Uhh Please, Provide value after ':' !*\n*Example : ${prefix}${cmdName} AUTO_READ_STATUS:true*`,
        );
      }

      process.env[variableName] = variableValue;
      updateConfig();

      let result = await heroku.setvar(variableName, variableValue);

      if (result.status) {
        await message.reply(
          `*${variableName}:* [ ${variableValue} ] *updated successfully.*`,
        );
      } else if (!result || !result.status) {
        console.error(result.data);
        await message.reply(result.data);
      }
    } catch (error) {
      await message.error(`${error}\n\ncommand: ${cmdName}`, error);
    }
  },
);
