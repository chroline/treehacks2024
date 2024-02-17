import { cors } from "@elysiajs/cors";
import { Elysia, t } from "elysia";

import generateResponse from "./handlers/platform/generate-response";

const app = new Elysia({ prefix: "api" })
  .use(cors())
  .onError(({ code, error }) => {
    console.log("sad", error);
    return {
      error,
    };
  })
  .group("/platform", app =>
    app.post("/generate-response", ({ body }) => generateResponse(body), {
      body: t.Object({
        config: t.Any(),
        history: t.Array(t.String()),
        message: t.String(),
      }),
    })
  )
  .get("/", () => "Hello world")
  .listen(8080);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
