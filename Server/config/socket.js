const socketManager = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket Connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Socket Disconnected: ${socket.id}`);
    });

    socket.on("connect_error", (error) => {
      console.error(`Socket Connection Error: ${error.message}`);
    });
    // ... other socket events

    socket.on("room:join", (data) => {
      console.log(data);
      // Handle the 'room:join' event here
    });
  });
};

module.exports = socketManager;
