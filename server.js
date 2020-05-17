const http = require("http");
const app = require("./web");
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log("server started at http://localhost:", port);
});

