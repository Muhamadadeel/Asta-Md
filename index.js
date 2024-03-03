// index.js
//asta bot
//whatsapp bot
const { execFile } = require('child_process');
const path = require('path');

const clientPath = path.join(__dirname, 'lib', 'client.js');

execFile(clientPath, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing ${clientPath}`, error);
    return;
  }

  console.log(stdout); 
});