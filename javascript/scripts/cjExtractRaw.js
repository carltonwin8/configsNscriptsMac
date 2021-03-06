#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const cwd = process.cwd();
const rawDir = path.join(cwd, "raw");
const jpgDir = path.join(cwd);

const bin =
  process.platform === "darwin"
    ? "/usr/local/Cellar/dcraw/9.27.0_2/bin/dcraw"
    : "/usr/bin/dcraw";

if (!fs.existsSync(rawDir)) {
  console.log(`Error! Directory does not exist: ${rawDir}`);
  process.exit(-1);
}

fs.readdirSync(rawDir).forEach(file => {
  const rawFile = path.join(rawDir, file);
  const jpg = file.split(".")[0] + ".thumb.jpg";
  const jpgFrom = path.join(rawDir, jpg);
  const jpgTo = path.join(jpgDir, jpg);
  execSync(`${bin} -e ${rawFile}`);
  execSync(`mv ${jpgFrom} ${jpgTo}`);
  console.log(jpg);
});
