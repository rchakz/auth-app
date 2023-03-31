import PostgresDriver from "./PostgresDriver.ts";

import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "kysely";

import config from "@config";

import UserTable from "./tables/UserTable.ts";
import SocialProfileTable from "./tables/SocialProfileTable.ts";

export interface DbSchema {
  user: UserTable;
  social_profile: SocialProfileTable;
}

class Db {
  static #instance: Kysely<DbSchema>;
  private constructor() {}

  public static getInstance(): Kysely<DbSchema> {
    if (!Db.#instance) Db.#instance = Db.#initDb();

    return Db.#instance;
  }

  static #initDb() {
    return new Kysely<DbSchema>({
      dialect: {
        createAdapter() {
          return new PostgresAdapter();
        },
        createDriver() {
          return new PostgresDriver(config.db_uri);
        },
        createIntrospector(db) {
          return new PostgresIntrospector(db);
        },
        createQueryCompiler() {
          return new PostgresQueryCompiler();
        },
      },
    });
  }
}

export default Db.getInstance();
