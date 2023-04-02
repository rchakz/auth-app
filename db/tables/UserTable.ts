// import { Generated } from "kysely";
// import BaseTable from "./BaseTable.ts";
import { z } from "@/deps.ts";
import { generatedNumber, timestamps } from "../zod-utils.ts";

const UserTable = z.object({
  id: generatedNumber(),
  display_name: z.string(),
  ...timestamps(),
});

type UserTable = z.infer<typeof UserTable>;

export default UserTable;

// export default interface UserTable extends BaseTable {
//   id: Generated<number>;
//   display_name: string;
// }

// TODO: usuários possuem muitos perfis sociais (social_profiles)

// export type Users = Selectable<UserTable>;
