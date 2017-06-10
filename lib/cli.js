#!/usr/bin/env node

const gts = require('./index.js')
const path = require('path')
const pkg = require(path.join(path.join(__dirname, '..'), 'package.json'))
const program = require('commander')

program.version(pkg.version)

function optional (options) {
  return JSON.parse(options || '{}')
}

program.command('projects [options]')
.description('get projects')
.action((options) => {
  gts.getProjects(optional(options)).then((data) => {
    console.log(data.data)
  }).catch((error) => {
    throw error
  })
})

program.command('projecttime <id> [options]')
.description('get time spent on project')
.action((id, options) => {
  gts.getTimeSpentOnProject(id, options)
  .then((data) => {
    console.log(data / 3600 + ' hours (' + data + 's)')
  }).catch((error) => {
    throw error
  })
})

program
.command('*')
.action(() => {
  program.help()
})

program.parse(process.argv)
