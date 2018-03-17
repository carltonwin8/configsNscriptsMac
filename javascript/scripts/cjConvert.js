#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const argv = require("minimist")(process.argv.slice(2));

const keys = Object.keys(argv);

function usage() {
  console.log(`Usage:`);
  console.log(`${path.basename(process.argv[1])} [-s | --size] size [-d]`);
  console.log(`  [-s | --size]`);
  console.log(`     Size to convert the images to. Common sizes follows.`);
  console.log(`     1024x768 1620x1080 1920x1280`);
  console.log(`  -d`);
  console.log(`     Size defaults to 1620x1080.`);
}

if (!keys.includes("s") && !keys.includes("size") && !keys.includes("d")) {
  usage();
  process.exit(-1);
}

if (
  (keys.includes("s") && argv["s"] === true) ||
  (keys.includes("size") && argv["size"] === true)
) {
  console.log(`Error: A size value is required.`);
  usage();
  process.exit(-1);
}
// last case should never happend due to the above check
const size = keys.includes("d")
  ? "1620x1080"
  : keys.includes("s")
    ? argv["s"]
    : keys.includes("size") ? argv["size"] : "1620x1080";
const cwd = process.cwd();
const src = path.join(cwd);
const dst = path.join(path.join(cwd, "resized"), `size_${size}`);

if (fs.existsSync(dst)) {
  console.log(`Error: To Continue Delete Exists Drectory : ${dst}`);
  process.exit(-1);
}

execSync(`mkdir -p ${dst}`);

fs.readdirSync(src).forEach(file => {
  if (file.toLowerCase().includes(".jpg")) {
    execSync(
      `convert ${path.join(src, file)} -resize ${size} ${path.join(dst, file)}`
    );
    console.log(file);
  }
});
