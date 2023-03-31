import { parse } from "std/flags/mod.ts";
import { MigrationResult, Migrator } from "kysely";

import { DenoFileMigrationProvider } from "./migrate-utils.ts";
import db from "@db";

const migrator = new Migrator({
  db,
  provider: new DenoFileMigrationProvider(),
});

function logMigrationResults(
  results?: MigrationResult[],
  error?: Error,
) {
  results?.forEach((res) => {
    if (res.status === "Success") {
      console.log(
        `[Migrations] ✅ ${res.migrationName} foi executado com sucesso`,
      );
    } else {
      console.log(`[Migrations] ✅ ${res.migrationName} falhou ao executar`);
    }
  });

  if (error) {
    console.log(`[Migrations] Failed to migrate`);
    throw new Error(error.message);
  }
}

const flags = parse(Deno.args, {
  boolean: ["up", "down"],
});

if (!flags.up && !flags.down) {
  throw new Error("flag :up ou :down faltando");
}

if (flags.up && flags.down) {
  throw new Error("Só é possível migrate:up ou migrate:down");
}

if (flags.up) {
  const { error, results } = await migrator.migrateToLatest();
  if (error) {
    console.error(error);
  } else {
    console.log(results);
  }
}

if (flags.down) {
  const { error, results } = await migrator.migrateDown();
  console.log(error);
  console.log(results);
}
