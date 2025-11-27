import prismaClient from "db/client";

Bun.serve({
  port: 8081,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return; // upgraded to websocket
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    async message(ws, message) {
      await prismaClient.user.create({
        data: {
          username: Math.random().toString(),
          password: Math.random().toString(),
          email: `${Math.random().toString().slice(2, 8)}@example.com`,
        },
      });

      ws.send(message);
    },
  },
});
