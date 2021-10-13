
export const URL = process.env.URL;

// DB Config
export const DB_URL = `mongodb${process.env.DB_EXTENSION}${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
export const DB_NAME = process.env.DB_NAME;