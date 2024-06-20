import { rmSync } from 'node:fs'
import { join } from 'node:path'

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('no argments')
  process.exit(1)
}

args.forEach((folder) => {
  const folderPath = join(process.cwd(), folder)
  try {
    rmSync(folderPath, { recursive: true, force: true })
    console.log(`Deleted folder: ${folder}`)
  }
  catch (error) {
    console.error(`Failed to delete folder: ${folder}`, error)
  }
})
