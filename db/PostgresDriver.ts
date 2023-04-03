// TODO: Usar uma lib ou extrair para uma lib reutilisável

import { kysely, postgres } from "@/deps.ts";

type QueryArguments = unknown[] | Record<string, unknown>;

export default class PostgresDriver implements kysely.Driver {
  readonly #connectionMutex = new ConnectionMutex();

  #client?: postgres.Client;
  #connection?: kysely.DatabaseConnection;

  db_conn_info: string; // db_conn_info postgres uri. Change to postgres connection info

  constructor(conn_info: string) {
    this.db_conn_info = conn_info;
  }

  init(): Promise<void> {
    this.#client = new postgres.Client(this.db_conn_info);
    // @ts-ignore: fix missing streamtype
    this.#connection = new PgConnection(this.#client);
    return Promise.resolve();
  }

  async acquireConnection(): Promise<kysely.DatabaseConnection> {
    await this.#connectionMutex.lock();
    return this.#connection!;
  }

  async beginTransaction(
    connection: kysely.DatabaseConnection,
    _settings: kysely.TransactionSettings,
  ): Promise<void> {
    await connection.executeQuery(kysely.CompiledQuery.raw("begin"));
  }

  async commitTransaction(
    connection: kysely.DatabaseConnection,
  ): Promise<void> {
    await connection.executeQuery(kysely.CompiledQuery.raw("commit"));
  }

  async rollbackTransaction(
    connection: kysely.DatabaseConnection,
  ): Promise<void> {
    await connection.executeQuery(kysely.CompiledQuery.raw("rollback"));
  }

  releaseConnection(): Promise<void> {
    this.#connectionMutex.unlock();
    return Promise.resolve();
  }

  destroy(): Promise<void> {
    this.#client?.end();
    return Promise.resolve();
  }
}

// @ts-ignore: fix missing streamtype
class PgConnection implements DatabaseConnection {
  readonly #db: postgres.Client;

  constructor(c: postgres.Client) {
    this.#db = c;
  }

  async executeQuery<R>(
    compiledQuery: kysely.CompiledQuery,
  ): Promise<kysely.QueryResult<R>> {
    const { sql, parameters } = compiledQuery;

    // console.log(sql);

    const { rows } = await this.#db.queryObject(
      sql,
      parameters as QueryArguments,
    );

    return Promise.resolve({
      rows: rows as [],
    });
  }
}

class ConnectionMutex {
  #promise?: Promise<void>;
  #resolve?: () => void;

  async lock(): Promise<void> {
    while (this.#promise) {
      await this.#promise;
    }

    this.#promise = new Promise((resolve) => {
      this.#resolve = resolve;
    });
  }

  unlock(): void {
    const resolve = this.#resolve;

    this.#promise = undefined;
    this.#resolve = undefined;

    resolve?.();
  }
}
