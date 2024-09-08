import * as esbuild from 'esbuild';

const config = {
  entryPoints: ['src/index.ts', 'src/cli/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outdir: 'dist',
  format: 'cjs',
  sourcemap: true,
  minify: process.env.NODE_ENV === 'production',
  external: ['events', 'commander'],
  plugins: [
    // 여기에 필요한 플러그인을 추가할 수 있습니다.
  ],
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
