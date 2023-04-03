import { kysely } from "@/deps.ts";
import { createTableWithDefaults, FreshDb } from "../migrate-utils.ts";
import ProviderType from "@/constants/ProviderType.ts";

export async function up(db: FreshDb): Promise<void> {
  await createTableWithDefaults(db.schema, "user")
    .addColumn("display_name", "varchar(100)", (col) => col.notNull())
    .execute();

  await db.schema
    .createType("provider_type")
    .asEnum(Object.values(ProviderType))
    .execute();

  await createTableWithDefaults(db.schema, "social_profile")
    .addColumn(
      "provider_type",
      kysely.sql`provider_type`,
      (col) => col.notNull(),
    )
    .addColumn("provider_id", "varchar(50)", (col) => col.notNull())
    .addColumn("username", "varchar(255)", (col) => col.notNull())
    .addColumn("avatar_url", "varchar(2083)")
    .addColumn("user_id", "integer", (col) => col.notNull())
    .addForeignKeyConstraint(
      "social_profile_user_id_fk",
      ["user_id"],
      "user",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .execute();
}

export async function down(db: FreshDb): Promise<void> {
  await db.schema.dropTable("social_profile").ifExists().execute();
  await db.schema.dropType("provider_type").ifExists().execute();
  await db.schema.dropTable("user").ifExists().execute();
}
