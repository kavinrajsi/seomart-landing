import * as migration_20260714_121850_initial from './20260714_121850_initial';

export const migrations = [
  {
    up: migration_20260714_121850_initial.up,
    down: migration_20260714_121850_initial.down,
    name: '20260714_121850_initial'
  },
];
