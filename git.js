const { exec } = require("child_process");
require('dotenv').config();
const commitCount = process.env.COMMIT_COUNT;
const pushThreshold = process.env.PUSH_THRESHOLD;

const gitPull = () => {
  return exec("git pull", (err, stdout, stderr) => {
    if (err) {
      console.log("🔥 pull error: ", err);
      return;
    }
    console.log(`🚀 : ${stdout}`);
  });
};

const gitCommit = () => {
  return exec(
    'git commit --allow-empty -m "go + git + github = @Astropeda"',
    (err, stdout, stderr) => {
      if (err) {
        return;
      }
      console.log(`🚀 : ${stdout}`);
    }
  );
};

const gitPush = () => {
  return exec("git push", (err, stdout, stderr) => {
    if (err) {
      console.log("🔥 push error: ", err);
      return;
    }
    console.log(`🛬 pushed successfully: ${stdout}`);
  });
};

const run = () => {
  gitPull();

  for (let i = 0; i < commitCount; i++) {
    gitCommit();

    if (i % pushThreshold === 0) {
      gitPush();
    }
  }
};

run();
