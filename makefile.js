#!/usr/bin/env node
// @ts-check

import { mkdir, readFile, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { argv } from "node:process"
import { URL, fileURLToPath } from "node:url"
import sade from "sade"
import { parse } from "yaml"

/**
 * @returns {void}
 */
function main() {
  const make = sade("./makefile.js")

  make
    .command("build")
    .action(build)

  make.parse(argv)
}

/**
 * @returns {Promise<void>}
 */
async function build() {
  const r = fileURLToPath(new URL(".", import.meta.url))

  const d = join(r, "dist")
  if (!existsSync(d)) {
    await mkdir(d)
  }

  const n = "hosted-solutions"
  const f = join(r, `${n}.yml`)
  const t = join(d, `${n}.json`)
  const s = await readFile(f, "utf-8")
  const y = parse(s)
  const j = JSON.stringify(y, null, 2)
  await writeFile(t, j, "utf-8")
}

main()
