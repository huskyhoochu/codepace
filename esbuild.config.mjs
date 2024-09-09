import * as esbuild from 'esbuild';

const config = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outdir: 'dist',
  format: 'cjs',
  sourcemap: true,
  minify: process.env.NODE_ENV === 'production',
  external: ['events', 'commander'],
};

if (process.argv.includes('--watch')) {
  // Watch mode
  const context = await esbuild.context(config);
  await context.watch();
  console.log('Watching for changes...');
} else {
  // Single build
  await esbuild.build(config);
  console.log('Build complete');
}
