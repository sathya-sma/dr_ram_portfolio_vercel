import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "api-dev-server",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === "/api/book-appointment" && req.method === "POST") {
              try {
                let bodyStr = "";
                for await (const chunk of req) {
                  bodyStr += chunk;
                }
                const body = JSON.parse(bodyStr || "{}");

                const { default: handler } = await server.ssrLoadModule("/api/book-appointment.ts");

                const vercelReq = Object.assign(req, { body });
                const vercelRes = {
                  status(code: number) {
                    res.statusCode = code;
                    return this;
                  },
                  setHeader(name: string, value: string) {
                    res.setHeader(name, value);
                    return this;
                  },
                  json(data: any) {
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(data));
                    return this;
                  },
                };

                await handler(vercelReq as any, vercelRes as any);
                return;
              } catch (err: any) {
                console.error("[Dev API Error]:", err);
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: false, message: err?.message || "Internal server error" }));
                return;
              }
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
