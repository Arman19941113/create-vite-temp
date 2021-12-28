#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const prompts = require('prompts')
const argv = require('minimist')(process.argv.slice(2))
const { yellow, green, red } = require('kolorist')

const cwd = process.cwd()

const TEMPLATES = [
  { name: 'vue', color: green },
  { name: 'vue-lint', color: yellow },
]

const renameFiles = {
  _gitignore: '.gitignore',
}

async function init() {
  let targetDir = argv._[0]

  let result = {}
  try {
    const defaultProjectName = !targetDir ? 'vite-project' : targetDir
    result = await prompts(
      [
        {
          type: targetDir ? null : 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: defaultProjectName,
          onState: state => (targetDir = state.value.trim() || defaultProjectName),
        },
        {
          type: () => !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`)
            + ` is not empty. Remove existing files and continue?`,
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          },
          name: 'overwriteChecker',
        },
        {
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          name: 'packageName',
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: dir => isValidPackageName(dir) || 'Invalid package.json name',
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
          throw new Error(red('✖') + ' Operation cancelled')
        },
      },
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }

  const { template, overwrite, packageName } = result

  const root = path.join(cwd, targetDir)
  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  console.log(`\nScaffolding project in ${root}...`)

  const templateDir = path.join(__dirname, `template-${template}`)

  const write = (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  const pkg = require(path.join(templateDir, `package.json`))

  pkg.name = packageName || targetDir

  write('package.json', JSON.stringify(pkg, null, 2))

  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`)
  }
  console.log('  ni')
  console.log('  nr dev')
  console.log()
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName,
  )
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

function isEmpty(path) {
  return fs.readdirSync(path).length === 0
}

function emptyDir(dir) {
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

function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

init().catch((e) => {
  console.error(e)
})
