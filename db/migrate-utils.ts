import {
  ColumnDefinitionBuilder,
  FileMigrationProvider,
  Kysely,
  Migration,
  sql,
} from "kysely";
import { DbSchema } from "@db";
import { join } from "std/path/mod.ts";

export type FreshDb = Kysely<DbSchema>;

export function createTableWithDefaults<T extends string>(
  schema: FreshDb["schema"],
  tableName: T,
  hasId = true,
) {
  const notNullNow = (col: ColumnDefinitionBuilder) =>
    col.notNull().defaultTo(sql`NOW()`);

  const schemaWithDates = schema
    .createTable(tableName)
    .addColumn("created_at", "timestamptz", notNullNow)
    .addColumn("updated_at", "timestamptz", notNullNow);

  if (hasId) {
    return schemaWithDates.addColumn("id", "serial", (col) => col.primaryKey());
  }

  return schemaWithDates;
}

export class DenoFileMigrationProvider extends FileMigrationProvider {
  folder: string;

  constructor() {
    super({
      fs: {
        readdir(path) {
          return Promise.resolve(
            [...Deno.readDirSync(path)].map((file) => file.name),
          );
        },
      },
      path: {
        join,
      },
      migrationFolder: "./db/migrations",
    });

    this.folder = "./db/migrations";
  }

  async getMigrations(): Promise<Record<string, Migration>> {
    const migrations: Record<string, Migration> = {};
    const files = await Deno.readDir(this.folder);

    for await (const file of files) {
      migrations[file.name] = await import(
        ["./migrations", file.name].join("/")
      );
    }

    return migrations;
  }
}
