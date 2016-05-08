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
      var files = JSON.parse(data)
      if (files = []) throw new Error('file empty')
      loadFilesFromList(rootPath, files)
    }
    catch (e) {
      fallback(rootPath)
    }
  })
}

var requireFromDir = function (rootPath) {
  fs.readdir(`${rootPath}/scripts`, (err, files) => {
    if (err) throw err
    files = files.filter(file => file.match('.js$'))
    loadFilesFromList(rootPath, files)
  })
}

var loadFilesFromList = function (rootPath, list) {
  // This will take in a list of file names without extensions and try to require them
  list.forEach(
    file => {
      let fileName = `${file}`
      try {
        require(`${rootPath}/scripts/${fileName}`)
        console.log(`Loaded: ${fileName}`)
      }
      catch (e) {
        console.log(`Did not load: ${fileName}`)
        console.log(e)
      }
    }
  )
}

module.exports = loadScripts
