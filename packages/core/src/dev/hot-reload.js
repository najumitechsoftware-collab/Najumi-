// packages/core/src/dev/hot-reload.js

import crypto from "crypto"

let clients = new Set()

let reloadToken = crypto.randomBytes(16).toString("hex")

export function initHotReload(server) {

  const WebSocketServer = (await import("ws")).WebSocketServer

  const wss = new WebSocketServer({ server })

  wss.on("connection", (socket, request) => {

    const origin = request.headers.origin || ""

    /*
    Security: allow only localhost
    */
    if (!origin.includes("localhost") && !origin.includes("127.0.0.1")) {

      socket.close()
      return

    }

    clients.add(socket)

    socket.on("close", () => {

      clients.delete(socket)

    })

  })

}

export function triggerHotReload() {

  for (const client of clients) {

    try {

      client.send(JSON.stringify({
        type: "reload",
        token: reloadToken
      }))

    } catch (err) {

      clients.delete(client)

    }

  }

}

export function getHotReloadClientScript() {

  return `
(function(){

  const token = "${reloadToken}"

  const protocol = location.protocol === "https:" ? "wss" : "ws"

  const socket = new WebSocket(protocol + "://" + location.host)

  socket.onmessage = function(event){

    try {

      const data = JSON.parse(event.data)

      if(data.type === "reload" && data.token === token){

        location.reload()

      }

    } catch(e){}

  }

})();
`

}