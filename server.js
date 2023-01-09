const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'))


app.get("/", (req, res) => {
    res.render("index")
})

const server = app.listen(3000, () => {
    console.log("server is listening on port 3000...");
});

const io = require("socket.io")(server)

io.on('connection', (socket) => {
    console.log("A new client has been connected");

    socket.username = "Sagar";

    socket.on("new_message", (data) => {
        io.sockets.emit("new_message", {
            message: data.message,
            username: socket.username
        });
        socket.on("change_username", data => {
            socket.username = data.username;
        });

    });
});

