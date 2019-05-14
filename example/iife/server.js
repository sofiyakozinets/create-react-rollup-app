const express = require("express");
const path = require("path");

const app = express();

const serverConfig = {
	port: 8000,
};

app.use(express.static(path.resolve(__dirname)));

app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "index.html"));
});

/* eslint-disable no-console */
app.listen(serverConfig.port, () =>
	console.log(`Server running on: http://localhost:${serverConfig.port}`),
);
/* eslint-enable no-console */
