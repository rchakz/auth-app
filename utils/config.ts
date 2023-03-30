import "std/dotenv/load.ts";
// import Config from "../schemas/Config.ts";
import { Config, ConfigSchema } from "@/schemas/Config.ts";
import EnvNames from "@/constants/EnvVars.ts";
// console.log(Deno.env)

// if (Deno.env.get(EnvNames.DENO_ENV) !== "production") {
//   await mod.config({
//     export: true,
//   });
// }

const envConfig: Config = {
  base_url: Deno.env.get(EnvNames.BASE_URL) || "http://localhost:8000",
  environment: Deno.env.get(EnvNames.DENO_ENV) || "",
  db: {
    database: Deno.env.get(EnvNames.DB_NAME) || "",
    host: Deno.env.get(EnvNames.DB_HOST) || "",
    username: Deno.env.get(EnvNames.DB_USERNAME) || "",
    password: Deno.env.get(EnvNames.DB_PASSWORD) || "",
    port: Number(Deno.env.get(EnvNames.DB_PORT) || 5432),
  },
  db_uri: "",
  oauth: {
    github: {
      client_id: Deno.env.get(EnvNames.GITHUB_CLIENT_ID) || "",
      client_secret: Deno.env.get(EnvNames.GITHUB_CLIENT_SECRET) || "",
    },
  },
};

envConfig.db_uri =
  `postgres://${envConfig.db.username}:${envConfig.db.password}@${envConfig.db.host}:${envConfig.db.port}/${envConfig.db.database}`;

// console.log(envConfig.db_uri);

const config = ConfigSchema.parse(envConfig);

export default config;
