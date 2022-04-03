
const fs = require('fs')
const path = require('path')

function getAllEntryPaths() {
  const res = fs.readdirSync(path.resolve(__dirname, '../src/adapters')).map(file => `./src/adapters/${file}`)
  res.push('./src/index.ts')
  return res
}

fs.writeFileSync(path.resolve(__dirname, '../typedoc.json'), JSON.stringify({
  entryPoints: getAllEntryPaths(),
  out: 'docs',
}))
