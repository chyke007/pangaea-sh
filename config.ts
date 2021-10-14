export const URL = process.env.URL;

// DB Config
export const DB_URL = `mongodb${process.env.DB_EXTENSION}${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
export const DB_OPTIONS = {
  // ssl: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  // useFindAndModify: false,
  autoIndex: false,
  auto_reconnect: true,
  // auth: { authSource: "admin" },
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  // reconnectTries: 10,
  // reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 50,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4, // Use IPv4, skip trying IPv6
};
export const DB_NAME = process.env.DB_NAME;
