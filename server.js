const http = require("http");

let app = require("./app");

let server = http.createServer(app);

server.on("error", error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`Port ${proccess.env.PORT} requires elevated privileges`);
      procces.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`Port ${process.env.PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
if (!process.env.PORT) process.env.PORT = 5000;

server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
