const express = require("express");
const ws = require("ws");

const app = express();

const PORT = 5000;


const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});



const wss = new ws.WebSocketServer({ server });

wss.on("connection", (connection, req) => {
    console.log("A client connected via WebSocket!");
    connection.send(JSON.stringify({
        msg: "connection success!"
    }))

    setInterval(() => {
        connection.send(JSON.stringify({
            type: "test",
            value: Math.random() * 100
        }))
    }, 5000)

})