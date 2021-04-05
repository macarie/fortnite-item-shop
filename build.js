import { promisify } from 'util'
import { readdir, readFile, writeFile, copyFile } from 'fs/promises'

import { XXHash3 } from 'xxhash-addon'
import rimraf from 'rimraf'
import esbuild from 'esbuild'
import sass from 'sass'

const hasher = new XXHash3(99)

const build = async () => {
  await promisify(rimraf)('dist')

  const [faviconContent, { css: cssContent }] = await Promise.all([
    await readFile('src/favicon.svg'),
    await promisify(sass.render)({
      file: 'src/index.scss',
      outputStyle: 'compressed',
    }),
    esbuild.build({
      bundle: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
      entryNames: '[dir]/[name]-[hash]',
      entryPoints: ['src/main.tsx'],
      format: 'esm',
      minify: true,
      outbase: 'src',
      outdir: 'dist/assets',
      target: 'esnext',
    }),
  ])

  const [assets, indexContent] = await Promise.all([
    readdir('dist/assets'),
    readFile('index.html', 'utf-8'),
  ])

  const cssHash = hasher
    .hash(cssContent)
    .toString('hex')
    .slice(-8)
    .toUpperCase()

  const faviconHash = hasher
    .hash(faviconContent)
    .toString('hex')
    .slice(-8)
    .toUpperCase()

  const jsFile = assets.find((file) => file.endsWith('js'))
  const cssFile = `main-${cssHash}.css`
  const faviconFile = `favicon-${faviconHash}.svg`

  await Promise.all([
    writeFile(
      'dist/index.html',
      indexContent
        .replace(/src\/main.tsx/g, `assets/${jsFile}`)
        .replace('src/index.scss', `assets/${cssFile}`)
        .replace('src/favicon.svg', `assets/${faviconFile}`)
    ),
    writeFile(`dist/assets/${cssFile}`, cssContent),
    copyFile('src/favicon.svg', `dist/assets/${faviconFile}`),
  ])
}

build()
