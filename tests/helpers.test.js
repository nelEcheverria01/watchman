import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { runFile } from '../lib/helpers.js'
import { writeFile, unlink } from 'node:fs/promises'
import { ee } from '../lib/watcher.js'

const sampleFile = { filename: 'code.sample.js', content: 'console.log(\'hello guys\')' }

describe('helpers', _ => {
  describe('runFile()', _ => {
    before(async _ => {
      await writeFile(sampleFile.filename, sampleFile.content)
    })

    after(async _ => {
      await unlink(sampleFile.filename)

      // close explicitly, since runFile() keeps the process open
      setImmediate(_ => process.exit())
    })

    it('it should return an object with the stdout and stderr properties of the executed file', _ => {
      runFile(sampleFile.filename, ee).on('running', ({ stdout, _stderr }) => {
        const expected = 'hello guys'
        assert.equal(stdout.trim(), expected)
      })
    })
  })
})
