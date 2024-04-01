const path = require('path');
const { exec } = require('child_process');

const clientPath = path.join(__dirname, 'lib/client');

// Function to animate the progress bar
function animateProgressBar(duration) {
  const totalSteps = 5;
  const stepDuration = duration / totalSteps;
  const progressLabels = [10, 40, 60, 80, 100];

  return new Promise((resolve) => {
    let currentStep = 0;
    // Check if clearLine method is available
    const clearLineSupported = process.stdout.clearLine !== undefined;
    const cursorToSupported = process.stdout.cursorTo !== undefined;

    if (clearLineSupported && cursorToSupported) {
      process.stdout.write('Loading... [  0%]');
    } else {
      console.log('Loading... [  0%]');
    }

    const intervalId = setInterval(() => {
      const progress = `${progressLabels[currentStep]}%`;

      // Check if clearLine and cursorTo methods are supported
      if (clearLineSupported && cursorToSupported) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Loading... [${progress.padStart(4, ' ')}]`);
      } else {
        console.log(`Loading... [${progress.padStart(4, ' ')}]`);
      }

      if (currentStep === totalSteps - 1) {
        clearInterval(intervalId);
        console.log('\nSyncing database...');
        setTimeout(() => {
          console.log('Starting application...');
          setTimeout(() => {
            console.log('Application started');
            setTimeout(() => {
              resolve();
            }, 10000); // Wait for 10 seconds before executing the client.js file
          }, 5000);
        }, 5000);
      }

      currentStep++;
    }, stepDuration);
  });
}


// Start the loader animation and execute the client.js file
animateProgressBar(15000)
  .then(() => {
    const childProcess = exec(`node ${clientPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(stdout);
    });

    childProcess.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });