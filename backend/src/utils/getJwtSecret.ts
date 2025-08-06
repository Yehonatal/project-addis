import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SEC);

export default JWT_SECRET;
