const ffmpeg = require("fluent-ffmpeg");
const { randomBytes } = require("crypto");
const fs = require("fs");
const { getHttpStream, toBuffer } = require("@whiskeysockets/baileys");
const sharp = require("sharp");
const { spawn } = require("child_process");
const path = require("path");
const { fromBuffer } = require("file-type");
const { tmpdir } = require("os");
const webp = require("node-webpmux");

// Function to convert a WebP image to a GIF
async function toGif(webpData) {
  try {
    const webpFilePath = `./${randomBytes(3).toString("hex")}.webp`;
    const gifFilePath = `./${randomBytes(3).toString("hex")}.gif`;

    fs.writeFileSync(webpFilePath, webpData.toString("binary"), "binary");

    const outputPath = await new Promise((resolve) => {
      spawn("convert", [webpFilePath, gifFilePath])
        .on("error", (error) => {
          throw error;
        })
        .on("exit", () => resolve(gifFilePath));
    });

    const gifData = fs.readFileSync(outputPath);

    // Clean up temporary files
    fs.unlinkSync(webpFilePath);
    fs.unlinkSync(gifFilePath);

    return gifData;
  } catch (error) {
    console.error(error);
  }
}

// Function to convert a GIF to an MP4 video
async function toMp4(gifData) {
  try {
    const gifFilePath = `./${randomBytes(3).toString("hex")}.gif`;
    const inputPath = fs.existsSync(gifData)
      ? gifData
      : saveFile(gifData, gifFilePath);
    const mp4FilePath = `./${randomBytes(3).toString("hex")}.mp4`;

    const outputPath = await new Promise((resolve) => {
      ffmpeg(inputPath)
        .outputOptions([
          "-pix_fmt yuv420p",
          "-c:v libx264",
          "-movflags +faststart",
          "-filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2'",
        ])
        .toFormat("mp4")
        .noAudio()
        .save(mp4FilePath)
        .on("exit", () => resolve(mp4FilePath));
    });

    const mp4Data = await fs.promises.readFile(outputPath);

    // Clean up temporary files
    fs.unlinkSync(inputPath);
    fs.unlinkSync(mp4FilePath);

    return mp4Data;
  } catch (error) {
    console.error(error);
  }
}

// Function to apply a 3D audio effect
const EightD = async (audioData) => {
  const inputPath = `./temp/${randomBytes(3).toString("hex")}.mp3`;
  const inputFilePath = Buffer.isBuffer(audioData)
    ? saveFile(audioData, inputPath)
    : audioData;
  const outputPath = `./temp/${randomBytes(3).toString("hex")}.mp3`;

  const processedAudio = await new Promise((resolve) => {
    ffmpeg(inputFilePath)
      .audioFilter(["apulsator=hz=0.125"])
      .audioFrequency(44100)
      .audioChannels(2)
      .audioBitrate("128k")
      .audioCodec("libmp3lame")
      .audioQuality(5)
      .toFormat("mp3")
      .save(outputPath)
      .on("end", () => resolve(outputPath));
  });

  return processedAudio;
};

// Function to save a Buffer to a file
function saveFile(buffer, filePath = "./temp/saveFile.jpg") {
  try {
    fs.writeFileSync(filePath, buffer.toString("binary"), "binary");
    return filePath;
  } catch (error) {
    console.error(error);
  }
}

// Function to resize an image
const resizeImage = (buffer, width, height) => {
  if (!Buffer.isBuffer(buffer)) {
    throw new Error("Input is not a Buffer");
  }

  return new Promise(async (resolve) => {
    sharp(buffer)
      .resize(width, height, { fit: "contain" })
      .toBuffer()
      .then(resolve);
  });
};

// Function to parse input (URL or Buffer) and return a file path or Buffer
const _parseInput = async (input, extension = false, returnType = "path") => {
  const buffer = await toBuffer(await getHttpStream(input));
  const filePath = `./temp/file_${randomBytes(3).toString("hex")}.${
    extension || (await fromBuffer(buffer)).ext
  }`;
  const inputPath = Buffer.isBuffer(input)
    ? saveFile(input, filePath)
    : fs.existsSync(input)
    ? input
    : input;

  if (returnType === "path") {
    return inputPath;
  } else if (returnType === "buffer") {
    const data = await fs.promises.readFile(inputPath);
    try {
      await fs.promises.unlink(inputPath);
    } catch (error) {}
    return data;
  }
};

