import PostgresDriver from "./PostgresDriver.ts";
import { kysely } from "@/deps.ts";
import config from "@config";
import UserTable from "./tables/UserTable.ts";
import SocialProfileTable from "./tables/SocialProfileTable.ts";

export function jsonb_agg<DB, TB extends keyof DB, O = {}>(
  qb: kysely.SelectQueryBuilder<DB, TB, O>,
) {
  return kysely.sql<
    O[]
  >`coalesce((select jsonb_agg(x) from (${qb}) x), '[]'::jsonb)`;
}

export interface DbSchema {
  user: UserTable;
  social_profile: SocialProfileTable;
}

class Db {
  static #instance: kysely.Kysely<DbSchema>;
  private constructor() {}

  public static getInstance(): kysely.Kysely<DbSchema> {
    if (!Db.#instance) Db.#instance = Db.#initDb();

    return Db.#instance;
  }

  static #initDb() {
    return new kysely.Kysely<DbSchema>({
      // log: ["query", "error"],
      dialect: {
        createAdapter() {
          return new kysely.PostgresAdapter();
        },
        createDriver() {
          return new PostgresDriver(config.db_uri);
        },
        createIntrospector(db) {
          return new kysely.PostgresIntrospector(db);
        },
        createQueryCompiler() {
          return new kysely.PostgresQueryCompiler();
        },
      },
    });
  }
}

export default Db.getInstance();
