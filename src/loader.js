'use strict'

let fs = require('fs')

var loadScripts = function (rootPath) {
  requireFromJson(rootPath, 'user-scripts.json', requireFromDir)
  // requireFromJson('external-scripts.json')
}

var requireFromJson = function (rootPath, file, fallback) {
  fs.readFile(file, (err, data) => {
    try {
      if (err) throw err
      var obj = JSON.parse(data)
      if (obj = []) throw new Error('file empty')
      console.log(obj)
    }
    catch (e) {
      fallback(rootPath)
    }
  })
}

var requireFromDir = function (rootPath) {
  fs.readdirSync(`${rootPath}/scripts`).forEach((file) => {
    if (file.match('.js$')) {
      let fileName = `/scripts/${file}`
      console.log(`Loading ${fileName}...`)
      try {
        require(rootPath + fileName)
      }
      catch (e) {
        console.log(`require(): The file ${fileName} couldn't be loaded`)
      }
    }
  })
}

module.exports = loadScripts
