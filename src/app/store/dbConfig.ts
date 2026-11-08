import { DBConfig } from 'ngx-indexed-db';

export function migrationFactory() {
  return {};
}

export const DbConfig: DBConfig = {
  name: 'borderPassenger',
  version: 1,
  objectStoresMeta: [
    {
      store: 'tableFilter',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'key', keypath: 'key', options: { unique: false } },
        {
          name: 'columnsSchema',
          keypath: 'columnsSchema',
          options: { unique: false },
        },
      ],
    },
  ],
  migrationFactory,
};
