
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  minify: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
})
