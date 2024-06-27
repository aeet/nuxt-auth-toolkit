import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.resolve(__dirname, '..', 'package.json')

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err)
    return
  }
  const packageJson = JSON.parse(data)
  packageJson.name = '@devcui/nuxt-auth-toolkit'
  packageJson['publishConfig'] = {
    registry: 'https://npm.pkg.github.com',
  }
  fs.writeFile(filePath, JSON.stringify(packageJson, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err)
      return
    }
    console.log('File successfully updated')
  })
})
