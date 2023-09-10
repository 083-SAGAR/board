const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

const PORT = process.env.PORT || 9000;

app.use(express.static('./public'));

app.get("/", (req, res) =>
{
	res.sendFile(path.join(__dirname, "./public/", "draw.html"));
});

io.on('connection', function(socket){
	console.log("User Online");

	socket.on('drawww', function(data){
		socket.broadcast.emit('ondraw', {prevX: data.prevX, prevY: data.prevY, currX: data.currX, currY: data.currY ,x: data.x, y: data.y});
	});
});


http.listen(PORT, () =>
{
	console.log(`listening on *:${PORT}`);
});