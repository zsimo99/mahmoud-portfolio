import * as migration_20261104_164303_init from './20261104_164303_init';

export const migrations = [
  {
    up: migration_20261104_164303_init.up,
    down: migration_20261104_164303_init.down,
    name: '20261104_164303_init'
  },
];
