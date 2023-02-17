import { writeFile } from 'fs/promises'
import chalk from 'chalk'
import dotenv from 'dotenv'

dotenv.config()

await load()

async function load() {
  console.log(chalk.grey(`ENV = ${process.env.NODE_ENV}`))
  if (!process.env.NODE_ENV) {
    return
  }

  // Configure Angular `environment.ts` file path
  let targetPath = './src/environments/environment.dev.ts'
  const isProduction = process.env.NODE_ENV === 'PROD'
  if (isProduction) {
    targetPath = './src/environments/environment.prod.ts'
  }

  // `environment.ts` file structure
  const envConfigFile = `export const ENVIRONMENT = {
   production: ${isProduction},
   apiBaseUrl: '${process.env.API_BASE_URL}',
   environment: '${process.env.NODE_ENV}'
}
`

  console.log(chalk.magenta('The file `environment.ts` will be written with the following content: \n'))
  console.log(chalk.grey(envConfigFile))

  try {
    await writeFile(targetPath, envConfigFile)
    console.log(chalk.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`))
  } catch (err) {
    console.error(err)
    throw err
  }
}
