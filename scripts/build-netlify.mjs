import { spawnSync } from 'node:child_process';
const result = spawnSync(
  process.execPath,
  ['node_modules/vinext/dist/cli.js', 'build'],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      HODOS_STATIC: '1',
      VITE_HODOS_ANALYTICS:
        process.env.VITE_HODOS_ANALYTICS ??
        (process.env.CONTEXT === 'production' ? '1' : '0'),
    },
  },
);
process.exit(result.status ?? 1);
