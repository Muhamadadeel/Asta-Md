/*
This code exports a single function mediafireDl which can be used to download files from MediaFire. It uses the axios and cheerio libraries to scrape the download link and file information from the MediaFire page.

The function takes in a single argument url which is the URL of the MediaFire file page. It then makes a GET request to the URL using axios.get and loads the HTML content using cheerio.load. It then extracts the download link and file information by querying the HTML content with cheerio.

The download link is extracted using the CSS selector a#downloadButton, which targets the anchor tag with the ID downloadButton. The file size is extracted by querying the text content of the same anchor tag and performing some string manipulation to remove unwanted characters.

The file name and file type are extracted from the download link by splitting the URL with / and selecting the 5th element of the resulting array, then splitting the file name with . and selecting the 2nd element.

Finally, the function returns an array hasil which contains the file name, file type, file size, and download link. The same function is also exported as mediafire for compatibility with existing code.




*/
const axios = require('axios')
const cheerio = require('cheerio')

const mediafireDl = async (url) => {
const res = await axios.get(url) 
const $ = cheerio.load(res.data)
const hasil = []
const link = $('a#downloadButton').attr('href')
const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
const seplit = link.split('/')
const nama = seplit[5]
mime = nama.split('.')
mime = mime[1]
hasil.push({ nama, mime, size, link })
return hasil
}

module.exports = { mediafireDl,mediafire:mediafireDl }