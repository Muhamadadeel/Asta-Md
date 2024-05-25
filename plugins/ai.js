let { UserFunction, fetchJson, amdJson } = require("../lib");
let fs = require("fs");
let fetch = require("node-fetch") || fetchJson || amdJson;
async function processing(msg, data) {
  try {
    const DataToProcess = require("form-data");
    return new Promise(async (obt, blob) => {
      Form = new DataToProcess();
      scheme = "https://inferenceengine.vyro.ai/" + data;
      Form.append("model_version", 1, {
        "Content-Transfer-Encoding": "binary",
        contentType: "multipart/form-data; charset=uttf-8",
      });
      Form.append("image", Buffer.from(msg), {
        filename: data + ".jpg",
        contentType: "image/jpeg",
      });
      Form.submit(
        {
          url: scheme,
          host: "inferenceengine.vyro.ai",
          path: "/" + data,
          protocol: "https:",
          headers: {
            "User-Agent": "okhttp/4.9.3",
            Connection: "Keep-Alive",
            "Accept-Encoding": "gzip",
          },
        },
        function (datab, ent) {
          if (datab) {
            blob();
          }
          let int = [];
          ent
            .on("data", function (sendl, oushl) {
              int.push(sendl);
            })
            .on("end", () => {
              obt(Buffer.concat(int));
            })
            .on("error", (_0x403a63) => {
              blob();
            });
        }
      );
    });
  } catch (err) {
    console.log(err);
    return msg;
  }
}
UserFunction(
  {
    cmdname: "remini",
    desc: "enhance image quality!",
    type: "ai",
    filename: __filename,
  },
  async (message) => {
    let match = message.image ? message : message.reply_message;
    if (!match || !match.image) {
      return await message.send("*Reply to image, to enhance quality!*");
    }
    try {
      let msg = await match.download();
      const images = await processing(msg, "enhance");
      await message.send(images, {}, "img", message);
      msg = false;
    } catch (error) {
      message.error(
        error + "\n\nCommand: remini",
        error,
        "*Process Denied :(*"
      );
    }
  }
);
UserFunction(
  {
    cmdname: "dehaze",
    desc: "enhance image quality!",
    type: "ai",
    filename: __filename,
  },
  async (message) => {
    let match = message.image ? message : message.reply_message;
    if (!match || !match.image) {
      return await message.send("*Reply to image, to enhance quality!*");
    }
    try {
      let file = await match.download();
      const images = await processing(file, "dehaze");
      await message.send(images, {}, "img", message);
      file = false;
    } catch (error) {
      message.error(
        error + "\n\nCommand: dehaze",
        error,
        "*Process Denied :(*"
      );
    }
  }
);
UserFunction(
  {
    cmdname: "recolor",
    desc: "enhance image quality!",
    type: "ai",
    filename: __filename,
  },
  async (message) => {
    let match = message.image ? message : message.reply_message;
    if (!match || !match.image) {
      return await message.send("*Reply to image, to enhance quality!*");
    }
    try {
      let file = await match.download();
      const images = await processing(file, "recolor");
      await message.send(images, {}, "img", message);
      file = false;
    } catch (error) {
      message.error(
        error + "\n\nCommand: recolor",
        error,
        "*Process Denied :(*"
      );
    }
  }
);
