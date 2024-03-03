// index.js
//asta bot
//whatsapp bot

/* 
It requires the child_process module and the path module.
It defines the path to the client.js file by joining the current directory, lib directory, and client.js file name using the path.join() method.
It calls the execFile() method from the child_process module to execute the client.js file.
The execFile() method takes three arguments:
The first argument is the file path of the executable file, which is the clientPath variable in this case.
The second argument is a callback function that is called when the file has finished executing. The callback function takes three arguments: error, stdout, and stderr.
The third argument is an options object that allows you to configure the behavior of the execFile() method, but it is not used in this code.
If there is an error executing the client.js file, the code logs an error message to the console and returns.
If the client.js file executes successfully, the code logs the stdout output to the console.

*/

/*
const client = require('./lib/client');

// Use the client module here

const { execFile } = require('child_process');

const clientPath = './lib/client.js';

execFile(clientPath, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing ${clientPath}`, error);
    return;
  }

  console.log(stdout);
});

*/