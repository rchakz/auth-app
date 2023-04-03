// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/_404.tsx";
import * as $2 from "./routes/_middleware.ts";
import * as $3 from "./routes/api/joke.ts";
import * as $4 from "./routes/api/temporary-createuser.ts";
import * as $5 from "./routes/api/user.ts";
import * as $6 from "./routes/auth/[provider]/callback.tsx";
import * as $7 from "./routes/auth/[provider]/index.tsx";
import * as $8 from "./routes/dashboard/index.tsx";
import * as $9 from "./routes/index.tsx";
import * as $10 from "./routes/logout.ts";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/User.tsx";
import * as $$2 from "./islands/UserAvatarButton.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/_404.tsx": $1,
    "./routes/_middleware.ts": $2,
    "./routes/api/joke.ts": $3,
    "./routes/api/temporary-createuser.ts": $4,
    "./routes/api/user.ts": $5,
    "./routes/auth/[provider]/callback.tsx": $6,
    "./routes/auth/[provider]/index.tsx": $7,
    "./routes/dashboard/index.tsx": $8,
    "./routes/index.tsx": $9,
    "./routes/logout.ts": $10,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/User.tsx": $$1,
    "./islands/UserAvatarButton.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
