import { kysely } from "@/deps.ts";

export default interface BaseTable {
  created_at: kysely.ColumnType<Date, string | undefined, never>;
  updated_at: kysely.ColumnType<Date, string | undefined, never>;
}
