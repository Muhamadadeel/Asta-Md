/*

This code exports a set of functions for manipulating media files, including converting video formats, extracting audio from video, and resizing images. It uses several external libraries, including fluent-ffmpeg for audio and video processing, sharp for image processing, file-type for detecting file types, and crypto for generating random bytes.

Here is a brief explanation of the functions:

toGif(data): Converts a video in MP4 format to a GIF animation.
toMp4(data): Converts a GIF animation to an MP4 video.
toAudio(data): Extracts audio from a video in MP4 format and saves it as an MP3 file.
EightD(input): Applies an 8D audio effect to an MP3 file.
save(buffer, path): Saves a buffer to a file with a given path.
resizeImage(buffer, width, height): Resizes an image to a given width and height using the sharp library.
_parseInput(data, attachExtension, result): Parses input data, which can be a buffer, a URL, or a file path, and returns the parsed data as either a buffer or a file path. If attachExtension is provided, the parsed data will have the specified file extension.

*/


const ffmpeg = require('fluent-ffmpeg')
const {
	randomBytes
} = require('crypto')
const fs = require('fs')
const {
	isUrl
} = require('.')
const {	getHttpStream,	toBuffer  } = require('@sampandey001/baileys') // } = require('@adiwajshing/baileys')
const sharp = require('sharp')
const {
	spawn
} = require('child_process')
const path = require('path')
const {
	fromBuffer
} = require('file-type')
/**

 * mboh radong

 * @param {Buffer} data video mp4 buffer

 * @returns {Promise<Buffer} webp Buffer

 */
async function toGif(data) {
	try {
		const input = `./${randomBytes(3).toString('hex')}.webp`
		const output = `./${randomBytes(3).toString('hex')}.gif`
		fs.writeFileSync(input, data.toString('binary'), 'binary')
		const file = await new Promise((resolve) => {
			spawn(`convert`, [
				input,
				output
			]).on('error', (err) => {
				throw err
			}).on('exit', () => resolve(output))
		})
		let result = fs.readFileSync(file)
		try {
			fs.unlinkSync(input)
			fs.unlinkSync(output)
		} catch (error) {
			console.log(error);
		}
		return result
	} catch (error) {
		console.log(error);
	}
}
async function toMp4(data) {
	try {
		let inPath = `./${randomBytes(3).toString('hex')}.gif`
		const input = fs.existsSync(data) ? data : save(data, inPath)
		const output = `./${randomBytes(3).toString('hex')}.mp4`
		const file = await new Promise((resolve) => {
			ffmpeg(input).outputOptions(["-pix_fmt yuv420p", "-c:v libx264", "-movflags +faststart", "-filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2'", ]).toFormat('mp4').noAudio().save(output).on('exit', () => resolve(output))
		})
		let result = await fs.promises.readFile(file)
		return result
	} catch (error) {
		console.log(error);
	}
}
/**

 * mboh radong

 * @param {Buffer|URL|string} data video mp4 buffer | url | path

 * @returns {Promise<string>} file path

 */
async function toAudio(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const get = await toBuffer(await getHttpStream(data))
			const inputPath = `./video_${randomBytes(3).toString('hex')}.${(await fromBuffer(get)).ext}`
			const input = Buffer.isBuffer(data) ? save(data, inputPath) : fs.existsSync(data) ? data : isUrl(data) ? save(get, inputPath) : data
			const output = `./${randomBytes(3).toString('hex')}.mp3`
			const file = await new Promise((resolve) => {
				ffmpeg(input).audioFrequency(44100).audioChannels(2).audioBitrate('128k').audioCodec('libmp3lame').audioQuality(5).toFormat('mp3').save(output).on('end', () => resolve(output))
			})
			resolve(file)
		} catch (error) {
			console.log(error);
		}
	})
}
/**

 * convert mp3 to 8D Audio

 * @param {string|Buffer} input 

 * @returns

 */
const EightD = async (input) => {
	const inputPath = `./${randomBytes(3).toString('hex')}.mp3`
	input = Buffer.isBuffer(input) ? save(input, inputPath) : input
	const output = `./${randomBytes(3).toString('hex')}.mp3`
	const file = await new Promise((resolve) => {
		ffmpeg(input).audioFilter(['apulsator=hz=0.125']).audioFrequency(44100).audioChannels(2).audioBitrate('128k').audioCodec('libmp3lame').audioQuality(5).toFormat('mp3').save(output).on('end', () => resolve(output))
	})
	return file
}
/**

 * write file from buffer

 * @param {Buffer} buffer buffer

 * @param {string} path path to save file

 * @returns 

 */
function save(buffer, path) {
	try {
		fs.writeFileSync(path, buffer.toString('binary'), 'binary')
		return path
	} catch (error) {
		console.log(error);
	}
}
/**

 * Resize image 

 * @param {Buffer} buffer 

 * @param {Number} width 

 * @param {Number} height 

 * @returns {Promise<Buffer>}

 */
const resizeImage = (buffer, width, height) => {
	if (!Buffer.isBuffer(buffer)) throw 'Input is not a Buffer'
	return new Promise(async (resolve) => {
		sharp(buffer).resize(width, height, {
			fit: 'contain'
		}).toBuffer().then(resolve)
	})
}
/**

 * 

 * @param {Buffer|string} data Buffer | path | url

 * @param {string} attachExtension media extension, eg: jpeg

 * @param {string} result output result path | buffer

 * @returns 

 */
const _parseInput = async (data, attachExtension, result = 'path') => {
	const get = await toBuffer(await getHttpStream(data))
	const inputPath = `./file_${randomBytes(3).toString('hex')}.${attachExtension ? attachExtension : (await fromBuffer(get)).ext}`
	const out = Buffer.isBuffer(data) ? save(data, inputPath) : fs.existsSync(data) ? data : isUrl(data) ? save(get, inputPath) : data
	if (result == 'path') {
		return out
	} else if (result == 'buffer') {
		const buff = await fs.promises.readFile(out)
		try {
			await fs.promises.unlink(out)
		} catch (error) {
			throw error
		}
		return buff
	}
}
module.exports = {
	toGif,
	toMp4,
	toAudio,
	EightD,
	_parseInput,
	resizeImage
}
