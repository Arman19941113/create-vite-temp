#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

import prompts from 'prompts'
import { red, cyan, green, lightGreen } from 'kolorist'

const cwd = process.cwd()
const errorException = msg => new Error(`${red('✖')} ${msg}`)
const stepLog = msg => console.log(cyan(msg))

const TEMPLATES = [
  { name: 'vue', color: lightGreen },
  { name: 'vue2', color: green },
]

const RENAME_FILES = {
  _gitignore: '.gitignore',
}

async function getPromptResult () {
  try {
    const regString = '^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$'
    const nameReg = new RegExp(regString)

    return await prompts(
      [
        {
          type: 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: 'vite-project',
          validate: value => nameReg.test(value) || `Should match pattern: ${regString}`,
        },
        {
          type: projectName => (!fs.existsSync(projectName) || isEmpty(projectName)) ? null : 'confirm',
          name: 'overwrite',
          message: projectName => `Target directory "${projectName}" is not empty. Remove existing files and continue?`,
        },
        {
          type: overwrite => {
            if (overwrite === false) {
              throw errorException('Operation cancelled')
            }
            return null
          },
          name: 'overwriteChecker',
        },
        {
          type: 'select',
          name: 'template',
          message: 'Select a template:',
          initial: 0,
          choices: TEMPLATES.map(item => ({
              title: item.color(item.name),
              value: item.name,
            }
          )),
        },
      ],
      {
        onCancel: () => {
          throw errorException('Operation cancelled')
        },
      },
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    return null
  }
}

const result = await getPromptResult()
if (!result) {
  process.exit()
}

const { template, overwrite, projectName } = result

const rootPath = path.join(cwd, projectName)
stepLog(`\nScaffolding project in ${rootPath}...`)
if (overwrite) {
  emptyDir(rootPath)
} else if (!fs.existsSync(rootPath)) {
  fs.mkdirSync(rootPath)
}
// copy template files
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templatePath = path.resolve(__dirname, `template-${template}`)
const write = (file, content) => {
  const targetPath = RENAME_FILES[file]
    ? path.join(rootPath, RENAME_FILES[file])
    : path.join(rootPath, file)
  if (content) {
    fs.writeFileSync(targetPath, content)
  } else {
    copy(path.join(templatePath, file), targetPath)
  }
}
// copy package.json
const pkgFilePath = 'package.json'
const parsedPkgJson = JSON.parse(fs.readFileSync(path.join(templatePath, pkgFilePath), 'utf-8'))
parsedPkgJson.name = projectName
parsedPkgJson.scripts.postinstall = 'husky install'
write(pkgFilePath, JSON.stringify(parsedPkgJson, null, 2) + '\n')
// copy other files
for (const file of fs.readdirSync(templatePath)) {
  if (file === pkgFilePath) continue
  write(file)
}

stepLog('\nInitializing repository...')
execSync(`cd ${rootPath} && git init`, { stdio: 'ignore' })
execSync(`cd ${rootPath} && pnpm install`, { stdio: 'inherit' })
execSync(`cd ${rootPath} && npx husky add .husky/pre-commit "npx lint-staged"`, { stdio: 'inherit' })
execSync(`cd ${rootPath} && npx husky add .husky/pre-push "npx vue-tsc --noEmit"`, { stdio: 'inherit' })
execSync(`cd ${rootPath} && git add --all && git commit -m 'initialized by create-package-temp'`, { stdio: 'ignore' })

// success
console.log(`\nDone. Now run ${cyan('cd ' + path.relative(cwd, rootPath))} and enjoy coding!`)

/*
 * helpers
 */

function isEmpty (path) {
  return fs.readdirSync(path).length === 0
}

function emptyDir (dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file)
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs)
      fs.rmdirSync(abs)
    } else {
      fs.unlinkSync(abs)
    }
  }
}

function copy (src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir (srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}
