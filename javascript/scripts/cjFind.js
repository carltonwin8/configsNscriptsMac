#!/usr/bin/env node

const { spawn } = require("child_process");

if (process.argv.length !== 3) {
  console.log("Enter one argument as the search string");
  process.exit(-1);
}

const str = process.argv[2];

const find = spawn('find',
  [
    '.',
    '-name','node_modules','-prune','-o',
    '-name','.git','-prune','-o',
    '-name','.build','-prune','-o',
    '-name','build','-prune','-o',
    '-name','.next','-prune','-o',
    '-name','_next','-prune','-o',
    '-name','*.js',
    '-exec','grep','-inH',`${str}`,'{}',';'
  ],
  {stdio: 'inherit'}
);