// Function to convert an image to WebP
async function imageToWebp(imageData) {
  const webpFilePath = path.join(
    tmpdir(),
    `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
  );
  const jpgFilePath = path.join(
    tmpdir(),
    `${randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`
  );

  fs.writeFileSync(jpgFilePath, imageData);

  await new Promise((resolve, reject) => {
    ff(jpgFilePath)
      .on("error", reject)
      .on("end", () => resolve(true))
      .addOutputOptions([
        "-vcodec",
        "libwebp",
        "-vf",
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
      ])
      .toFormat("webp")
      .save(webpFilePath);
  });

  const webpData = fs.readFileSync(webpFilePath);

  // Clean up temporary files
  fs.unlinkSync(webpFilePath);
  fs.unlinkSync(jpgFilePath);

  return webpData;
}

// Function to convert a video to WebP
async function videoToWebp(videoData) {
  const webpFilePath = path.join(
    tmpdir(),
    `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
  );
  const mp4FilePath = path.join(
    tmpdir(),
    `${randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`
  );

  fs.writeFileSync(mp4FilePath, videoData);

  await new Promise((resolve, reject) => {
    ff(mp4FilePath)
      .on("error", reject)
      .on("end", () => resolve(true))
      .addOutputOptions([
        "-vcodec",
        "libwebp",
        "-vf",
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
        "-loop",
        "0",
        "-ss",
        "00:00:00",
        "-t",
        "00:00:05",
        "-preset",
        "default",
        "-an",
        "-vsync",
        "0",
      ])
      .toFormat("webp")
      .save(webpFilePath);
  });

  const webpData = fs.readFileSync(webpFilePath);

  // Clean up temporary files
  fs.unlinkSync(webpFilePath);
  fs.unlinkSync(mp4FilePath);

  return webpData;
}

// Function to write EXIF data to an image
async function writeExifImg(imageData, metadata) {
  let webpData = await imageToWebp(imageData);
  const tempWebpPath = path.join(
    tmpdir(),
    `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
  );
  const outputWebpPath = path.join(
    tmpdir(),
    `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
  );

  fs.writeFileSync(tempWebpPath, webpData);

  if (metadata.packname || metadata.author) {
    const img = new webp.Image();
    const exifData = {
      "sticker-pack-id": "Asta-Md",
      "sticker-pack-name": metadata.packname,
      "sticker-pack-publisher": metadata.author,
      emojis: metadata.categories ? metadata.categories : [""],
    };

    const exifBuffer = Buffer.from([
      0x49, 0x49, 0x42, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
      0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
    ]);
    const jsonBuffer = Buffer.from(JSON.stringify(exifData), "utf-8");
    const exifPayload = Buffer.concat([exifBuffer, jsonBuffer]);
    exifPayload.writeUIntLE(jsonBuffer.length, 14, 4);

    await img.load(tempWebpPath);
    fs.unlinkSync(tempWebpPath);
    img.exif = exifPayload;
    await img.save(outputWebpPath);

    return outputWebpPath;
  }
}

// Function to write EXIF data to a video
async function writeExifVid(videoData, metadata) {
  let webpData = await videoToWebp(videoData);
  const tempWebpPath = path.join(
    tmpdir(),
    `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
  );
  const outputWebpPath = path.join(
    tmpdir(),
    `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
  );

  fs.writeFileSync(tempWebpPath, webpData);

  let packname;
  let author;
  try {
    packname = metadata.packname;
  } catch (error) {
    packname = "Asta-Md";
  }
  try {
    author = metadata.author;
  } catch (error) {
    author = "";
  }

  const img = new webp.Image();
  const exifData = {
    "sticker-pack-id": "Asta-Md",
    "sticker-pack-name": packname,
    "sticker-pack-publisher": author,
    emojis: metadata.categories ? metadata.categories : [""],
  };

  const exifBuffer = Buffer.from([
    0x49, 0x49, 0x42, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
    0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
  ]);
  const jsonBuffer = Buffer.from(JSON.stringify(exifData), "utf-8");
  const exifPayload = Buffer.concat([exifBuffer, jsonBuffer]);
  exifPayload.writeUIntLE(jsonBuffer.length, 14, 4);

  await img.load(tempWebpPath);
  fs.unlinkSync(tempWebpPath);
  img.exif = exifPayload;
  await img.save(outputWebpPath);

  return outputWebpPath;
}

// Function to write EXIF data to a WebP
async function writeExifWebp(webpData, metadata) {
  const tempWebpPath = path.join(
    tmpdir(),
    `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
  );
  const outputWebpPath = path.join(
    tmpdir(),
    `${randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
  );

  fs.writeFileSync(tempWebpPath, webpData);

  if (metadata.packname || metadata.author) {
    const img = new webp.Image();
    const exifData = {
      "sticker-pack-id": "Asta_Md",
      "sticker-pack-name": metadata.packname,
      "sticker-pack-publisher": metadata.author,
      emojis: metadata.categories ? metadata.categories : [""],
    };

    const exifBuffer = await Buffer.from([
      0x49, 0x49, 0x42, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
      0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
    ]);
    const jsonBuffer = await Buffer.from(JSON.stringify(exifData), "utf-8");
    const exifPayload = await Buffer.concat([exifBuffer, jsonBuffer]);
    await exifPayload.writeUIntLE(jsonBuffer.length, 14, 4);

    await img.load(tempWebpPath);
    fs.unlinkSync(tempWebpPath);
    img.exif = exifPayload;
    await img.save(outputWebpPath);

    return outputWebpPath;
  }
}
//These Modules Below are Exported To the Index.js file, IT can be Read Externally in plugins folder.

//WARNING: Don't Change the names of these Exports
module.exports = {
  imageToWebp: imageToWebp,
  videoToWebp: videoToWebp,
  writeExifImg: writeExifImg,
  writeExifVid: writeExifVid,
  writeExifWebp: writeExifWebp,
  toGif: toGif,
  toMp4: toMp4,
  EightD: EightD,
  _parseInput: _parseInput,
  resizeImage: resizeImage,
};
