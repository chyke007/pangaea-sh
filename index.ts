import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
console.log("Servers running on port", `${port}`);
