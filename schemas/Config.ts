import { z } from "zod";

import EnvNames from "@/constants/EnvVars.ts";

function getErrorMessage(environmentVariableName: EnvNames) {
  return {
    message: `A variável de ambiente ${environmentVariableName} está faltando.`,
  };
}

export const ConfigSchema = z.object({
  base_url: z.string().min(
    1,
    getErrorMessage(EnvNames.BASE_URL),
  ),
  environment: z.string().min(
    1,
    getErrorMessage(EnvNames.DENO_ENV),
  ),
  db_uri: z.string(),
  db: z.object({
    database: z.string().min(1, getErrorMessage(EnvNames.DB_NAME)),
    host: z.string().min(1, getErrorMessage(EnvNames.DB_HOST)),
    username: z.string().min(1, getErrorMessage(EnvNames.DB_USERNAME)),
    password: z.string().min(1, getErrorMessage(EnvNames.DB_PASSWORD)),
    port: z.number().default(5432),
  }),
  oauth: z.object({
    github: z.object({
      client_id: z.string().min(1, getErrorMessage(EnvNames.GITHUB_CLIENT_ID)),
      client_secret: z.string().min(
        1,
        getErrorMessage(EnvNames.GITHUB_CLIENT_SECRET),
      ),
    }),
  }),
});

// Config.parse({ username: "Ludwig" });

// extract the inferred type
export type Config = z.infer<typeof ConfigSchema>;
// { username: string }

// export default interface Config {
//   base_url: string;
//   environment: string;
//   db: MySQLOptions;
//   oauth: {
//     github: {
//       client_id: string;
//       client_secret: string;
//     }
//   }
// }
