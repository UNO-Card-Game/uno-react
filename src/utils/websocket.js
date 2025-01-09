let socket;

const connect = (url, cb, onOpen) => {
  console.log("Attempting Connection...");
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("Successfully connected");
    if (onOpen) onOpen(socket);
  };

  socket.onmessage = (msg) => {
    cb(msg.data);
  };

  socket.onclose = (event) => {
    console.error("Socket Closed Connection: ", event);
  };

  socket.onerror = (error) => {
    console.error("Socket Error: ", error);
  };
};

export { connect };
